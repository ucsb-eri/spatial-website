import React, { useState, useRef } from 'react';
import { Editor, EditorState, CompositeDecorator, getDefaultKeyBinding, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const styles = {
  link: {
    color: '#3b5998',
    textDecoration: 'underline',
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: 'Georgia, serif',
    marginRight: 10,
    padding: 3,
  },
};

// Link strategy and component
const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
};

const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={styles.link}>
      {props.children}
    </a>
  );
};


class StyleButton extends React.Component {
    constructor(props) {
        super();
        this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
        className += ' RichEditor-activeButton';
        }

        return (
        <span className={className} onMouseDown={this.onToggle}>
            {this.props.label}
        </span>
        );
    }
    }

const RichTextEditor = (props) => {
  const {editorState, setEditorState} = props;
  const editorRef = useRef(null);
  const [showURLInput, setShowURLInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');

  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);

  const promptForLink = (event) => {
    event.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
        setUrlValue(url);
      } else {
        setUrlValue('');
      }

      setShowURLInput(true);
      setTimeout(() => editorRef.current.focus(), 0);
    }
  };

  const confirmLink = (event) => {
    event.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(
      RichUtils.toggleLink(
        RichUtils.toggleInlineStyle(newEditorState, 'UNDERLINE'), 
        newEditorState.getSelection(),
        entityKey)
    );
    setShowURLInput(false);
    setUrlValue('');
    setTimeout(() => editorRef.current.focus(), 0);
  };

  const removeLink = (event) => {
    event.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      // Remove the link entity
      const newEditorState = RichUtils.toggleLink(editorState, selection, null);
      // Remove the underline style
      setEditorState(RichUtils.toggleInlineStyle(newEditorState, 'UNDERLINE'));
    }
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleBlockType = (blockType) => {
    setEditorState(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    );
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
    );
  };

  const INLINE_STYLES = [
      {label: 'Bold', style: 'BOLD'},
      {label: 'Italic', style: 'ITALIC'},
      {label: 'Underline', style: 'UNDERLINE'},
      {label: 'Monospace', style: 'CODE'},
    ];
  const BLOCK_TYPES = [
      {label: 'H1', style: 'header-one'},
      {label: 'H2', style: 'header-two'},
      {label: 'H3', style: 'header-three'},
      {label: 'H4', style: 'header-four'},
      {label: 'H5', style: 'header-five'},
      {label: 'H6', style: 'header-six'},
      {label: 'Blockquote', style: 'blockquote'},
    ];


  return (
    <div className="RichEditor-root">
      <div className="RichEditor-controls">
        {/* Block Style Controls */}
        {BLOCK_TYPES.map((type) => (
          <StyleButton
            key={type.label}
            active={type.style === editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType()}
            label={type.label}
            onToggle={toggleBlockType}
            style={type.style}
          />
        ))}
      </div>
      <div className="RichEditor-controls">
        {/* Inline Style Controls */}
        {INLINE_STYLES.map((type) => (
          <StyleButton
            key={type.label}
            active={editorState.getCurrentInlineStyle().has(type.style)}
            label={type.label}
            onToggle={toggleInlineStyle}
            style={type.style}
          />
        ))}
      </div>
      <div className="RichEditor-controls">
        <button onMouseDown={promptForLink} style={{ marginRight: 10 }}>
          Add Link
        </button>
        <button onMouseDown={removeLink}>Remove Link</button>
      </div>
      {showURLInput && (
        <div style={styles.urlInputContainer}>
          <input
            onChange={(e) => setUrlValue(e.target.value)}
            value={urlValue}
            style={styles.urlInput}
            type="text"
            onKeyDown={(e) => { if (e.which === 13) confirmLink(e); }}
          />
          <button onMouseDown={confirmLink}>Confirm</button>
        </div>
      )}
      {/* ... (remaining code) */}
      <div className="RichEditor-editor" onClick={() => editorRef.current.focus()}>
        <Editor
          // ... (other props)
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={setEditorState}
          placeholder="Tell a story..."
          ref={editorRef}
          spellCheck={true}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;






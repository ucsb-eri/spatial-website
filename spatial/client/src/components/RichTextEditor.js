import React, { useState, useEffect, useRef } from 'react';
import { Editor, EditorState, getDefaultKeyBinding, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

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

//   useEffect(() => {
//     setEditorState(EditorState.createWithContent(editorState.getCurrentContent()));
//   }, [editorState]);

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

  var INLINE_STYLES = [
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
            {label: 'UL', style: 'unordered-list-item'},
            {label: 'OL', style: 'ordered-list-item'},
            {label: 'Code Block', style: 'code-block'},
            ];

    // const InlineStyleControls = (props) => {
    // const currentStyle = props.editorState.getCurrentInlineStyle();
    // return (
                // <div className="RichEditor-controls">
                // {INLINE_STYLES.map((type) =>
                //     <StyleButton
                //     key={type.label}
                //     active={currentStyle.has(type.style)}
                //     label={type.label}
                //     onToggle={props.onToggle}
                //     style={type.style}
                //     />
                // )}
                // </div>
        //     );


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






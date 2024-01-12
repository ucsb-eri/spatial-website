import * as React from 'react';
import { useState } from 'react';
import RichTextEditor from './RichTextEditor';
import {EditorState, ContentState, Editor} from 'draft-js'
import {stateToHTML} from 'draft-js-export-html'
import { convertFromHTML } from 'draft-js';
import Container from '@mui/material/Container';
import 'draft-js/dist/Draft.css'
import '../css/RichText.css'

import { FormGroup, FormControl, TextField, InputLabel, Button, Input } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT, EDIT_PROJECT } from '../utils/mutations';
import { useProjectContext } from './contexts/ProjectContext';

export default function CreateProject(props) {
    console.log(props.name)
    const {editProjectId, setEditProjectId} = useProjectContext()

    const createEditorState = () => {
        if (props.id) {
            const blocksFromHtml = convertFromHTML(props.description)
            const editState = ContentState.createFromBlockArray(
                blocksFromHtml.contentBlocks,
                blocksFromHtml.entityMap
            )
            return EditorState.createWithContent(editState)
        } else {
            return EditorState.createEmpty()
        }
    }

    const [editorState, setEditorState] = useState(createEditorState);
    const createNameState = () => {
        if (props.id) {
            console.log(props.name)
            return props.name
        } else {
            return null
        }
    }
    const [name, setName] = useState(createNameState)
    console.log(name)

    const [addProject] = useMutation(ADD_PROJECT)
    const [editProject] = useMutation(EDIT_PROJECT)

    let handleProject
    if (props.id) {

        handleProject = async () => {
            const id = props.id
            console.log(id)
            const description = stateToHTML(editorState.getCurrentContent())
            try {
                console.log(id, name, description)
                const update = await editProject({
                    variables: {id, name, description}
                })
                console.log(update)
            } catch (error) {
                console.log(error)
            }
            setEditProjectId(null)
        }
    } else {
        handleProject = async () => {
            const description = stateToHTML(editorState.getCurrentContent())
            try {
                const result = await addProject({
                    variables: {name, description}
                })
                console.log(result)
            } catch (error) {
                console.error(error)
            }
        }
    }

    // Styling
    
    const formControlStyle = {
        marginBottom: '100px', // Adjust the margin as needed
      };
    const richTextEditorStyle = {
        border: '1px solid #ced4da', // Example border for better visualization
        borderRadius: '4px',
        padding: '10px', // Example padding
        marginTop: '50px',
        width: "100%",
        height: "100%"
      };
    

    return (
        <Container >
            <FormGroup>
                <FormControl style={{width:"100%", height: "80%"}}>

                    <TextField id="new-project-name" label="Project Name" defaultValue={props.name} variant="outlined" onChange={(e) => setName(e.target.value)}/>

                </FormControl>
                <FormControl style={{width:"100%", height: "80%"}}>
                    <InputLabel htmlFor="my-input" style={formControlStyle}>Project Description</InputLabel>
                    <div style={richTextEditorStyle}>
                        <RichTextEditor editorState = {editorState} setEditorState = {setEditorState}/>
                    </div>
                    
                </FormControl>
                
            </FormGroup>
            <Button variant="contained"  onClick={handleProject}>Save</Button>
            
            
        </Container>
        
    )
}
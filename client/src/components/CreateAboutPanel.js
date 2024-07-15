import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import RichTextEditor from './RichTextEditor';
import {EditorState, ContentState, Editor} from 'draft-js'
import {stateToHTML} from 'draft-js-export-html'
import { convertFromHTML } from 'draft-js';
import Container from '@mui/material/Container';
import 'draft-js/dist/Draft.css'
import '../css/RichText.css'
import axios from 'axios'
import Auth from '../utils/auth'

import { FormGroup, FormControl, TextField, InputLabel, Button, Input } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_ABOUTPANEL, EDIT_ABOUTPANEL } from '../utils/mutations';
import { useAboutPanelContext } from './contexts/AboutPanelContext';
import { AdminLoginContext } from '../context/AdminProvider'


export default function CreateAboutPanel(props) {
    const { logout } = useContext(AdminLoginContext)
    useEffect( () => {

        if (Auth.isTokenExpired()) {
            logout()
        }

    })
        

    let onSubmit
    if (props.onSubmit) {
        onSubmit = props.onSubmit
    } else {
        onSubmit = () => {
            console.log("edited panel")
        }
    }
    const {editPanelId, setEditPanelId} = useAboutPanelContext()

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

    const [addPanel] = useMutation(ADD_ABOUTPANEL)
    const [editPanel] = useMutation(EDIT_ABOUTPANEL)
    console.log(editPanel)

    let handlePanel
    if (props.id) {

        handlePanel = async () => {
            const id = props.id
            const description = stateToHTML(editorState.getCurrentContent())
            console.log(id, description, name)
            try {
                const update = await editPanel({
                    variables: {id, name, description}
                })
            } catch (error) {
                console.log(error)
            }
            setEditPanelId(null)
            onSubmit()
        }
    } else {
        handlePanel = async () => {
            const description = stateToHTML(editorState.getCurrentContent())
            try {
                console.log(description, name)
                const result = await addPanel({
                    variables: {name, description}
                }) 
                
            } catch (error) {
                console.error(error)
            }
            onSubmit()
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
                    <TextField id="new-panel-name" label="Panel Name" defaultValue={props.name} variant="outlined" onChange={(e) => setName(e.target.value)}/>
                </FormControl>
                <FormControl style={{width:"100%", height: "80%"}}>
                    <InputLabel htmlFor="my-input" style={formControlStyle}>Panel Description</InputLabel>
                    <div style={richTextEditorStyle}>
                        <RichTextEditor editorState = {editorState} setEditorState = {setEditorState}/>
                    </div>
                </FormControl>
                
                
            </FormGroup>
            <Button variant="contained"  onClick={handlePanel}>Save</Button>
            
            
        </Container>
        
    )
}
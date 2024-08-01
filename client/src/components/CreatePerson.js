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
import { ADD_PROJECT, EDIT_PROJECT } from '../utils/mutations';
import { useProjectContext } from '../context/ProjectContext';
import { AdminLoginContext } from '../context/AdminProvider'


export default function CreatePerson(props) {
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
            console.log("editted project")
        }
    }
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
    const [image, setImage] = useState(null)

    const handleImageUpload = async (image) => {
       const formData = new FormData()
        formData.append("image", image)
        console.log(formData)
      
        try {
            const result = await axios.post('http://localhost:3001/api/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
            console.log("result: ")
            console.log(result);
            return result
        } catch (error) {
            console.error('Error uploading image:', error);
            return false
        }
      };

    const [addProject] = useMutation(ADD_PROJECT)
    const [editProject] = useMutation(EDIT_PROJECT)

    let handleProject
    if (props.id) {

        handleProject = async () => {
            const id = props.id
            const description = stateToHTML(editorState.getCurrentContent())
            try {
                if (image != null) {
                    const imageSuccess = await handleImageUpload(image)
                    console.log("image Success: ")
                    console.log(imageSuccess)
                    if (imageSuccess) {
                        console.log(imageSuccess)
                        const image = imageSuccess.data.imageName
                        console.log(image)
                        const update = await editProject({
                            variables: {id, name, description, image}
                        })
                    } 
                } else {
                    const update = await editProject({
                        variables: {id, name, description}
                    })
                }

            } catch (error) {
                console.log(error)
            }
            setEditProjectId(null)
            onSubmit()
        }
    } else {
        handleProject = async () => {
            const description = stateToHTML(editorState.getCurrentContent())
            try {
                
                if (image != null) {
                    const imageSuccess = await handleImageUpload(image)
                    console.log("image Success: ")
                    console.log(imageSuccess)
                    if (imageSuccess) {
                        const image = imageSuccess.data.imageName
                        console.log("image name! please")
                        console.log(image)
                        const result = await addProject({
                            variables: {name, description, image}
                        })
                    }
                    
                } else {
                    const result = await addProject({
                        variables: {name, description}
                    })
                }
                
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
                    <TextField id="new-project-name" label="Project Name" defaultValue={props.name} variant="outlined" onChange={(e) => setName(e.target.value)}/>
                </FormControl>
                <FormControl style={{width:"100%", height: "80%"}}>
                    <InputLabel htmlFor="my-input" style={formControlStyle}>Project Description</InputLabel>
                    <div style={richTextEditorStyle}>
                        <RichTextEditor editorState = {editorState} setEditorState = {setEditorState}/>
                    </div>
                </FormControl>
                <FormControl style={{width:"100%", height: "80%"}}>
                    <Input
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        name="image"
                        filename={image}
                        onChange={(e) => {
                            console.log(e.target.files)
                            setImage(e.target.files[0])}}
                         
                        />
                </FormControl>
                
            </FormGroup>
            <Button variant="contained"  onClick={handleProject}>Save</Button>
            
            
        </Container>
        
    )
}
import * as React from 'react';
import { useState } from 'react';
import RichTextEditor from './RichTextEditor';
import {EditorState} from 'draft-js'
import Container from '@mui/material/Container';
import '../../node_modules/draft-js/dist/Draft.css'
import '../css/RichText.css'

import { FormGroup, FormControl, TextField, InputLabel, Button, Input } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../utils/mutations';


export default function CreateProject() {

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [name, setName] = useState(null)

    const [addProject, {data, error}] = useMutation(ADD_PROJECT)

    const handleAddProject = async () => {
        console.log(editorState)
        const content = editorState.getCurrentContent()
        const description = JSON.stringify(content)
        console.log(description)
        try {
            const result = await addProject({
                variables: {name, description}
            })
            console.log(result)
        } catch (error) {
            console.error(error)
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

                    <TextField id="new-project-name" label="Project Name" variant="outlined" onChange={(e) => setName(e.target.value)}/>

                </FormControl>
                <FormControl style={{width:"100%", height: "80%"}}>
                    <InputLabel htmlFor="my-input" style={formControlStyle}>Project Description</InputLabel>
                    <div style={richTextEditorStyle}>
                        <RichTextEditor editorState = {editorState} setEditorState = {setEditorState}/>
                    </div>
                    <Button variant="contained" onClick={handleAddProject}>Add Project</Button>
                </FormControl>
            </FormGroup>
            
            
        </Container>
        
    )
}
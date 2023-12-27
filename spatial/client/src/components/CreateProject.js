import * as React from 'react';
import { useState } from 'react';
import RichTextEditor from './RichTextEditor';
import {EditorState} from 'draft-js'
import Container from '@mui/material/Container';
import '../../node_modules/draft-js/dist/Draft.css'
import '../css/RichText.css'

import { FormControl, Input, InputLabel, Button } from '@mui/material';


export default function CreateProject() {

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const addProject = () => {
        console.log(editorState)
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
            <FormControl style={{width:"100%", height: "80%"}}>
                <InputLabel htmlFor="my-input" style={formControlStyle}>Project Description</InputLabel>
                <div style={richTextEditorStyle}>
                    <RichTextEditor editorState = {editorState} setEditorState = {setEditorState}/>
                </div>
                <Button variant="contained" onClick={addProject}>Add Project</Button>
            </FormControl>
            
        </Container>
        
    )
}
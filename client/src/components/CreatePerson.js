import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import RichTextEditor from './RichTextEditor';
import {EditorState, ContentState} from 'draft-js'
import {stateToHTML} from 'draft-js-export-html'
import { convertFromHTML } from 'draft-js';
import Container from '@mui/material/Container';
import 'draft-js/dist/Draft.css'
import '../css/RichText.css'
import axios from 'axios'
import Auth from '../utils/auth'

import { FormGroup, FormControl, TextField, InputLabel, Button, Input, MenuItem, Typography, FormControlLabel, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from '@apollo/client';
import { ADD_PERSON, EDIT_PROJECT } from '../utils/mutations';
import { useProjectContext } from '../context/ProjectContext';
import { AdminLoginContext } from '../context/AdminProvider'


export default function CreatePerson(props) {
    const { details } = props
    const { logout } = useContext(AdminLoginContext)
    useEffect(() => {
        if (Auth.isTokenExpired()) {
            logout()
        }
    })

    let onSubmit
    if (props.onSubmit) {
        onSubmit = props.onSubmit
    } else {
        onSubmit = () => {
            console.log("edited person")
        }
    }
    const {editPersonId, setEditPersonId} = useProjectContext()

    const createDesEditorState = () => {
        if (props.id) {
            const blocksFromHtml = convertFromHTML(details.description)
            const editState = ContentState.createFromBlockArray(
                blocksFromHtml.contentBlocks,
                blocksFromHtml.entityMap
            )
            return EditorState.createWithContent(editState)
        } else {
            return EditorState.createEmpty()
        }
    }

    const createResEditorState = () => {
        if (props.id) {
            const blocksFromHtml = convertFromHTML(details.research)
            const editState = ContentState.createFromBlockArray(
                blocksFromHtml.contentBlocks,
                blocksFromHtml.entityMap
            )
            return EditorState.createWithContent(editState)
        } else {
            return EditorState.createEmpty()
        }
    }

    const [desEditorState, setDesEditorState] = useState(createDesEditorState);
    const [resEditorState, setResEditorState] = useState(createResEditorState);

    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [title, setTitle] = useState(null)
    const [research, setResearch] = useState()
    const [projects, setProjects] = useState([])
    const [category, setCategory] = useState('')
    const [current, setCurrent]  = useState(true)
    const [email, setEmail] = useState(null)
    const [gscholar, setGscholar] = useState(null)
    const [linkedin, setLinkedin] = useState(null)
    const [website, setWebsite] = useState(null)
    const [advisors, setAdvisors] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        if (props.id) {
            setFirstName(details.firstName)
            setLastName(details.lastName)
            setTitle(details.title)
            setResearch(details.research)
            setProjects([details.projects])
            setCategory(details.category)
            setCurrent(details.current)
            setEmail(details.email)
            setGscholar(details.gscholar)
            setLinkedin(details.linkedin)
            setWebsite(details.website)
            setAdvisors(details.advisors)
            setImage(details.image)
        }
    }, [props.id])
    
    
    const [newProject, setNewProject] = useState('')

    const removeProject = (index) => {
        setProjects((prevProjects) => prevProjects.filter((_, i) => i !== index))
    }

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

    const [addPerson] = useMutation(ADD_PERSON)
    const [editPerson] = useMutation(EDIT_PROJECT)

    let handlePerson
    if (props.id) {

        handlePerson = async () => {
            const id = props.id
            const description = stateToHTML(desEditorState.getCurrentContent())
            let research = stateToHTML(resEditorState.getCurrentContent())
            console.log("description: " + description)
            console.log("research: " + research)
            if (research === "<p><br></p>"){
                research = null
            }
            try {
                if (image != null) {
                    const imageSuccess = await handleImageUpload(image)
                    console.log("image Success: ")
                    console.log(imageSuccess)
                    if (imageSuccess) {
                        console.log(imageSuccess)
                        const image = imageSuccess.data.imageName
                        console.log(image)
                        const update = await editPerson({
                            variables: {id, firstName, lastName, title, image, description, research, projects, category, current, email, gscholar, linkedin, website, advisors}
                        })
                    } 
                } else {
                    const update = await editPerson({
                        variables: {id, firstName, lastName, title, image, description, research, projects, category, current, email, gscholar, linkedin, website, advisors}
                    })
                }

            } catch (error) {
                console.log(error)
            }
            setEditPersonId(null)
            onSubmit()
        }
    } else {
        handlePerson = async () => {
            const description = stateToHTML(desEditorState.getCurrentContent())
            let research = stateToHTML(resEditorState.getCurrentContent())
            if (research === "<p><br></p>"){
                research = null
            }
            try {
                
                if (image != null) {
                    const imageSuccess = await handleImageUpload(image)
                    console.log("image Success: ")
                    console.log(imageSuccess)
                    if (imageSuccess) {
                        const image = imageSuccess.data.imageName
                        console.log("image name! please")
                        console.log(image)
                        const result = await addPerson({
                            variables: {firstName, lastName, title, image, description, research, projects, category, current, email, gscholar, linkedin, website, advisors}
                        })
                    }
                    
                } else {
                    console.log({firstName, lastName, title, image, description, research, projects, category, current, email, gscholar, linkedin, website, advisors})
                    const result = await addPerson({
                        variables: {firstName, lastName, title, image, description, research, projects, category, current, email, gscholar, linkedin, website, advisors}
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
                <div>
                    <FormControl sx= {{m:1, width: '40ch'}}>
                        <TextField select id="category" label="Category" defaultValue={details.category} helperText="Please select member role" onChange={(e) => setCategory(e.target.value)} >
                            <MenuItem key="leadership" value="Leadership">Leadership</MenuItem>
                            <MenuItem key="affiliated-faculty" value="Affiliated Faculty">Affiliated Faculty</MenuItem>
                            <MenuItem key="Staff" value="Staff">Staff</MenuItem>
                            <MenuItem key="graduate-student" value="Graduate Student">Graduate Student</MenuItem>
                            <MenuItem key="undergraduate-student" value="Undergrad Student">Undergraduate Student</MenuItem>
                        </TextField>
                    </FormControl>
                    
                    <FormControl sx= {{m:1, width: '40ch'}}>
                        <TextField id="title" label="Title" defaultValue={details.title} variant="outlined" onChange={(e) => setTitle(e.target.value)} />
                    </FormControl>
                    
                </div>

                <div>
                    <FormControl sx= {{m:1, width: '40ch'}}>
                        <TextField id="first-name" label="First Name" defaultValue={details.firstName} variant="outlined" onChange={(e) => setFirstName(e.target.value)} />
                    </FormControl>
                    <FormControl sx= {{m:1, width: '40ch'}}>
                        <TextField id="last-name" label= "Last Name" defaultValue={details.lastName} variant="outlined" onChange={(e) => setLastName(e.target.value)} />
                    </FormControl>
                </div>

                <div>
                    <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => setCurrent(e.target.checked)} />} label="Current Member" />
                    <FormControl sx= {{m:1, width: '40ch'}}>
                        <TextField id="email" label="Email" defaultValue={details.email} variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                </div>
                
                <FormControl style={{width:"100%", height: "80%", margin: '10px'}}>
                    <InputLabel htmlFor="my-input" style={formControlStyle}>Personal Bio</InputLabel>
                    <div style={richTextEditorStyle}>
                        <RichTextEditor editorState={desEditorState} setEditorState={setDesEditorState}/>
                    </div>
                </FormControl>

                <FormControl style={{width:"100%", height: "80%", margin: '10px'}}>
                    <InputLabel htmlFor="my-input" style={formControlStyle}>Research Description</InputLabel>
                    <div style={richTextEditorStyle}>
                        <RichTextEditor editorState = {resEditorState} setEditorState = {setResEditorState}/>
                    </div>
                </FormControl>

                <FormControl style={{width:"100%", height: "80%", margin: "10px"}}>
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
                <div>
                    <TextField id="project" label="Projects" helperText="Add a new project" onChange={(e) => setNewProject(e.target.value)} />
                    <Button variant="contained" 
                        onClick={() => {
                            setProjects([
                                ...projects,
                                newProject])
                            }
                        }
                    >Add</Button>
                </div>
                
                {projects.map((project, index) => (
                    <Button sx={{margin: '10px'}} variant='text' startIcon={<DeleteIcon />} key={index} onClick={() => removeProject(index)}>{project}</Button>  
                ))}
                
            </FormGroup>
            <Button variant="contained" onClick={handlePerson}>Save</Button>

        </Container>
        
    )
}
import { React } from 'react'
import { Typography, Grid, CardContent, CardMedia } from '@mui/material'

export default function ContentCard(props) {
    const { content } = props
    return (

        content.image && content.image.length > 0 ? (
            <Grid container justifyContent='center' columnSpacing={4}>
                
                <Grid item xs={12} md={11} lg={7}>
                    <CardContent>
                        {content.subtitle && (
                            
                        <Typography sx={{textTransform: 'none'}} align="left" variant='h6' paragraph>{content.subtitle}</Typography>
                               
                        )}
                        <Typography sx={{textTransform: 'none'}}  align="left"><div dangerouslySetInnerHTML={{__html: content.description}}/></Typography>
                    </CardContent>
                </Grid>
                { content.image.map(image => (
                    <Grid item xs={10} md={9} lg={5}>
                        <CardMedia
                            component="img"
                            alt={image}
                            src= {image ? `http://localhost:3001/images/${image}` : "https://images.freeimages.com/images/large-previews/ac7/sky-1401862.jpg?fmt=webp&w=500"}
                            align="left"
                            sx={{ width: '100%'}}/>
                    </Grid>
                ))}      
                
            </Grid>
            ): (
            <CardContent>
                {content.subtitle && (
                    <Typography sx={{textTransform: 'none'}} align="left" variant='h6' paragraph>{content.subtitle}</Typography>
                )}
                <Typography sx={{textTransform: 'none'}} align="left"><div dangerouslySetInnerHTML={{__html: content.description}}/></Typography>
            </CardContent>
        )

    )

}
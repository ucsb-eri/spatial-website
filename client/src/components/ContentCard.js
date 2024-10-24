import { React } from 'react'
import { Typography, Grid, CardContent, CardMedia } from '@mui/material'

export default function ContentCard(props) {
    const { content } = props
    const imageRoute = process.env.NODE_ENV === "production" ? "https://spatialtest.grit.ucsb.edu/images/" : "http://localhost:3001/images/"

    return (

        content.image && content.image.length > 0 ? (
            <Grid container justifyContent='center' columnSpacing={4}>
                
                <Grid item xs={12} md={11} lg={7}>
                    <CardContent>
                        {content.subtitle && (
                            
                        <Typography sx={{textTransform: 'none'}} align="left" variant='h6' paragraph>{content.subtitle}</Typography>
                               
                        )}
                        <Typography sx={{textTransform: 'none'}}  align="left"><div className="fontTheme" dangerouslySetInnerHTML={{__html: content.description}}/></Typography>
                    </CardContent>
                </Grid>
                { content.image.map(image => (
                    <Grid item xs={10} md={9} lg={5}>
                        <CardMedia
                            component="img"
                            alt={image}
                            src= {imageRoute + image}
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
                <Typography sx={{textTransform: 'none'}} align="left"><div className='fontTheme' dangerouslySetInnerHTML={{__html: content.description}}/></Typography>
            </CardContent>
        )

    )

}
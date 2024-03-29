import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import  CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function PersonCard(props) {

    const {details, renderPerson} = props
    console.log(details)
    const title = details.title
    console.log(title)

    

    return (
        <Grid item style={{margin: "30px"}}>
            <CardActionArea onClick={() => {renderPerson(details)}}>
                <Card sx={{ maxWidth: 250 }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="300"
                        src= {details.image}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {details.firstName} {details.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                                {title}
                        </Typography>
                        {/* {title.map((title) => (
                            <Typography variant="body2" color="text.secondary">
                                {title}
                            </Typography> */}

                        {/* ))} */}
                        
                    </CardContent>
                    {/* <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions> */}
            </Card>
            </CardActionArea>
        </Grid>
      );

}

export default PersonCard

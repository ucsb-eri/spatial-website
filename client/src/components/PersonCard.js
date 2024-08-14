import { React } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';



function PersonCard(props) {
    
    const {details, renderPerson} = props
    const title = details.title
       

    return (
        <Grid item xs={10} sm={8} md={4}>
            <CardActionArea onClick={() => {renderPerson(details)}}>
                <Card sx={{ width: "100%" }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="50%"
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

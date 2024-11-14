import {React, useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import { Paper, Box, Button, MobileStepper } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from "react-swipeable-views-react-18-fix"

import LandingCarouselSlide from './LandingCarouselSlide';


function LandingCarousel(props) {
    const slides = props.slides
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = slides.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => {
            // If we're at the last slide, loop back to the first slide
            if (prevActiveStep === maxSteps - 1) {
                return 0;
            } else {
                return prevActiveStep + 1;
            }
        });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => {
            // If we're at the first slide, loop to the last slide
            if (prevActiveStep === 0) {
                return maxSteps - 1;
            } else {
                return prevActiveStep - 1;
            }
        });
    };
    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 6000);
        return () => clearInterval(interval);
    }, [activeStep]);

  return (

    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        mb: 4,
        minHeight: '30vh',
        height: '600px',
        maxHeight: '60vh',
        maxWidth: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${slides[activeStep]['image']})`,
    
      }}
    >
        <Box
        sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            height: '100%'
            }}
        >

        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents 
        >
            {slides.map((step, index) => (
            <LandingCarouselSlide post={step} key={index} />
            ))}
        </SwipeableViews>
        
        <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0}}
            sx={{
                color: 'black',
                backgroundColor: 'transparent',
                '.MuiMobileStepper-dotActive': {
                    backgroundColor: 'white',  // Active dot color
                },  
                  
            }}
            nextButton={
                <Button
                    size="large"
                    onClick={handleNext}
                >
                    {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft sx={{color: 'white'}} />
                    ) : (
                    <KeyboardArrowRight sx={{color: 'white'}} />
                    )}
                </Button>
                }
            backButton={
                <Button size="large" onClick={handleBack}>
                    {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight sx={{color: 'white'}} />
                    ) : (
                    <KeyboardArrowLeft sx={{color: 'white'}} />
                    )}
                </Button>
                }
        />
        </Box>
    </Paper>

  );
}

export default LandingCarousel;
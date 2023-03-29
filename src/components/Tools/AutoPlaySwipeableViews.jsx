import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { getProductImageURL } from '../../tools/fetch-other';
import { NavLink } from 'react-router-dom';
import { Link } from '@mui/material';

const AutoSwipeableViews = autoPlay(SwipeableViews);

export const AutoPlaySwipeableViews = ({imagesData}) => {

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = imagesData.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ maxWidth: 600, flexGrow: 1, m: "auto", mt:2 }}>
            <Link   underline="hover"
                    component={NavLink}
                    to={imagesData[activeStep].link}>
            <AutoSwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents>
                {imagesData.map((step, index) => (
                    <div key={step.ID}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    display: 'block',
                                    maxWidth: 600,
                                    maxHeight: 400,
                                    overflow: 'hidden',
                                    width: '100%',
                                    objectFit: "contain"
                                }}
                                src={step.image}
                                alt={step.caption}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoSwipeableViews>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default'
                }}>
                <Typography color="primary">{imagesData[activeStep].caption}</Typography>
            </Paper>
            </Link>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Вперед
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Назад
                    </Button>
                }
            />
        </Box>
    );
}

import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Typography } from '@mui/material';

export default function About() {
    const navigate = useNavigate();
    return (
        <>
            <KeyboardBackspaceIcon onClick={() => navigate('/settings')} className='arrow-back' sx={{ width: 35, height: 35 }} />
            <div className="About">
                <Typography color="text.secondary" className='Card-Content' textAlign='left' fontFamily='initial'>
                    <b>“SpaceCom” </b>is a conjunctional abbreviation of the two words <b>“Space”</b> and <b>“Community”</b>.
                    <br /><br />
                    With <b>“Space”</b>, we intend to provide an area with all the necessary informations that will help our targeted party in their integration process.
                    <br /><br />
                    With <b>“Community”</b>, we plan on building a bridge between international students and their new societies in hopes of unifying the diversity in a community into a single one.
                    <br /><br />
                    The main goal of our app is to provide a platform for international students, to find events and activities that will help them integrate into their new societies. New activities are suggested to the users based on the previously inserted ones: the artificial intelligence that powers the application learns from the user feedback to suggest more appropriate activities.
                </Typography>
            </div>
        </>
    );
}
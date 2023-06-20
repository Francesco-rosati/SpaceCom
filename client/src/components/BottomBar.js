import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import TuneIcon from '@mui/icons-material/Tune';
import { useNavigate } from 'react-router-dom';

export default function BottomBar(props) {

    const navigate = useNavigate();
    const { setValue, value, dirtyInterests, setAlertInterests, setIdToScroll, firstEventId } = props;
    const currentPath = window.location.pathname;

    if (currentPath.split("/")[1] === "event") {
        return null;
    }
    else {
        return (
            <BottomNavigation
                showLabels
                sx={{ borderTop: 1, borderTopColor: '#666666' }}
                onChange={(event, newValue) => {
                    switch (newValue) {
                        case 0:
                            if (currentPath === "/categories" && dirtyInterests === true) {
                                setAlertInterests({ state: true, to: 0 });
                            }
                            else {
                                setValue(0);
                                if (currentPath === "/") {
                                    if (firstEventId !== undefined) {
                                        setIdToScroll({ id: firstEventId, behavior: 'smooth' });
                                    }
                                }
                                else {
                                    if (firstEventId !== undefined) {
                                        setIdToScroll({ id: firstEventId, behavior: null });
                                    }
                                    navigate('/');
                                }
                            }
                            break;
                        case 1:
                            if (currentPath === "/categories" && dirtyInterests === true) {
                                setAlertInterests({ state: true, to: 1 });
                            }
                            else {
                                setValue(1);
                                navigate('/filters');
                            }
                            break;
                        case 2:
                            if (currentPath === "/categories" && dirtyInterests) {
                                setAlertInterests({ state: true, to: 2 });
                            }
                            else {
                                setValue(2);
                                navigate('/settings');
                            }
                            break;
                        default:
                            break;
                    }

                }}
                value={value}
            >
                <BottomNavigationAction label="Home" sx={{ borderRight: 1, borderRightColor: "#666666" }} icon={<HomeIcon />} />
                <BottomNavigationAction label="Filters" sx={{ borderRight: 1, borderRightColor: "#666666" }} icon={<TuneIcon />} />
                <BottomNavigationAction label="Settings" icon={< SettingsIcon />} />
            </BottomNavigation>
        );
    }
}  

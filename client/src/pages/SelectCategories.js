import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBack from '@mui/icons-material/ArrowBack';
import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import theme from "../Theme";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomDialog from '../components/CustomDialog';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CategoryButton from '../components/CategoryButton';

export default function SelectCategories(props) {

    const navigate = useNavigate();

    const [totalSteps, setTotalSteps] = useState(0);
    const [currentStep, setCurrentStep] = useState(-1);
    const [currentDescription, setCurrentDescription] = useState("category");

    const [temporaryUserCategories, setTemporaryUserCategories] = useState([]);
    const [temporaryUserSubCategories, setTemporaryUserSubCategories] = useState([]);

    //the chips shown in the current step (categories or subcategories)
    const [pageChips, setPageChips] = useState([]);

    //the selected chips in the current step
    const [pageChipsSelected, setPageChipsSelected] = useState([]);

    const [alertSaveOpen, setAlertSaveOpen] = useState(false);
    const [alertClearOpen, setAlertClearOpen] = useState(false);

    const handleChangeTitle = (category) => {
        switch (category) {
            case "Sport":
                setCurrentDescription("sporting");
                break;
            case "Music":
                setCurrentDescription("musical");
                break;
            case "Leisure":
                setCurrentDescription("leisure");
                break;
            case "Art":
                setCurrentDescription("artistic");
                break;
            case "Study":
                setCurrentDescription("study");
                break;
            case "Food":
                setCurrentDescription("food");
                break;
            default:
                setCurrentDescription("category");
                break;
        }
    }

    const handleChipClick = (id, selected) => {
        if (selected) { //if selected, remove
            if (currentStep === -1) {
                setTotalSteps(old => --old);
                setTemporaryUserCategories(old => old.filter(e => e !== id));
                setTemporaryUserSubCategories(old => old.filter(tSubC => props.subCategories.filter(s => s.category !== id).map(s => s.id).includes(tSubC)))
            } else {
                setTemporaryUserSubCategories(old => old.filter(e => e !== id));
            }

            setPageChipsSelected(old => old.filter(e => e !== id));
        } else {
            if (currentStep === -1) {
                setTotalSteps(old => ++old);
                setTemporaryUserCategories((old) => {
                    let arr = [...old];
                    arr.push(id);
                    return arr;
                });
            } else {
                setTemporaryUserSubCategories(old => {
                    let arr = [...old];
                    arr.push(id);
                    return arr;
                });
            }

            setPageChipsSelected(old => {
                let arr = [...old];
                arr.push(id);
                return arr;
            });
        }
    }

    const handleStep = (step) => {

        //show save confirmation alert
        if (currentStep + step >= totalSteps && currentStep !== -1) {
            setAlertSaveOpen(true);
            return;
        }

        if (currentStep + step < -1)
            return;

        let currentCategory = temporaryUserCategories[currentStep + step];

        handleChangeTitle(currentCategory);

        if (currentStep + step > -1) {
            //setTemporaryUserSubCategories(old => old.filter(e => !subcategoriesToRemove.includes(e)));
            let pageChips = props.subCategories.filter(e => e.category === currentCategory);
            setPageChips(pageChips);
            setPageChipsSelected(temporaryUserSubCategories.filter(e => pageChips.map(e => e.id).includes(e)));
        } else {
            setPageChips([...props.categories]);
            setPageChipsSelected(temporaryUserCategories);
        }

        setCurrentStep(old => old + step);
    };

    const clearPage = () => {

        //clearing main categories
        if (currentStep === -1) {
            setTemporaryUserCategories([]);
            setTemporaryUserSubCategories([]);
            setPageChipsSelected([]);
            setTotalSteps(0);
        } else {
            let pageCategory = temporaryUserCategories[currentStep];
            let pageSubCategories = props.subCategories.filter(e => e.category === pageCategory).map(e => e.id);
            let pageSelectionsCleared = temporaryUserSubCategories.filter(e => !pageSubCategories.includes(e));
            setTemporaryUserSubCategories(pageSelectionsCleared);
            setPageChipsSelected([]);
        }
        props.setDirtyInterests(true);
        setAlertClearOpen(false)
    };

    const savePreferences = () => {
        props.storePreferences(temporaryUserCategories, temporaryUserSubCategories);
        props.setValue(0);
        props.setDirtyInterests(false);
        navigate("/");
    };

    useEffect(() => {
        if (props.fetchCount >= 3) {
            setTotalSteps(props.userCategories.length);
            setTemporaryUserCategories([...props.userCategories]);
            setTemporaryUserSubCategories([...props.userSubCategories]);
            setPageChips([...props.categories]);
            setPageChipsSelected([...props.userCategories]);
        }
        // eslint-disable-next-line
    }, [props.fetchCount])

    useEffect(() => {

        const sortedCategories = props.userCategories.sort();
        const sortedTempCategories = temporaryUserCategories.sort();
        const sortedSubCategories = props.userSubCategories.sort();
        const sortedTempSubCategories = temporaryUserSubCategories.sort();

        if (JSON.stringify(sortedCategories) !== JSON.stringify(sortedTempCategories) || JSON.stringify(sortedSubCategories) !== JSON.stringify(sortedTempSubCategories)) {
            props.setDirtyInterests(true);
        }
        else {
            props.setDirtyInterests(false);
        }
        // eslint-disable-next-line
    }, [temporaryUserCategories.length, temporaryUserSubCategories.length]);

    return (
        <>

            <CustomDialog title={"Clear interests?"} description={"By clicking 'Confirm' all the interests you have previously selected will be cleared"} confirmButton={"Confirm"} alertOpen={alertClearOpen} setAlertOpen={setAlertClearOpen} callbackFunction={clearPage} />

            <Dialog
                open={alertSaveOpen}
                onClose={() => setAlertSaveOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
                    Save interests?
                </DialogTitle>

                <DialogContent sx={{ textAlign: "justify" }}>
                    <div id="alert-dialog-description">
                        <Typography variant="body1" paragraph>
                            By clicking 'Save' your new interests will be saved, overriding the previous ones.
                        </Typography>
                        <Typography variant="body1" paragraph align="center" color="error">
                            <b>ATTENTION!</b>
                        </Typography>
                        <Typography variant="body1" align="center" paragraph>
                            All the liked events will be cleared!
                        </Typography>
                    </div>
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button sx={{ marginRight: 2 }} onClick={() => setAlertSaveOpen(false)}>Back</Button>
                    <Button onClick={() => savePreferences()} autoFocus>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={props.infoAlert}
                onClose={() => props.setInfoAlert(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
                    Why do you specify your interests?
                </DialogTitle>

                <DialogContent sx={{ textAlign: "center" }}>
                    <DialogContentText id="alert-dialog-description">
                        Spacecom, using its artificial intelligence algorithm, takes your preferences and puts in your service the most relevant newsfeed based on your likings.
                    </DialogContentText>
                </DialogContent>

                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button onClick={() => props.setInfoAlert(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            <KeyboardBackspaceIcon onClick={() => {
                if (props.dirtyInterests === true) {
                    props.setAlertInterests({ state: true, to: 2 });
                }
                else {
                    navigate('/settings');
                }
            }}
                className='arrow-back'
                sx={{ width: 35, height: 35 }} />

            <ThemeProvider theme={theme}>
                <div className='Column-centered-box'>

                    {currentStep === -1 ?
                        <div style={{ height: "10%", width: "75%", position: "absolute", backgroundColor: "var(--app-bg-color)" }}>
                            <p style={{ color: "#454444", textAlign: "center" }}>Select the <b>{currentDescription.toUpperCase()}</b> that you would wish to receive notifications on by clicking on its appropriate button</p>
                        </div> :

                        <div style={{ height: "10%", width: "75%", position: "absolute", backgroundColor: "var(--app-bg-color)" }}>
                            <p style={{ color: "#454444", textAlign: "center" }}>Select the specifying <b>{currentDescription.toUpperCase()}</b> events that you would wish to receive notifications on by clicking on its appropriate button</p>
                        </div>
                    }

                    <div className="chipbox-container">

                        <div className='chipbox-column'>
                            {pageChips.filter((element, index) => {
                                if (index < pageChips.length / 2) {
                                    return true;
                                }
                                return false;
                            }).map(c => <CategoryButton
                                key={c.id ? c.id : c.name}
                                id={c.id ? c.id : c.name}
                                label={c.name}
                                icon={c.icon}
                                clickHook={handleChipClick}
                                selected={pageChipsSelected.includes(c.name) || pageChipsSelected.includes(c.id)} />)
                            }
                        </div>

                        <div className='chipbox-column'>
                            {pageChips.filter((element, index) => {
                                if (index >= pageChips.length / 2) {
                                    return true;
                                }
                                return false;
                            }).map(c => <CategoryButton
                                key={c.id ? c.id : c.name}
                                id={c.id ? c.id : c.name}
                                label={c.name}
                                icon={c.icon}
                                clickHook={handleChipClick}
                                selected={pageChipsSelected.includes(c.name) || pageChipsSelected.includes(c.id)} />)
                            }
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "10px", height: "7%", width: "90%", backgroundColor: "var(--app-bg-color)", position: "fixed", bottom: 70 }}>
                        <Button
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            color="black"
                            disabled={(currentStep === -1 && temporaryUserCategories.length === 0) || (currentStep !== -1 && temporaryUserSubCategories.length === 0) ? true : false}
                            onClick={() => {
                                if (pageChipsSelected.length !== 0) {
                                    setAlertClearOpen(true)
                                } else {
                                    clearPage();
                                }
                            }}
                        >
                            Clear
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<ArrowBack />}
                            color="black"
                            onClick={() => handleStep(-1)}
                            disabled={currentStep === -1 ? true : false}
                        >
                            Back
                        </Button>

                        <Button
                            variant="outlined"
                            endIcon={<CheckIcon />}
                            color="black"
                            onClick={() => {
                                if (pageChipsSelected.length === 0) {
                                    if (currentStep === -1) {
                                        props.setError({ state: true, message: "You must select at least one category!" });
                                    } else {
                                        props.setError({ state: true, message: "You must select at least one subcategory!" });
                                    }
                                } else {
                                    handleStep(1);
                                }
                            }}
                            disabled={currentStep >= totalSteps - 1 && currentStep !== -1 && !props.dirtyInterests ? true : false}
                        >
                            {(currentStep < totalSteps - 1) || currentStep === -1 ? "Next" : "Save"}
                        </Button>
                    </div>
                </div>
            </ThemeProvider>
        </>
    );
}
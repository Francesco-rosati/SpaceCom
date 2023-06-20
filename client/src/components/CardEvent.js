import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { red } from '@mui/material/colors';
import API from '../API/API';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CardEvent(props) {

  const navigate = useNavigate();
  const { article, setEventsReload, setDirtyLiked, setError, setIdToScroll } = props;

  const locationIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
  </svg>;

  const [open, setOpen] = useState(false);
  const [alertWebSiteOpen, setAlertWebSiteOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Dialog
        open={alertWebSiteOpen}
        onClose={() => setAlertWebSiteOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          Would you like to continue with your action?
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            By clicking 'Open', you will be redirected to the website of the corresponding event.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button sx={{ marginRight: 2 }} onClick={() => setAlertWebSiteOpen(false)}>Back</Button>
          <Button onClick={() => { setAlertWebSiteOpen(false); window.open(`https://${article?.website}`); }} autoFocus>Open</Button>
        </DialogActions>
      </Dialog>

      <KeyboardBackspaceIcon onClick={() => { navigate(`/home`); setIdToScroll({ id: article?.id, behavior: null }); }} className='arrow-back' sx={{ width: 35, height: 35 }} />

      <Card className="Card-event" key={article?.id}>

        <CardHeader
          title={article?.title}
          subheader={
            <>
              <div className="subheader-container">
                <span className="subheader-left"> {locationIcon} {article?.city}</span>
                <span className="subheader-right">{article?.date} - {article?.time}</span>
              </div>
            </>
          }>
        </CardHeader>

        <CardMedia component="img" height="194" image={article?.photo} alt={article?.title} />

        <CardContent>
          <Typography variant="body2" color="text.secondary" className='Card-Content'>
            {article?.content}
          </Typography>

          <div className='details'>
            <Typography variant="body2" color="text.secondary" className='Card-Content' textAlign='left'>
              <u><b>Where:</b></u> {article?.address}, {article?.city}.
              <br />
              <u><b>Details:</b></u> {article?.details}
              <br />
              <u><b>Notes:</b></u> {article?.notes}
              <br />
              <u><b>Website:</b></u> <a style={{ color: 'black' }} onClick={() => setAlertWebSiteOpen(true)}><u>{article?.website}</u></a>
            </Typography>
          </div>
        </CardContent>

        <CardActions>

          <IconButton aria-label="add to favorites" onClick={() => API.modifyLiked(article?.id, !article?.liked).then((result) => {
            setDirtyLiked(true);
            setEventsReload(true);
          }).catch((err) => setError({ state: true, message: "Error on modify liked!" }))}>
            {article?.liked ? (<FavoriteIcon sx={{ color: red[700] }} />) : (<FavoriteIcon color="disabled" />)}
          </IconButton >

          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div className='tooltip-event'>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Event suggestion is based on your current interests and the events you have previously liked"
              >
                <Button size="small" className='tooltip-button' onClick={open === true ? handleTooltipClose : handleTooltipOpen}><span className='tooltip-button-text'>Suggested for you</span> <InfoOutlinedIcon className='info-icon' fontSize='small' /></Button>
              </Tooltip>
            </div>
          </ClickAwayListener>

          <div className='category-price-event'>
            <Typography className='category'>{article?.subcategory_name}</Typography>
            <Typography className='price'> Price: {article?.price !== 0.0 ? `${article?.price}$` : <b>Free</b>} </Typography>
          </div>

        </CardActions>
      </Card>
    </>);
}
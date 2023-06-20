import { useNavigate } from 'react-router-dom';
import API from '../API/API';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import { Box } from '@mui/system';

export default function CardHome(props) {

  const navigate = useNavigate();
  const { article, setEventsReload, setDirtyLiked, setError } = props;

  const locationIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
  </svg>;

/*const useStyles = makeStyles({
  root: {
    minWidth: 275,
    border: "1px solid",
    padding: "10px",
    boxShadow: "5px 10px red"
  },
//other styles and classes//
});*/

  return (
    <>
        <Card className="Card-home" key={article?.id} sx={{boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.2)"}}>

          <CardHeader title={article?.title} subheader={<> <div className="subheader-container"> <span className="subheader-left"> {locationIcon} {article?.city}</span>
            <span className="subheader-right">{article?.date} - {article?.time}</span>
          </div>
          </>
          }>
          </CardHeader>

          <CardMedia component="img" height="194" src={article?.photo} alt={article?.title} />

          <CardContent>
            <Typography variant="body2" color="text.secondary" className='Card-Content'>
              {article?.content}
            </Typography>
          </CardContent>

          <CardActions>
            <IconButton aria-label="add to favorites" onClick={() => API.modifyLiked(article?.id, !article?.liked).then((result) => {
              setDirtyLiked(true);
              setEventsReload(true);
            }).catch((err) => setError({ state: true, message: "Error on modify liked!" }))}>
              {article?.liked ? (<FavoriteIcon sx={{ color: red[700] }} />) : (<FavoriteIcon color="disabled" />)}
            </IconButton >

            <Button size="small" onClick={() => { navigate(`/event/${article?.id}`); }}>View More</Button>

            <div className='category-price'>
              <Typography className='category'>{article?.category}</Typography>
              <Typography className='price'> Price: {article?.price !== 0.0 ? `${article?.price}$` : <b>Free</b>} </Typography>
            </div>

          </CardActions>
        </Card>
    </>
  );
}
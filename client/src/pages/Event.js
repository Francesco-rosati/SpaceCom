import { useParams } from 'react-router-dom';
import CardEvent from '../components/CardEvent';

export default function Event(props) {

    const { articles, setEventsReload, setDirtyLiked, setIdToScroll } = props;
    let { id } = useParams();
    const article = articles.filter(article => article?.id === parseInt(id))[0];
    
    return (
        <div className="Event">
            <CardEvent article={article} setEventsReload={setEventsReload} setDirtyLiked={setDirtyLiked} setIdToScroll={setIdToScroll}/>
        </div>
    );
}
import * as React from 'react';
import CardHome from '../components/CardHome';
import SpinnerBox from '../components/SpinnerBox';
import { useEffect } from 'react';

export default function Home(props) {

    const { articles, setEventsReload, setDirtyLiked, loading, idToScroll, setIdToScroll, setError } = props;

    useEffect(() => {
        if (idToScroll.id !== null && idToScroll.behavior !== null) {
            document.getElementById(`event-${idToScroll.id}`).scrollIntoView({ behavior: idToScroll.behavior });
            setIdToScroll({ id: null, behavior: null });
        }
        else if (idToScroll.id !== null && idToScroll.behavior === null) {
            document.getElementById(`event-${idToScroll.id}`).scrollIntoView();
            setIdToScroll({ id: null, behavior: null });
        }
        // eslint-disable-next-line
    }, [idToScroll.id, idToScroll.behavior]);

    if (loading === true) {
        return (<SpinnerBox />);
    }
    else {
        return (
            <>
                <div className="Home">
                    {articles.map((article) => (
                        <div id={`event-${article?.id}`}  key={article?.id}>
                            <CardHome key={article.id} article={article} setEventsReload={setEventsReload} setDirtyLiked={setDirtyLiked} setError={setError} />
                        </div>
                    ))}
                </div>
            </>
        );
    }
}

import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import './ComicsList.css';
import '../elements/elements.css';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial
            ? setNewItemsLoading(false)
            : setNewItemsLoading(true);
        getAllComics(offset).then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComics) => {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }
        setComicsList(comics => [
            ...comics,
            ...newComics
        ]);
        setNewItemsLoading(false);
        setOffset(offset => offset + 8);
        setCharEnded(ended);
    }

    const itemRefs = [];

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            let path = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
            return (
                <li
                    key={i}
                    ref={el => itemRefs[i] = el}
                    className={item.thumbnail === path
                        ? "comics__card notImage"
                        : "comics__card"}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="card img"></img>
                        <div className="comics__name">{item.title}</div>
                        <div className="comics__price">{
                                item.price
                                    ? item.price + '$'
                                    : 'NOT AVALIABLE'
                            }
                        </div>
                    </Link>
                </li>
            )
        })
        return items;
    }

    const items = renderItems(comicsList);

    const errorMessage = error
        ? <ErrorMessage/>
        : null;
    const spinner = loading && !newItemsLoading
        ? <Spinner/>
        : null;
    return (
        <div className="comics">
            < div className = "comics__cards" > <ul>
            {errorMessage}
            {spinner}
            {items}
        </ul>
        <button
            className="button button__main large"
            disabled={newItemsLoading}
            style={{
                'display' : charEnded
                    ? 'none'
                    : 'block'
            }}
            onClick={() => {
                onRequest(offset)
            }}>
            load more
        </button>
    </div>
        </div> 
    )
}

export default ComicsList;

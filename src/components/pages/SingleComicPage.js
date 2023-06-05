import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './SingleComicPage.css'
import '../elements/elements.css';

import useMarvelService from '../../services/MarvelService';
import ErrorMassage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const SingleComicPage = () => {

    const {comicId} = useParams();
    const [comic, setComic] = useState();

    const {loading, error, clearError, getComic} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded);
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMassage /> : null;
    const content = !(loading || error || !comic ) ? <View comic={comic}/> : null;

    return (
        <>
        {errorMessage}
        {spinner}
        {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price} = comic;
    return (
        <div className="comic">
            <img src={thumbnail} alt="comic cover" className="comic__img" />
            <div className="comic__info">
                <h2 className="comic__name">{title}</h2>
                <p className="comic__descr">{description}</p>
                <p className="comic__descr">{pageCount}</p>
                <p className="comic__descr">Languages: {language}</p>
                <p className="comic__price">{price}</p>
            </div>
            <Link to='/comics' className="comic__goBack">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import '../elements/elements.css';

import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import ErrorMassage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const SinglePage = ({Component, type}) => {

    const {id} = useParams();
    const [data, setData] = useState(null);

    const {loading, error, clearError, getComic, getCharacter} = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        clearError();

        switch (type) {
            case 'comic':
                getComic(id)
                    .then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id)
                    .then(onDataLoaded);
                break;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMassage /> : null;
    const content = !(loading || error || !data ) ? <Component data={data}/> : null;

    return (
        <>
        <AppBanner />
        {errorMessage}
        {spinner}
        {content}
        </>
    )
}

export default SinglePage;
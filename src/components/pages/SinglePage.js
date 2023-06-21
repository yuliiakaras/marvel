import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import '../elements/elements.css';

import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';

const SinglePage = ({Component, type}) => {

    const {id} = useParams();
    const [data, setData] = useState(null);

    const {clearError, getComic, getCharacter, currentProcess, setCurrentProcess} = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        clearError();

        switch (type) {
            case 'comic':
                getComic(id)
                    .then(onDataLoaded)
                    .then(() => setCurrentProcess('confirmed'));
                break;
            case 'character':
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setCurrentProcess('confirmed'))
                break;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
        <AppBanner />
        {setContent(currentProcess, Component, data)}
        </>
    )
}

export default SinglePage;
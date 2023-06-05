import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './characterCards.css';
import '../elements/elements.css';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharacterCards = (props) => {

    const [characters, setCharacters] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    },[]);

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }   

    const onCharListLoaded = (newCharacters) => {
        let ended = false;
        if(newCharacters.length < 9) {
            ended = true;
        }
        setCharacters(characters => [...characters, ...newCharacters]);
        setNewItemsLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const itemRefs = [];

    const focusOnItem = (i) => {
        if(itemRefs && Array.isArray(itemRefs)) {
            itemRefs.forEach(item => {
                item.classList.remove('active-card');
            })
            itemRefs[i].classList.add('active-card');
            itemRefs[i].focus(); 
        }
    }

    const res = (arr) => {
        const items = arr.map((item, i) => {
            let path = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
            return (
                <li
                    key={item.id}
                    ref={el => itemRefs[i] = el}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyDown={e => {
                        if(e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i); 
                        }
                    }}
                    className={item.thumbnail === path
                        ? "character__card notImage"
                        : "character__card"}>
                    <img src={item.thumbnail} alt="card img"></img>
                    <div className="craracter__name">{item.name}</div>
                </li>
            )
        })
    return items;
}
    

    const items = res(characters);

    const errorMessage = error
        ? <ErrorMessage/>
        : null;
    const spinner = loading && !newItemsLoading
        ? <Spinner/>
        : null;
    return (
        <div className="character__cards">
            <ul>
                {errorMessage}
                {spinner}
                {items}
            </ul>
            <button 
                className="button button__main large"
                disabled={newItemsLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => {onRequest(offset)}}>
                load more
            </button>
        </div>
    )
}

CharacterCards.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharacterCards;

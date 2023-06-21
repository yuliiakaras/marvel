import { useState, useEffect } from 'react';

import '../elements/elements.css';
import "./CharacterRandom.css";
import useMarvelService from '../../services/MarvelService';
import mjolnir from "../../resources/img/mjolnir.png";
import setContent from '../../utils/setContent';

const CharacterRandom = () => {

    const [char, setChar] = useState({});

    const {clearError, getCharacter, currentProcess, setCurrentProcess} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateCharacter = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setCurrentProcess('confirmed'))
    }

    useEffect(() => {
        updateCharacter();
    }, []);

    const getRandCharacter = () => {
        updateCharacter();
    }
    
    return (
        <div className="characterRandom">
            {setContent(currentProcess, View, char)}
            <div className="characterRandom__static">
                <div className="characterRandom__title">
                    <p>Random character for today!
                        <br/>
                        Do you want to get to know him better?</p>
                    <p>Or choose another one</p>
                </div>
                <button onClick={getRandCharacter} className="button button__main">try it</button>
                <div className="characterRandom__decor">
                    <img src={mjolnir} alt="random decor"/>
                </div>
            </div>
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;
    let path = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
   

    return (
        <div className="characterRandom__card">
            <div className= {thumbnail === path ? "characterRandom__img notImage" : "characterRandom__img" }>
                <img src={thumbnail} alt="random img"/>
            </div>
            <div className="characterRandom__content">
                <p className="characterRandom__name">{name}</p>
                <p className="characterRandom__description">
                    {description}
                </p>
                <div className="characterRandom__btns">
                    <button className="button button__main">
                        <a href={homepage}>homepage</a>
                    </button>
                    <button className="button button__secondary">
                        <a href={wiki}>wiki</a>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default CharacterRandom;
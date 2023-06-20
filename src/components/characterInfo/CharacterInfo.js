import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './characterInfo.css';
import useMarvelService from '../../services/MarvelService';
import Skeleton from "../skeleton/skeleton";
import ErrorMassage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';

const CharacterInfo = (props) => {

    const [char, setChar] = useState(null);

    const {loading, error, clearError, getCharacter} = useMarvelService();

    useEffect(() => {
        updateCharacter();
    },[props.charId]);

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateCharacter = () => {
        clearError();
        const {charId} = props;
        if(!charId) {
            return;
        }
        getCharacter(charId)
            .then(onCharLoaded);
    }

    const skeleton = char || loading || error ? null :  <Skeleton />;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMassage /> : null;
    const content = !(loading || error || !char ) ? <View char={char}/> : null;
    return (
        <div className="character__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    let path = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
    return (
        <>
            <div className="character__basics">
                    <div className={thumbnail === path
                        ? "character__img notImage"
                        : "character__img"}>
                        <img src={thumbnail} alt={name}/>
                    </div>
                    <div className="character__data">
                        <div className="character__name">{name}</div>
                        <div className="character__btns">
                            <button className="button button__main">
                                <a href={homepage}>homepage</a>
                            </button>
                            <button className="button button__secondary">
                                <a href={wiki}>wiki</a>
                            </button>
                        </div>
                    </div>
    
                </div>
                <div className="character__descr">
                    {description}
                </div>
                <div className="character__comics">Comics:</div>
                <ul className="character__comics-list">
                    {comics.length > 0 ? null : "There is no comics with the character"}
                    {comics.map((item, i) => {
                        if(i < 10) {
                            
                            return (
                                <li key={i} className="character__comics-item">
                                    <Link to={`/comics/${item.resourceURI.match(/\d+$/)[0]}`}>{item.name}</Link>
                                    {item.name}
                                </li>
                            )
                        }
                        
                    })}
                </ul>
        </>
    )
}

CharacterInfo.propTypes = {
    charId: PropTypes.number
}

export default CharacterInfo;
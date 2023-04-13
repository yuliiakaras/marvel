import {Component} from 'react';

import '../elements/elements.css';
import "./CharacterRandom.css";
import MarvelService from '../../services/MarvelService';
import mjolnir from "../../resources/img/mjolnir.png";
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharacterRandom extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }

    onCharLoading = () => {
        this.setState({loading: true})
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading();
        this.marvelService
                .getCharacter(id)
                .then(this.onCharLoaded)
                .catch(this.onError)
    }

    componentDidMount() {
        this.updateCharacter();
    }

    getRandCharacter = () => {
        this.updateCharacter();
        this.setState({error: false});
    }

    render() {
        const {char, loading, error} = this.state;
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = !(spinner || errorMessage) ? <View char={char}/> : null;
        return (
            <div className="characterRandom">
                {errorMessage}
                {spinner}
                {content}
                <div className="characterRandom__static">
                    <div className="characterRandom__title">
                        <p>Random character for today!
                            <br/>
                            Do you want to get to know him better?</p>
                        <p>Or choose another one</p>
                    </div>
                    <button onClick={this.getRandCharacter} className="button button__main">try it</button>
                    <div className="characterRandom__decor">
                        <img src={mjolnir} alt="random decor"/>
                    </div>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
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
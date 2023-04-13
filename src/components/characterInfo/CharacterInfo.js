import { Component } from 'react';
import PropTypes from 'prop-types';
import './characterInfo.css';
import MarvelService from '../../services/MarvelService';
import Skeleton from "../skeleton/skeleton";
import ErrorMassage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharacterInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharacter();
    }

    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId) {
            this.updateCharacter();
        }
    }

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
        const {charId} = this.props;
        if(!charId) {
            return;
        }
        this.onCharLoading();
        this.marvelService.getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)  
    }

    render() {
        const {char, loading, error} = this.state;
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
                                    {/* <a href={`${item.resourceURI} + 'apikey=b481cc3f7e4b607f867263f7502d4a6e'`}>{item.name}</a> */}
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
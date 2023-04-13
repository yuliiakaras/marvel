import {Component} from 'react';
import PropTypes from 'prop-types';

import './characterCards.css';
import '../elements/elements.css';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class characterCards extends Component {
    state = {
        characters: [],
        loading: true,
        error: false,
        newItemsLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    onError = () => {
        this.setState({loading: false, error: true})
    }

    componentDidMount() {
        this.onRequest();
    }

    // onRequest = (offset) => {
    //     this.onCharListLoading();
    //     this
    //         .marvelService
    //         .getAllCharacters(offset)
    //         .then(this.onCharListLoaded)
    //         .catch(this.onError);
    // }

    onRequest = () => {
        const { characters, offset } = this.state;
    
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(newCharacters => {
                let ended = false;
                if (newCharacters.length < 9) {
                    ended = true;
                }
    
                this.setState({
                    characters: [...characters, ...newCharacters],
                    loading: false,
                    newItemsLoading: false,
                    offset: offset + 9,
                    charEnded: ended
                });
            })
            .catch(this.onError);
    }    

    onCharListLoading = () => {
        this.setState({newItemsLoading: true})
    }

    onCharListLoaded = (newCharacters) => {
        let ended = false;
        if(newCharacters.length < 9) {
            ended = true;
        }
        this.setState(({offset, characters}) => ({
            characters: [...characters, ...newCharacters], 
            loading: false, 
            newItemsLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (i) => {
        this.itemRefs.forEach(item => {
            item.classList.remove('active');
        })
        this.itemRefs[i].classList.add('active');
        this.itemRefs[i].focus();
    }

    res = (arr) => {
        const items = arr.map((item, i) => {
            let path = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
            return (
                <li
                    key={item.id}
                    ref={this.setRef}
                    onClick={() => {
                        this.props.onCharSelected(item.id);
                        this.focusOnItem(i);
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

    render() {
        const {characters, loading, error, newItemsLoading, offset, charEnded} = this.state;
        const items = this.res(characters);

        const errorMessage = error
            ? <ErrorMessage/>
            : null;
        const spinner = loading
            ? <Spinner/>
            : null;
        const content = !(spinner || errorMessage)
            ? items
            : null;
        return (
            <div className="character__cards">
                <ul>
                    {errorMessage}
                    {spinner}
                    {content}
                </ul>
                <button 
                    className="button button__main large"
                    disabled={newItemsLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => {this.onRequest(offset)}}>
                    load more
                </button>
            </div>
        )
    }

}

characterCards.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default characterCards;


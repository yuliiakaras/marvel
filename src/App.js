import {Component} from 'react';

import './App.css';
import Header from "./components/header/Header.js";
import CharacterRandom from "./components/characterRandom/CharacterRandom";
import CharacterCards from "./components/characterCards/CharacterCards";
import CharacterInfo from './components/characterInfo/CharacterInfo';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import vision from "../src/resources/img/vision.png";
class App extends Component {

    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({selectedChar: id})
    }

    render() {
        return (
            <div className="app">
                <Header/> {
                    <main>
                            <ErrorBoundary>
                              <CharacterRandom/>
                            </ErrorBoundary>
                            <div className="character">
                                <ErrorBoundary>
                                  <CharacterCards onCharSelected={this.onCharSelected}/>
                                </ErrorBoundary>
                                <ErrorBoundary>
                                    <CharacterInfo charId={this.state.selectedChar}/>
                                </ErrorBoundary>
                            </div>
                            <div className="decor">
                                <img src={vision} alt="background img"/></div>
                   </main>
                }
            </div>
        );
    }
}

export default App;
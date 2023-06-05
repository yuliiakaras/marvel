import {useState} from 'react';

import CharacterRandom from "../characterRandom/CharacterRandom";
import CharacterCards from "../characterCards/CharacterCards";
import CharacterInfo from '../characterInfo/CharacterInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import vision from '../../resources/img/vision.png'
const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <> 
            < ErrorBoundary > 
                <CharacterRandom/>
            </ErrorBoundary>
            <div className="character">
                <ErrorBoundary>
                    <CharacterCards onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharacterInfo charId={selectedChar}/>
                </ErrorBoundary>
            </div>
            <div className="decor">
                        <img src={vision} alt="background img"/>
                    </div>
        </>
    )
}

export default MainPage;
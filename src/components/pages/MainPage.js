import {useState} from 'react';
import { Helmet } from 'react-helmet';

import CharacterRandom from "../characterRandom/CharacterRandom";
import CharacterCards from "../characterCards/CharacterCards";
import CharacterInfo from '../characterInfo/CharacterInfo';
import CharacterForm from '../characterForm/CharacterForm';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import vision from '../../resources/img/vision.png'
const MainPage = () => {
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <> 
            <Helmet>
                <meta 
                    name="description" 
                    content="Marvel information portal" />
                <title>Marvel information portal</title>
            </Helmet>
            < ErrorBoundary > 
                <CharacterRandom/>
            </ErrorBoundary>
            <div className="character">
                <div className="col1">
                    <ErrorBoundary>
                        <CharacterCards onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                </div>
                <div className="col2">
                    <ErrorBoundary>
                        <CharacterInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharacterForm />
                    </ErrorBoundary>
                </div>
            </div>
            <div className="decor">
                <img src={vision} alt="background img"/>
            </div>
        </>
    )
}

export default MainPage;
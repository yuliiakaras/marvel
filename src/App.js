import './App.css';

import Header from "./components/header/Header.js";
import MainPage from './components/pages/MainPage';
import ComicsPage from './components/pages/ComicsPage';
import ErrorPage from './components/errorPage/ErrorPage';
import SingleComicPage from './components/pages/SingleComicPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
const App = () => {

    return (
        <Router>
            <div className="app">
                <Header/>
                <main>
                    <Routes>
                        < Route path='/' element={<MainPage/>} />
                        < Route path='/comics' element={<ComicsPage/>} />
                        < Route path='/comics/:comicId' element={<SingleComicPage/>} />
                        < Route path='*' element={<ErrorPage/>} />
                    </Routes>
                    
                </main>
            </div>
        </Router>
    );
}

export default App;
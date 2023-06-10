import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';
import Spinner from './components/spinner/Spinner';
import Header from "./components/header/Header.js";

const MainPage = lazy(() => import('./components/pages/MainPage'));
const ComicsPage = lazy (() => import( './components/pages/ComicsPage'));
const ErrorPage = lazy (() => import('./components/errorPage/ErrorPage'));
const SingleComicPage = lazy (() => import('./components/pages/SingleComicPage'));

const App = () => {

    return (
        <Router>
            <div className="app">
                <Header/>
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            < Route path='/' element={<MainPage/>}/>
                            < Route path='/comics' element={<ComicsPage/>}/>
                            < Route path='/comics/:comicId' element={<SingleComicPage/>}/>
                            < Route path='*' element={<ErrorPage/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
}

export default App;
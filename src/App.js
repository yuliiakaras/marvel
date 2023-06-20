import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css';
import Spinner from './components/spinner/Spinner';
import Header from "./components/header/Header.js";

const MainPage = lazy(() => import('./components/pages/MainPage'));
const ComicsPage = lazy (() => import( './components/pages/ComicsPage'));
const ErrorPage = lazy (() => import('./components/errorPage/ErrorPage'));
const SinglePage = lazy (() => import('./components/pages/SinglePage'));
const SingleComicLayout = lazy (() => import('./components/singleComicLayout/SingleComicLayout'));
const SingleCharacterLayout = lazy (() => import('./components/singleCharacterLayout/SingleCharacterLayout'));

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
                            < Route path='/comics/:id' element={<SinglePage Component={ SingleComicLayout } type='comic' />}/>
                            < Route path='/characters/:id' element={<SinglePage Component={ SingleCharacterLayout } type='character' />}/>
                            < Route path='*' element={<ErrorPage/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
}

export default App;
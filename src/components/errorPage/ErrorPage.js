import './ErrorPage.css'

import { useNavigate } from 'react-router-dom';

import error from "../../resources/img/404.png";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className="content">
            <div className="content__image">
                <img src={error} alt="404 ERROR" />
            </div>
            <div className="content__info">
            <p>404 PAGE NOT FOUND</p>
            <button className="button button__main" onClick={() => navigate(-1)}>Go back</button>
            </div>
        </div>
    )
}

export default ErrorPage;
import './AppBanner.css';

import avengers from "../../resources/img/Avengers.png";
import avengers_logo from "../../resources/img/Avengers_logo.png";

const AppBanner = () => {
    return (
        <>
        <div className="comics__adv">
            <img src={avengers} alt="comics crowd" className="comics__people" />
            <div className="comics__heading"><p>New comics every week!</p> <p>Stay tuned!</p></div>
            <img src={avengers_logo} alt="comics logo" className="comics__logo" />
        </div>
        </>
    )
}

export default AppBanner;
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './SingleComicLayout.css'
import '../elements/elements.css';

const SingleComicLayout = ({data}) => {
        const {title, description, pageCount, thumbnail, language, price} = data;
        return (
            <div className="comic">
                <Helmet>
                    <meta 
                        name="description" 
                        content={`${title} page`} />
                    <title>{title}</title>
                </Helmet>
                <img src={thumbnail} alt="comic cover" className="comic__img" />
                <div className="comic__info">
                    <h2 className="comic__name">{title}</h2>
                    <p className="comic__descr">{description}</p>
                    <p className="comic__descr">{pageCount}</p>
                    <p className="comic__descr">Languages: {language}</p>
                    <p className="comic__price">{price}</p>
                </div>
                <Link to='/comics' className="comic__goBack">Back to all</Link>
            </div>
        )
    }

export default SingleComicLayout;
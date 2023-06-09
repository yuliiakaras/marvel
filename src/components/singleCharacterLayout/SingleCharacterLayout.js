import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './SingleCharacterLayout.css'
import '../elements/elements.css';

const SingleCharacterLayout = ({data}) => {
    const {name, description, thumbnail} = data;
    return (
        <div className="singleCharacter">
            <Helmet>
                <meta 
                    name="description" 
                    content={`${name} page`} />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt="singleCharacter cover" className="singleCharacter__img" />
            <div className="singleCharacter__info">
                <h2 className="singleCharacter__name">{name}</h2>
                <p className="singleCharacter__descr">{description}</p>
            </div>
            <Link to='/' className="singleCharacter__goBack">Back to all</Link>
        </div>
    )
}

export default SingleCharacterLayout;
import img from "./error.gif"

const ErrorMessage = () => { 
    return (
        <img style={{display: 'block', height: '250px', width: '250px', objectFit: 'contain', margin: '0 auto'}} src = {img} alt = 'error img'/>
    )
}

export default ErrorMessage;
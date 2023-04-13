import './skeleton.css'
const Skeleton = () => {
    return (
        <>
            <p className="character__select">Please select a character to see information</p>
                <div className="skeleton">
                    <div className="pulse sceleton__header">
                        <div className="pulse sceleton__icon"></div>
                        <div className="pulse sceleton__title"></div>
                    </div>
                    <div className="pulse skeleton__block"></div>
                    <div className="pulse skeleton__block"></div>
                    <div className="pulse skeleton__block"></div>
                </div>
        </>
    )
}

export default Skeleton;
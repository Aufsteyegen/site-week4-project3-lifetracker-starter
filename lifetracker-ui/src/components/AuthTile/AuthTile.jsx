import "./AuthTile.css"
import PropTypes from 'prop-types'



export default function AuthTile({ showDate=false, header, leftLabel, rightLabel, 
                                   leftValue, rightValue, id, category,
                                   imageUrl, timestamp }) {
    
    const email = localStorage.getItem('email');
    const username = email.substring(0, email.indexOf('@'));
    
    return (
        <div>
            {showDate && (<div className="activity-date">
            Timestamp: {timestamp}
            </div>)}
            {id !== "" && (<div>Activity ID: {id}</div>)}
            <div className="single-auth-tile">
                <div>
                    <div className="photo">{header[0].toUpperCase()}
                    </div>
                        <div><h2>{header}</h2></div>
                        <div>UserID: {username}</div>
                        <div className="card-img"><img src={imageUrl} /></div>
                        <div>Image URL: {imageUrl}</div>
                        <div className="category">Category: {category}</div>
                    </div>
                <div className="auth-tile-line"></div>
                <div className="tile-content-wrapper">
                {leftLabel !== "" && (
                <div className="tile-content">
                    <h3>{leftLabel}</h3>
                    {leftValue}
                </div>
                )}
                {rightLabel !== "" && (
                <div className="tile-content">
                    <h3>{rightLabel}</h3>
                    {rightValue}
                </div>
                )}
                </div>
            </div>
            <div className="below-tile-line"></div>
        </div>
    )
}

AuthTile.propTypes = {
    header: PropTypes.string.isRequired,
    leftLabel: PropTypes.string.isRequired,
    rightLabel: PropTypes.string.isRequired,
    leftValue: PropTypes.any.isRequired,
    rightValue: PropTypes.any.isRequired,
    showDate: PropTypes.any.isRequired,
    category: PropTypes.any.isRequired,
    imageUrl: PropTypes.any.isRequired,
    timestamp: PropTypes.any.isRequired
}
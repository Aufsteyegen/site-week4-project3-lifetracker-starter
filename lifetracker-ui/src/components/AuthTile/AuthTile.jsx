import "./AuthTile.css"
import PropTypes from 'prop-types'


export default function AuthTile({ showDate=false, header, leftLabel, rightLabel, leftValue, rightValue, id }) {
    const currentDate = new Date()
    const month = currentDate.getMonth() + 1
    const day = currentDate.getDate()
    const year = currentDate.getFullYear()
    return (
        <div>
            {showDate && (<div className="activity-date">
            {month}/{day}/{year}
            </div>)}
            {id !== "" && (<div>Activity ID: {id}</div>)}
            <div className="single-auth-tile">
                <div>
                    <div className="photo">{header[0].toUpperCase()}</div><b></b><h2>{header}</h2></div>
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
    showDate: PropTypes.any.isRequired
}
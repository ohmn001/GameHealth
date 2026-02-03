import React from 'react';
import './Card.css';

const Card = ({ isFlipped, onFlip, content }) => {
    return (
        <div className={`card-container ${isFlipped ? 'flipped' : ''}`} onClick={onFlip}>
            <div className="card-inner">
                {/* Front = Pattern (What you see before flipping) */}
                <div className="card-front">
                    <div className="card-pattern">
                        <div className="card-logo">☾</div>
                    </div>
                </div>

                {/* Back = Result (Revealed after flip) */}
                <div className="card-back">
                    {content ? (
                        <>
                            <div className="food-type">{content.type}</div>
                            <div className="food-image-container">
                                <img src={content.image} alt={content.name} className="food-image" />
                            </div>
                            <h2 className="food-title">{content.name}</h2>
                            <div className="food-luck">{content.luck}</div>
                            <p className="food-desc">{content.description}</p>
                            <div className="glow-btn">ดูรายละเอียด</div>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;

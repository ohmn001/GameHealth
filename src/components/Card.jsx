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
                            <img src={content.image_url} alt={content.title} className="food-image" />
                            <div className="food-title-container">
                                <h2 className="food-title">{content.title}</h2>
                            </div>
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

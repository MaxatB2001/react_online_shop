import React from "react"
import classes from './RatingStars.module.scss'
import {useState} from "react";

const RatingStars = ({selectedStar, setSelectedStar}) => {
    const [hover, setHover] = useState(null);
    return (
        <div>
            {
                [...Array(5)].map((star,i) => {
                    const ratingValue = i + 1;

                    return (
                        <label key={i}>
                            <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => setSelectedStar(ratingValue)}
                            />
                            <i
                                className={`bi bi-star ${classes.starIcon}`}
                                style={ratingValue <= (hover || selectedStar) ? {color: '#fe7200'} : {color: '#C9C9C9'}}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                            >

                            </i>
                        </label>
                    )
                })
            }
        </div>
    );
};

export default RatingStars;
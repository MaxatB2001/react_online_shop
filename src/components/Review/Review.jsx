import React from 'react';
import {observer} from "mobx-react-lite";

const Review = observer(({review}) => {
    return (
        <div>
            <span>{review.user.email}</span>
            <span style={{marginLeft: "10px"}}>{[...Array(review.starId)].map((s, index) =>
                <i key={index} style={{color: "orange"}} className="bi bi-star-fill"></i>
            )}</span>
            <p>{review.createdAt.slice(0, 10)}</p>
            <h5 style={{fontWeight: "600"}}>Комментарий</h5>
            <p>{review.message}</p>
        </div>
    );
});

export default Review;
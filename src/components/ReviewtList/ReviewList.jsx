import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Col, Row} from "react-bootstrap";
import CreateReview from "../Modals/CreateReview";
import {Context} from "../../index";
import {fetchComments} from "../../queries/ProductsApi";
import Review from "../Review/Review";

const ReviewList = observer(({productProp}) => {
    const {product} = useContext(Context)
    const [show, setShow] = useState(false)
    useEffect(() => {
        fetchComments(productProp.id).then(data => product.setReviews(data))
    }, [])
    console.log(product.reviews)
    return (
        <div className="mt-5">
            <CreateReview productProp={productProp} show={show} handleClose={() => setShow(false)}/>
            <Row>
                <Col md={3}>
            <Button onClick={() => setShow(true)} variant={"outline-warning"}>Оставить отзыв</Button>
                </Col>
                <Col md={9}>
            {product.reviews.map(r =>
                <Review key={r.id} review={r}/>
            )}
                </Col>
            </Row>
        </div>
    );
});

export default ReviewList;
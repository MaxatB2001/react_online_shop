import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {createComment, fetchStars} from "../../../queries/ProductsApi";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import MyModal from "../Modal/MyModal";
import classes from "./CreateReview.module.scss"
import MyTextArea from "../../UI/TextArea/MyTextArea";
import RatingStars from "../../RatingStars/RatingStars";
import MyButton from "../../UI/Button/Button";

const CreateReview = observer(({showModal, setShowModal, productProp}) => {
    const {user, product} = useContext(Context)
    const [reviewText, setReviewText] = useState('')
    const [selectedStar, setSelectedStar] = useState(null)
    const createReview = () => {
        const body = {
            message: reviewText,
            starId: selectedStar,
            productId: productProp.id,
        }
        createComment(productProp.slug, body).then(data => {
            product.setReviews([...product.reviews, {...data, user: {email: user.user.email}}])
            setShowModal(false)
        })
    }
    return (
        <MyModal showModal={showModal} setShowModal={setShowModal} title="Оставить отзыв">
                <RatingStars selectedStar={selectedStar} setSelectedStar={setSelectedStar}/>
                <MyTextArea value={reviewText} onChange={e => setReviewText(e.target.value)}/>
                <MyButton onClick={createReview}>Отправить отзыв</MyButton>
        </MyModal>
    );
});

export default CreateReview;
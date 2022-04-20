import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {createComment, fetchStars} from "../../queries/ProductsApi";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const CreateReview = observer(({show, handleClose, productProp}) => {
    const {user, product} = useContext(Context)
    const [stars, setStars] = useState([])
    const [reviewText, setReviewText] = useState('')
    const [selectedStar, setSelectedStar] = useState({})
    const createReview = () => {
        const body = {
            message: reviewText,
            starId: selectedStar.id,
            productId: productProp.id,
        }
        createComment(productProp.slug, body).then(data => {
            product.setReviews([...product.reviews, {...data, user: {email: user.user.email}}])
            handleClose()
            console.log(data)
        })

    }
    useEffect(() => {
        fetchStars().then(data => setStars(data))
    }, [])
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Оставьте отзыв</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-3">
                        <Dropdown.Toggle variant={"warning"}>{selectedStar.value || 'ваша оценка'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {stars.map(s =>
                                <Dropdown.Item
                                    key={s.id}
                                    onClick={() => setSelectedStar(s)}
                                >
                                    {s.value}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Ваш отзыв</Form.Label>
                        <Form.Control value={reviewText} onChange={e => setReviewText(e.target.value)} as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="warning" onClick={() => createReview()}>
                    Отправить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateReview;
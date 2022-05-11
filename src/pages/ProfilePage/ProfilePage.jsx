import React, {useContext, useEffect} from 'react';
import {Context} from "../../index";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE} from "../../utils/consts";
import {getUserOrders} from "../../queries/OrderApi";

const ProfilePage = () => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    useEffect(() => {
        getUserOrders(user.user.id).then(data => console.log(data))
    }, [])
    return (
        <div>
            <h1>{user.user.email}</h1>
            {user.isAdmin && <Button onClick={() => navigate(ADMIN_ROUTE)} variant={"warning"}>Панель администратора</Button>}
        </div>
    );
};

export default ProfilePage;
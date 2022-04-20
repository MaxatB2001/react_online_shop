import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import {login, registration} from "../../queries/UserApi";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";


const Auth = observer(() => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const isLoginPath = pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const click = async () => {
        try {
            let data;
            if (isLoginPath) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            const admin = data.roles.filter(role => role.value === 'ADMIN')
            if (admin) {
                user.setIsAdmin(true)
            }
            navigate(HOME_ROUTE)
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card className="p-5" style={{width: 600, boxShadow: '0px 0px 10px rgba(0,0,0,0.5)'}}>
                <h2 className="m-auto">{isLoginPath ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Ваш email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Ваш пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="d-flex justify-content-between mt-3 ">
                        {isLoginPath ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}> Зарегистрируйтесь!</NavLink>
                            </div>
                            :
                            <div>
                                Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}> Войдите</NavLink>
                            </div>
                        }

                        <Button
                            variant="outline-warning"
                            onClick={click}
                        >
                            {isLoginPath ?
                                "Войти"
                                :
                                "Зарегистрироваться"
                            }
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
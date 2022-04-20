import React, {useContext} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {publicRoutes, authRoutes} from "../routes";
import {HOME_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(route =>
                <Route key={route.path} path={route.path} element={route.Component}/>
            )}
            {publicRoutes.map(route =>
                <Route key={route.path} path={route.path} element={route.Component}/>
            )}
            <Route
                path="*"
                element={<Navigate to={HOME_ROUTE} replace />}
            />
        </Routes>
    );
};

export default AppRouter;
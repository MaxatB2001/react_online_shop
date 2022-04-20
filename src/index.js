import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './custom.scss'
import './index.css'
import UserStore from "./store/UserStore";
import CatalogStore from "./store/CatalogStore";
import ProductStore from "./store/ProductStore";
import CartStore from "./store/CartStore";

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        catalog: new CatalogStore(),
        product: new ProductStore(),
        cart: new CartStore(),
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);

import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header/Header";
import CatalogModal from "./components/Modals/CatalogModal/CatalogModal";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {check} from "./queries/UserApi";
import {Spinner} from "react-bootstrap";
import {fetchParentCategories} from "./queries/ProductsApi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = observer(() => {
    const {user} = useContext(Context)
    const {product} = useContext(Context)
    const {cart} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchParentCategories().then(data => product.setParentCategories(data))
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
            const admin = data.roles.filter(role => role.value === 'ADMIN')
            if (admin) {
                user.setIsAdmin(true)
            }
        }).finally(() => setIsLoading(false))
        product.initialWatchedRecently()
        cart.initial()
    }, [])

    if (isLoading) {
        return <Spinner style={{display: "flex", justifyContent: "center", alignItems: "center"}} animation={"grow"}/>
    }
  return (
      <BrowserRouter>
        <Header/>
          <CatalogModal/>
        <AppRouter/>
      </BrowserRouter>
  );
})

export default App;

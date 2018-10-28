import * as React from "react";
import {Provider} from "react-redux";
import Navigation from "./Components/Navigation/Navigation";
import {Route, Switch} from "react-router";
import {productsPath} from "./Util/config";
import AuthenticatedRoute from "./Components/AuthenticatedRoute/AuthenticatedRoute";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Sidebar from "./Components/Sidebar/Sidebar";
import {Store} from "redux";
import AccountPage from "./Pages/AccountPage/AccountPage";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import ShoppingCart from "./Pages/ShoppingCart/ShoppingCart";
import SearchResultPage from "./Pages/SearchResultPage/SearchResultPage";
import HardwarePage from "./Pages/HardwarePage/HardwarePage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LogoutPage from "./Pages/LogoutPage/LogoutPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import HomePage from "./Pages/HomePage/HomePage";
import {History} from "history";
import {ConnectedRouter} from "connected-react-router";

interface Props {
    history: History;
    store: Store;
}

interface State {

}

class Main extends React.Component<Props, State> {

    public render() {

        return (
            <Provider store={this.props.store}>
                <ConnectedRouter history={this.props.history}>
                    <div className="page">
                        <Navigation/>
                        <div className="split-content-sidebar">

                            <Switch>
                                <Route exact={true} path="/" component={HomePage}/>
                                <Route path="/login" component={LoginPage}/>
                                <Route path="/logout" component={LogoutPage}/>
                                <Route path="/register" component={RegisterPage}/>
                                <Route path={productsPath + "/:id"} component={ProductPage}/>
                                <Route exact={true} path="/hardware/" component={HardwarePage}/>
                                <Route path="/search" component={SearchResultPage}/>
                                <Route path="/warenkorb" component={ShoppingCart}/>
                                <AuthenticatedRoute path="/checkout" component={CheckoutPage}/>
                                <AuthenticatedRoute path="/konto" component={AccountPage}/>
                                <Route component={ErrorPage}/>
                            </Switch>

                            <Sidebar/>
                        </div>
                    </div>

                </ConnectedRouter>
            </Provider>
        );
    }
}

export default Main;

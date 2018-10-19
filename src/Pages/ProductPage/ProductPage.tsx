import * as React from "react";
import {formatPrice, quantityStatus} from "../../Util/util";
import {Product} from "../../Util/model";
import "./product-page.scss";
import {CartIcon} from "../../Components/Icons/Icons";
import {StatusText} from "../../Components/Indicator/StatusText";
import {connect} from "react-redux";
import {StoreProducts} from "../../Redux/Store/Store";
import {fetchProduct} from "../../Redux/ActionCreators/Products";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import {AddToCart} from "../../Redux/ActionTypes/CartActions";
import {RouteComponentProps} from "react-router";
import ButtonWithIcon from "../../Components/Buttons/ButtonWithIcon";

interface OwnProps extends RouteComponentProps<{ id: string }> {

}

interface RouterProps extends RouteComponentProps<{ id: string }> {

}

interface StateToPropsType {
    product?: Product;
    errorMessage: string;
    isFetching: boolean;
}

interface DispatchToPropsType {
    addToCart: (product: Product) => void;
    getProduct: (id: string) => void;
}

type Props = StateToPropsType & DispatchToPropsType & RouterProps & OwnProps;

interface State {

}

class ProductPage extends React.Component<Props, State> {

    public componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getProduct(id);
    }

    public render() {

        if (this.props.isFetching) return <LoadingSpinner/>;

        const p = this.props.product;
        if (!p) return <div>{this.props.errorMessage}</div>;

        const attributes = Object.keys(p.attributes).map((key: string) => (
            <div className="attribute" key={key}>
                <b>{key}</b>
                <span>{p.attributes[key]}</span>
            </div>
        ));

        const addToCart = (e: any) => this.props.addToCart(p);

        return (
            <div className="product-page">
                <h3> {p.pname}</h3>

                <div className="product-page__head">
                    <img src={p.imgurl}/>

                    <div className="add-to-cart">
                        <StatusText status={quantityStatus(p.quantity)}/>
                        <div className="price">{formatPrice(p.price)}</div>
                        <ButtonWithIcon onClick={addToCart} icon={CartIcon} text="in den Warenkorb"/>
                    </div>
                </div>

                <div className="product-page__description">
                    <div className="attribute-list">
                        {attributes}
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = ({products}: { products: StoreProducts }, ownProps: OwnProps): StateToPropsType => {

    const productState = products.productRequest;

    return {
        product: productState.product,
        isFetching: productState.isFetching,
        errorMessage: productState.errorMessage,
    };
};

const mapDispatchToProps = (dispatch: any): DispatchToPropsType => ({
    addToCart: (product: Product) => dispatch(new AddToCart(product)),
    getProduct: (id: string) => dispatch(fetchProduct(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);

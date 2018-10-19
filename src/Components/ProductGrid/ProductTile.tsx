import * as React from "react";
import {formatPrice, linkToProduct, quantityStatus} from "../../Util/util";
import {Product} from "../../Util/model";
import {StatusText} from "../Indicator/StatusText";
import {Link} from "react-router-dom";

interface Props {
    product: Product;
}

class ProductTile extends React.PureComponent<Props, {}> {

    public render() {
        const p = this.props.product;

        return (
            <Link to={linkToProduct(p.id)} className="product-tile" title={p.pname}>
                <div className="product-tile__title">{p.pname}</div>
                <div className="product-tile__image">
                    <img src={p.imgurl} alt={p.pname}/>
                </div>
                <div className="product-tile__info">
                    <span className="product-tile__availability">
                        <StatusText status={quantityStatus(p.quantity)}/>
                    </span>
                    <span className="product-tile__price">
                        {formatPrice(p.price)}
                    </span>
                </div>
            </Link>
        );
    }
}

export default ProductTile;

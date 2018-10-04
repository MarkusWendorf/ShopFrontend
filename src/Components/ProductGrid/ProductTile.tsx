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
                <div className="product-title">{p.pname}</div>
                <div className="image-wrapper">
                    <img src={p.imgurl} alt={p.pname}/>
                </div>
                <div className="product-info">
                <span className="availability">
                    <StatusText status={quantityStatus(p.quantity)}/>
                </span>
                    <span className="price">
                    {formatPrice(p.price)}
                </span>
                </div>
            </Link>
        );
    }
}

export default ProductTile;

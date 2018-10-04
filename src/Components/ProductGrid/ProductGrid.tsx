import * as React from "react";
import {Product} from "../../Util/model";
import ProductTile from "./ProductTile";
import "./product-grid.scss";

interface Props {
    products: Product[];
}

class ProductGrid extends React.PureComponent<Props, {}> {

    public render() {

        const products = this.props.products;
        const productTiles = products.map((product: Product) => (
            <ProductTile key={product.id} product={product}/>
        ));

        return (
            <div className="product-grid">
                {productTiles}
            </div>
        );
    }
}

export default ProductGrid;

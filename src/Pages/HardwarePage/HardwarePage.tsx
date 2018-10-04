import * as React from "react";
import {Link} from "react-router-dom";
import "./hardware-page.scss";
import {StoreProducts} from "../../Redux/Store/Store";
import {connect} from "react-redux";
import {fetchCategoryList} from "../../Redux/ActionCreators/Products";

interface OwnProps {

}

interface StateToPropsType {
    categories: string[];
    error: string;
}

interface DispatchToPropsType {
    getCategories: () => void;
}

type Props = StateToPropsType & DispatchToPropsType & OwnProps;

class HardwarePage extends React.Component<Props, {}> {

    public componentDidMount() {
        this.props.getCategories();
    }

    public render() {

        const sorted = this.props.categories.sort();
        const categories = sorted.map((category: string) => (
            <Link className="category-tile" key={category} to={"/search?category=" + category}>
                {category}
            </Link>
        ));

        return (
            <div>
                <div className="category-tiles">
                    {categories}
                    {this.props.error ? <p>{this.props.error}</p> : <p/>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({products}: { products: StoreProducts }, ownProps: OwnProps): StateToPropsType => ({
    categories: products.categoryList.categories,
    error: products.categoryList.errorMessage,
});

const mapDispatchToProps = (dispatch: any): DispatchToPropsType => ({
    getCategories: () => dispatch(fetchCategoryList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HardwarePage);

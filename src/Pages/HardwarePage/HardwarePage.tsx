import * as React from "react";
import {Link} from "react-router-dom";
import "./hardware-page.scss";
import {StoreProducts} from "../../Redux/Store/Store";
import {connect} from "react-redux";
import {fetchCategoryList} from "../../Redux/ActionCreators/Products";
import {searchPath} from "../../Util/config";

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
            <Link className="categories-page__tile" key={category} to={searchPath + "?category=" + category}>
                {category}
            </Link>
        ));

        return (
            <div className="categories-page">
                {categories}
                {this.props.error ? <p>{this.props.error}</p> : <p/>}
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

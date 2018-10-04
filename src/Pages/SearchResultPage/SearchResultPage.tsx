import * as React from "react";
import {Product} from "../../Util/model";
import {StoreProducts} from "../../Redux/Store/Store";
import {queryProducts} from "../../Redux/ActionCreators/Products";
import {connect} from "react-redux";
import ProductGrid from "../../Components/ProductGrid/ProductGrid";
import {RouteComponentProps} from "react-router";
import SearchBar from "../../Components/SearchBar/SearchBar";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import "./search-result-page.scss";
import Pagination from "../../Components/Pagination/Pagination";
import * as queryString from "querystring";

interface OwnProps extends RouteComponentProps<any> {

}

interface StateToPropsType {
    categories: string[];
    isFetching: boolean;
    errorMessage: string;
    products: Product[];
    page: number;
    isLast: boolean;
}

interface DispatchToPropsType {
    queryProducts: (queryString: string) => void;
}

type Props = StateToPropsType & DispatchToPropsType & OwnProps;

interface State {

}

class SearchResultPage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    public componentDidUpdate(prev: Props) {
        const location = this.props.location;

        if (location.search !== prev.location.search) {
            const queryStr = this.props.location.search;
            this.props.queryProducts(queryStr);
        }
    }

    public componentDidMount() {
        const queryStr = this.props.location.search;

        this.props.queryProducts(queryStr);
    }

    public render() {

        const pagination = (
            <Pagination
                current={this.props.page}
                onChange={this.pageChange}
                lastPage={this.props.isLast}
            />
        );

        const noResults = <p>{this.props.errorMessage || "Keine Treffer"}</p>;

        return (
            <div>
                <SearchBar/>
                <ProductGrid products={this.props.products}/>
                {this.props.isFetching && <LoadingSpinner/>}
                {this.props.products.length === 0 ? noResults : pagination}
            </div>
        );
    }

    private pageChange = (newPage: number, next: boolean) => {

        if (next && this.props.isLast) {
            return;
        }

        const queryStr = this.props.location.search;
        const path = this.props.location.pathname;

        const query = queryString.parse(queryStr.slice(1)); // remove leading '?'
        const updatedQuery = queryString.stringify({...query, page: newPage});

        this.props.history.push(path + "?" + updatedQuery);
    }
}

const mapStateToProps = ({products}: { products: StoreProducts }, ownProps: OwnProps): StateToPropsType => {
    const queryResult = products.queryProductsRequest;

    return {
        categories: products.categoryList.categories,
        isFetching: queryResult.isFetching,
        errorMessage: queryResult.errorMessage,
        page: queryResult.page,
        isLast: queryResult.isLast,
        products: queryResult.products,
    };
};

const mapDispatchToProps = (dispatch: any): DispatchToPropsType => ({
    queryProducts: (queryStr: string) => {
        if (queryStr.charAt(0) === "?") queryStr = queryStr.slice(1);
        dispatch(queryProducts(queryStr));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultPage);

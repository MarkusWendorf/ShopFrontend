import * as React from "react";
import {OptionsIcon, SearchIcon} from "../Icons/Icons";
import "./search-bar.scss";
import {StoreState} from "../../Redux/Store/Store";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
import * as queryString from "query-string";
import {removeEmptyValues} from "../../Util/util";
import {fetchCategoryList} from "../../Redux/ActionCreators/Products";
import SearchOptions from "./SearchOptions";

interface OwnProps {
    category?: string;
}

interface RouterProps extends RouteComponentProps<{ id: string }> {

}

interface StateToPropsType {
    categories: string[];
}

interface DispatchToPropsType {
    getCategories: () => void;
}

type Props = StateToPropsType & DispatchToPropsType & RouterProps & OwnProps;

interface State {
    hideOptions: boolean;
    query: {
        [key: string]: any,
    };
}

class SearchBar extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            hideOptions: false,
            query: {},
        };
    }

    public componentDidMount() {

        if (this.props.categories.length === 0) {
            // categories haven't been loaded yet
            this.props.getCategories();
        }

        const optionsFromPath = queryString.parse(this.props.location.search);
        this.setState({query: optionsFromPath});
    }

    public componentDidUpdate(prev: Props) {

        if (prev.location.search !== this.props.location.search) {

            const optionsFromPath = queryString.parse(this.props.location.search);
            const defaults = {
                category: this.props.category || "", priceFrom: "", priceTo: "", name: "",
            };

            // override defaults with options provided by url query
            this.setState({query: {...defaults, ...optionsFromPath}});
        }
    }

    public render() {

        const categories = this.props.categories;
        const {category = "", priceFrom = "", priceTo = "", name = ""} = this.state.query;

        return (
            <form className="search-bar" onSubmit={this.startSearch}>
                <div className="display-flex">

                    <input
                        className="search-input"
                        name="name"
                        onChange={this.updateForm}
                        value={name}
                        placeholder={category ? category + " durchsuchen" : "Produkte durchsuchen"}
                    />
                    <button type="submit">
                        <SearchIcon/>
                    </button>
                    <button type="button" onClick={this.hideOptions}>
                        <OptionsIcon/>
                    </button>
                </div>

                <div className={"search-options " + (this.state.hideOptions ? "hide" : "")}>
                    <SearchOptions
                        categories={categories}
                        category={category}
                        priceFrom={priceFrom}
                        priceTo={priceTo}
                        onChange={this.updateForm}
                    />
                </div>
            </form>
        );
    }

    private startSearch = (e: any) => {
        e.preventDefault();

        const cleanQuery = removeEmptyValues(this.state.query);
        const newQuery = queryString.stringify({...cleanQuery, page: 1});
        this.props.history.push({pathname: "/search", search: newQuery});
    }

    private updateForm = (e: any) => {
        this.setState({query: {...this.state.query, [e.target.name]: e.target.value}});
    }

    private hideOptions = (e: any) => {
        this.setState({hideOptions: !this.state.hideOptions});
    }
}

const mapStateToProps = (state: StoreState, ownProps: OwnProps): StateToPropsType => ({
    categories: state.products.categoryList.categories,
});

const mapDispatchToProps = (dispatch: any): DispatchToPropsType => ({
    getCategories: () => dispatch(fetchCategoryList()),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchBar));

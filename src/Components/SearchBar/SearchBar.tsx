import * as React from "react";
import * as queryString from "query-string";
import {OptionsIcon, SearchIcon} from "../Icons/Icons";
import "./search-bar.scss";
import {StoreState} from "../../Redux/Store/Store";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
import {linkToProduct, removeEmptyValues} from "../../Util/util";
import {fetchCategoryList, getAutocomplete} from "../../Redux/ActionCreators/Products";
import SearchOptions from "./SearchOptions";
import {searchPath} from "../../Util/config";
import {AutocompleteProduct} from "../../Util/model";
import {Link} from "react-router-dom";
import debounce from "lodash/debounce";

interface OwnProps {
    category?: string;
}

interface RouterProps extends RouteComponentProps<{ id: string }> {

}

interface StateToPropsType {
    categories: string[];
    autocomplete: AutocompleteProduct[];
}

interface DispatchToPropsType {
    getCategories: () => void;
    getAutocomplete: (search: string) => void;
}

type Props = StateToPropsType & DispatchToPropsType & RouterProps & OwnProps;

interface State {
    hideOptions: boolean;
    showAutocomplete: boolean;
    query: {
        [key: string]: any,
    };
}

class SearchBar extends React.Component<Props, State> {

    private wrapperRef: any;

    constructor(props: Props) {
        super(props);

        this.state = {
            showAutocomplete: false,
            hideOptions: false,
            query: {},
        };
    }

    public componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    public componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);

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
        const autocomplete = this.props.autocomplete;
        const {category = "", priceFrom = "", priceTo = "", name = ""} = this.state.query;

        const autocompleteItems = autocomplete.slice(0, 5).map((e: AutocompleteProduct) => (
            <Link key={e.id} to={linkToProduct(e.id)}>
                <li dangerouslySetInnerHTML={{__html: e.highlight}}/>
            </Link>
        ));

        return (
            <form className="search-bar" onSubmit={this.startSearch} ref={(node: any) => this.wrapperRef = node}>
                <div className="display-flex">

                    <input
                        className="search-input"
                        name="name"
                        onChange={this.onChange}
                        value={name}
                        placeholder={category ? category + " durchsuchen" : "Produkte durchsuchen"}
                        autoComplete="off"
                    />

                    <button type="submit">
                        <SearchIcon/>
                    </button>
                    <button type="button" onClick={this.toggleOptions}>
                        <OptionsIcon/>
                    </button>
                </div>

                {this.state.showAutocomplete &&
                <ul className="autocomplete">
                    {autocompleteItems}
                </ul>
                }

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

        this.hideAutocomplete();
        const cleanQuery = removeEmptyValues(this.state.query);
        const newQuery = queryString.stringify({...cleanQuery, page: 1});
        this.props.history.push({pathname: searchPath, search: newQuery});
    }

    private onChange = (e: any) => {

        const search = e.target.value;

        if (search.length > 1) {
            this.props.getAutocomplete(search);
            this.showAutocomplete();
        } else {
            this.hideAutocomplete();
        }

        this.updateForm(e);
    }

    private updateForm = (e: any) => {
        this.setState({query: {...this.state.query, [e.target.name]: e.target.value}});
    }

    private toggleOptions = (e: any) => {
        this.setState({hideOptions: !this.state.hideOptions, showAutocomplete: false});
    }

    private showAutocomplete = () => {
        this.setState({showAutocomplete: true});
    }

    private hideAutocomplete = () => {
        this.setState({showAutocomplete: false});
    }

    private handleClickOutside = (event: any) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({showAutocomplete: false});
        }
    }
}

const mapStateToProps = (state: StoreState, ownProps: OwnProps): StateToPropsType => {
    const products = state.products;

    return {
        categories: products.categoryList.categories,
        autocomplete: products.autocomplete,
    };
};

const mapDispatchToProps = (dispatch: any): DispatchToPropsType => ({
    getCategories: () => dispatch(fetchCategoryList()),
    // debounce to limit api calls
    getAutocomplete: debounce((search: string) => dispatch(getAutocomplete(search)), 300),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchBar));

import * as React from "react";
import "./search-options.scss";

interface Props {
    hide: boolean;
    categories: string[];
    category: string;
    priceFrom: number;
    priceTo: number;
    onChange: (e: any) => void;
}

interface State {

}

export default class SearchOptions extends React.PureComponent<Props, State> {

    public render() {

        const optionsClass = "search-options " + (this.props.hide ? "search-options--hide" : "");

        return (
            <div className={optionsClass}>
                <span className="search-options__option">
                    <label>Preis-Bereich</label>
                    <div className="range-selector">

                        <input
                            type="number"
                            name="priceFrom"
                            value={this.props.priceFrom}
                            placeholder={"von"}
                            onChange={this.props.onChange}
                            min="0"
                            max={"" + this.props.priceTo}
                        />

                        <span>-</span>

                        <input
                            type="number"
                            name="priceTo"
                            value={this.props.priceTo}
                            placeholder={"bis"}
                            onChange={this.props.onChange}
                            min={"" + this.props.priceFrom}
                        />
                    </div>
                </span>

                {this.props.categories &&
                <span className="search-options__option">
                    <label>Kategorie</label>
                    <select name="category" value={this.props.category} onChange={this.props.onChange}>
                        <option/>
                        {this.props.categories.map((c: string) =>
                            <option key={c}>{c}</option>)
                        }
                    </select>
                </span>
                }

            </div>
        );
    }

}

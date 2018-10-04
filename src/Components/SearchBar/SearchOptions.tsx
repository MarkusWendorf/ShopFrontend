import * as React from "react";

interface Props {
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

        return (
            <>
                <span className="option">
                    <label>Preis-Bereich</label>
                    <div className="range-selector">

                        <input
                            type="number"
                            name="priceFrom"
                            value={this.props.priceFrom}
                            placeholder={"von"}
                            onChange={this.props.onChange}
                        />

                        <span>-</span>

                        <input
                            type="number"
                            name="priceTo"
                            value={this.props.priceTo}
                            placeholder={"bis"}
                            onChange={this.props.onChange}
                        />
                    </div>
                </span>

                {this.props.categories &&
                <span className="option">
                    <label>Kategorie</label>
                    <select name="category" value={this.props.category} onChange={this.props.onChange}>
                        <option/>
                        {this.props.categories.map((c: string) =>
                            <option key={c}>{c}</option>)
                        }
                    </select>
                </span>
                }

            </>
        );
    }

}

import * as React from "react";
import "./pagination.scss";
import {ChevronLeftIcon, ChevronRightIcon} from "../Icons/Icons";

interface Props {
    current: number;
    onChange: (newPage: number, next: boolean) => void;
    lastPage: number;
}

const Pagination = (props: Props) => {
    const current = props.current;
    const disable = (disabled: boolean) => disabled ? {color: "gainsboro", cursor: "default"} : {};

    const prev = () => (current > 1) && props.onChange(current - 1, false);
    const next = () => props.onChange(current + 1, true);

    return (
        <div className="pagination">
            <div className="pagination__prev" onClick={prev}>
                <ChevronLeftIcon
                    style={disable(current === 1)}
                />
            </div>

            <span className="pagination__current">Seite {current}</span>

            <div className="pagination__next" onClick={next}>
                <ChevronRightIcon
                    style={disable(props.lastPage === current)}
                />
            </div>
        </div>
    );
};

export default Pagination;

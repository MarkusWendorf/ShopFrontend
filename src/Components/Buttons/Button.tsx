import * as React from "react";
import "./buttons.scss";

interface Props {
    text: string;
}

// make all button html attributes available
type PropsButton = Props & React.HTMLProps<HTMLButtonElement>;

class Button extends React.PureComponent<PropsButton, {}> {

    public render() {

        const {text, ...other} = this.props;

        return (
            <button className="icon-button" {...other}>
                <span className="text">{text}</span>
            </button>
        );
    }

}

export default Button;

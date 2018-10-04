import * as React from "react";
import {StoreProducts, StoreState} from "../../Redux/Store/Store";
import {connect} from "react-redux";
import {fetchCategory} from "../../Redux/ActionCreators/Products";
import "./homepage.scss";
import {
    CloudFrontIcon,
    DynamoDBIcon,
    LambdaIcon,
    ReactIcon,
    ReactRouterIcon,
    ReduxIcon,
    S3Icon,
    TypescriptIcon,
} from "../../Components/Icons/Icons";

interface Props {
    productsStore: StoreProducts;
    loadCategory: (group: string, page: number) => void;
}

interface State {

}

class HomePage extends React.Component<Props, State> {

    public render() {

        return (
            <div className="homepage">
                <div className="tile">
                    <h2>Frontend</h2>

                    <div className="technologies">
                        <div className="technology">
                            <div>React</div>
                            <ReactIcon/>
                        </div>
                        <div className="technology">
                            <div>Redux</div>
                            <ReduxIcon/>
                        </div>
                        <div className="technology">
                            <div>React Router</div>
                            <ReactRouterIcon/>
                        </div>
                    </div>

                    <div className="typescript">
                        <TypescriptIcon/>
                    </div>
                </div>

                <div className="tile">
                    <h2>Backend</h2>

                    <div className="aws">
                        <div className="technology">
                            <div>Lambda</div>
                            <LambdaIcon/>
                        </div>
                        <div className="technology">
                            <div>DynamoDB</div>
                            <DynamoDBIcon/>
                        </div>
                        <div className="technology">
                            <div>CloudFront</div>
                            <CloudFrontIcon/>
                        </div>
                        <div className="technology">
                            <div>S3</div>
                            <S3Icon/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: StoreState) => {
    return {
        productsStore: state.products,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadCategory: (group: string, page: number) => dispatch(fetchCategory(group, page)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

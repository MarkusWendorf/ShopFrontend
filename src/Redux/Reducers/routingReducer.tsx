import {AnyAction} from "redux";
import {StoreRouting} from "../Store/Store";

export const LOCATION_CHANGE = "@@router/LOCATION_CHANGE";

const initialState: StoreRouting = {
    location: null,
};

const routerReducer = (state = initialState, action: AnyAction): StoreRouting => {
    if (action.type === LOCATION_CHANGE) {
        return {...state, location: action.payload};
    }

    return state;
};

export default routerReducer;

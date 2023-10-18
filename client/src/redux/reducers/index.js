import { combineReducers } from "redux";
import reviewreducers from "./reviewreducer";


const reducers = combineReducers({
    review:reviewreducers,

})

export default reducers;
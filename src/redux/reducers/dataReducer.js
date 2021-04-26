import Immutable from "immutable";
import{
    GET_DATA,
    GET_SINGLE_DATA,
    CREATE_DATA,
    UPDATE_DATA,
    DELETE_DATA
} from '../../constants/constants';

const INITIAL_STATE = Immutable.fromJS({
    data: [],
    singleData: {}
});

export default function (state = INITIAL_STATE, action){
    let nextState = state.toJS();
    switch(action.type){
        case GET_DATA:
            let newModels = [];
            action.payload.map(model => {
                newModels.push({
                  key: model.uuid,
                  uuid: model.uuid,
                  infected: model.infected,
                  hospitalized: model.hospitalized,
                  tested: model.tested,
                  regionID: model.regionID,
                  date: model.date
                })
            })
            nextState = {...nextState, data: newModels}
            break;
        case GET_SINGLE_DATA: 
            nextState = {...nextState, singleData: action.payload}
            break;
        case CREATE_DATA:
            nextState = {...nextState, singleData: action.payload}
            break;
        case UPDATE_DATA:
            nextState = {...nextState, singleData: action.payload}
            break;
        case DELETE_DATA:
            let filtered = nextState.data.filter(el => el.uuid !== action.payload)
            nextState = {...nextState, data: filtered }
            break;
        default:
            break;    
    }

    return state.merge(nextState);
}

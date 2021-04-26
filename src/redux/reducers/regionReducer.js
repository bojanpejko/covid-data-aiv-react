import Immutable from "immutable";
import{
    GET_REGIONS,
    GET_REGION,
    CREATE_REGION,
    UPDATE_REGION,
    DELETE_REGION
} from '../../constants/constants';

const INITIAL_STATE = Immutable.fromJS({
    regions: [],
    region: {}
});

export default function (state = INITIAL_STATE, action){
    let nextState = state.toJS();
    switch(action.type){
        case GET_REGIONS:
            let newRegions = [];
            action.payload.map(region => {
                newRegions.push({
                  key: region.uuid,
                  uuid: region.uuid,
                  name: region.name,
                  number: region.number,
                  status: region.status,
                  adminID: region.adminID  
                })
            })
            nextState = {...nextState, regions: newRegions}
            break;
        case GET_REGION: 
            nextState = {...nextState, region: action.payload}
            break;
        case CREATE_REGION:
            nextState = {...nextState, region: action.payload}
            break;
        case UPDATE_REGION:
            nextState = {...nextState, region: action.payload}
            break;
        case DELETE_REGION:
            let filtered = nextState.regions.filter(el => el.uuid !== action.payload)
            nextState = {...nextState, regions: filtered }
            break;
        default:
            break;    
    }

    return state.merge(nextState);
}

import Immutable from "immutable";
import{
    GET_ADMINS,
    CREATE_ADMIN,
    DELETE_ADMIN
} from '../../constants/constants';

const INITIAL_STATE = Immutable.fromJS({
    admins: [],
    admin: {}
});

export default function (state = INITIAL_STATE, action){
    let nextState = state.toJS();
    switch(action.type){
        case GET_ADMINS:
            let newModels = [];
            action.payload.map(model => {
                newModels.push({
                  key: model.uuid,
                  uuid: model.uuid,
                  name: model.name,
                  surname: model.surname,
                  email: model.email  
                })
            })
            nextState = {...nextState, admins: newModels}
            break;
        case CREATE_ADMIN:
            nextState = {...nextState, admin: action.payload}
            break;
        case DELETE_ADMIN:
            let filtered = nextState.admins.filter(el => el.uuid !== action.payload)
            nextState = {...nextState, admins: filtered }
            break;
        default:
            break;    
    }

    return state.merge(nextState);
}

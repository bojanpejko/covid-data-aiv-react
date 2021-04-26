import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form/immutable'
import { connectRouter } from 'connected-react-router/immutable'

import regionReducer from './regionReducer'
import adminReducer from './adminReducer';
import dataReducer from './dataReducer'

const rootReducer = (history) => combineReducers({
    form: formReducer,
    router: connectRouter(history),
    regions: regionReducer,
    admins: adminReducer,
    data: dataReducer
});

export default rootReducer;
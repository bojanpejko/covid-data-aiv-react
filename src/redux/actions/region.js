import HttpHelper from '../../utils/httpHelper';
import{
    ROOT_URL,
    GET_REGIONS,
    GET_REGION,
    CREATE_REGION,
    UPDATE_REGION,
    DELETE_REGION
} from '../../constants/constants';
import { notification } from "antd";

export const getRegions = () => {
    return (dispatch) => {
        HttpHelper.get(`${ROOT_URL}/region`)
            .then((response) =>{
                if(response.status === 200){
                    dispatch({type: GET_REGIONS, payload: response.data})
                }
            })
            .catch(({ response }) => {
                console.log("ERROR: ", response)
            })
    }
}

export const getRegion = (data) => {
    return (dispatch) => {
        HttpHelper.get(`${ROOT_URL}/region/${data}`)
            .then((response) =>{
                if(response.status === 200){
                    dispatch({type: GET_REGION, payload: response.data})
                }
            })
            .catch(({ response }) => {
                console.log("ERROR: ", response)
            })
    }
}

export const createRegion = (data) => {
    return (dispatch) => {
        HttpHelper.post(`${ROOT_URL}/region`, data)
        .then(response => {
            if(response.status === 201){
                notification.success({message: 'Region added successfully!'});
                dispatch({type: CREATE_REGION, payload: data})
            }
            dispatch(getRegions());
        })
        .catch((error) => {
            notification.error({ message: 'Unable to add Region!' + error.toJSON().message})
        })
    }
}

export const updateRegion = (uuid, data) => {
    return (dispatch) => {
        HttpHelper.put(`${ROOT_URL}/region/${uuid}`, data)
        .then(response => {
            notification.success({message: 'Region updated successfully!'});
            dispatch({type: UPDATE_REGION, payload: data})
            dispatch(getRegions());
        })
        .catch((error) => {
            notification.error({ message: 'Unable to update Region!' + error.toJSON().message})
        })
    }
}

export const deleteRegion = (uuid) => {
    return (dispatch) => {
        HttpHelper.delete(`${ROOT_URL}/region/${uuid}`)
        .then(response => {
            notification.success({message: 'Region deleted successfully!'});
            dispatch({type: DELETE_REGION, payload: uuid })
        })
        .catch((error) => {
            notification.error({ message: 'Unable to delete Region!' + error.toJSON().message})
        })
    }
}
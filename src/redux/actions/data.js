import HttpHelper from '../../utils/httpHelper';
import{
    ROOT_URL,
    GET_DATA,
    GET_SINGLE_DATA,
    CREATE_DATA,
    UPDATE_DATA,
    DELETE_DATA
} from '../../constants/constants';
import { notification } from "antd";

export const getData = () => {
    return (dispatch) => {
        HttpHelper.get(`${ROOT_URL}/data`)
            .then((response) =>{
                if(response.status === 200){
                    dispatch({type: GET_DATA, payload: response.data})
                }
            })
            .catch(({ response }) => {
                console.log("ERROR: ", response)
            })
    }
}

export const getSingleData = (data) => {
    return (dispatch) => {
        HttpHelper.get(`${ROOT_URL}/data/${data}`)
            .then((response) =>{
                if(response.status === 200){
                    dispatch({type: GET_SINGLE_DATA, payload: response.data})
                }
            })
            .catch(({ response }) => {
                console.log("ERROR: ", response)
            })
    }
}

export const createData = (data) => {
    return (dispatch) => {
        HttpHelper.post(`${ROOT_URL}/data`, data)
        .then(response => {
            if(response.status === 201){
                notification.success({message: 'Data added successfully!'});
                dispatch({type: CREATE_DATA, payload: data})
            }
            dispatch(getData());
        })
        .catch((error) => {
            notification.error({ message: 'Unable to add Data!' + error.toJSON().message})
        })
    }
}

export const updateData = (uuid, data) => {
    return (dispatch) => {
        HttpHelper.put(`${ROOT_URL}/data/${uuid}`, data)
        .then(response => {
            notification.success({message: 'Data updated successfully!'});
            dispatch({type: UPDATE_DATA, payload: data})
            dispatch(getData());
        })
        .catch((error) => {
            notification.error({ message: 'Unable to update Data!' + error.toJSON().message})
        })
    }
}

export const deleteData = (uuid) => {
    return (dispatch) => {
        HttpHelper.delete(`${ROOT_URL}/data/${uuid}`)
        .then(response => {
            notification.success({message: 'Data deleted successfully!'});
            dispatch({type: DELETE_DATA, payload: uuid })
        })
        .catch((error) => {
            notification.error({ message: 'Unable to delete Data!' + error.toJSON().message})
        })
    }
}
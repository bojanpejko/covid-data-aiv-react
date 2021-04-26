import HttpHelper from '../../utils/httpHelper';
import{
    ROOT_URL,
    GET_ADMINS,
    CREATE_ADMIN,
    DELETE_ADMIN
} from '../../constants/constants';
import { notification } from "antd";

export const getAdmins = () => {
    return (dispatch) => {
        HttpHelper.get(`${ROOT_URL}/admin`)
            .then((response) => {
                if(response.status === 200){
                    dispatch({type: GET_ADMINS, payload: response.data})
                }
            })
            .catch(({ response }) => {
                console.log("ERROR: ", response)
            })
    }
}

export const createAdmin = (data) => {
    return (dispatch) => {
        HttpHelper.post(`${ROOT_URL}/admin`, data)
        .then(response => {
            if(response.status === 201){
                notification.success({message: 'Admin added successfully!'});
                dispatch({type: CREATE_ADMIN, payload: data})
            }
            dispatch(getAdmins());
        })
        .catch((error) => {
            notification.error({ message: 'Unable to add Admin!' + error.toJSON().message})
        })
    }
}

export const deleteAdmin = (uuid) => {
    return (dispatch) => {
        HttpHelper.delete(`${ROOT_URL}/admin/${uuid}`)
        .then(response => {
            notification.success({message: 'Admin deleted successfully!'});
            dispatch({type: DELETE_ADMIN, payload: uuid })
        })
        .catch((error) => {
            notification.error({ message: 'Unable to delete Admin!' + error.toJSON().message})
        })
    }
}
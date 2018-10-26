import axios from "axios";
import {ApiEndpoints} from "../types/enums";

export interface Action<P> {
    type: string,
    payload: P
}

export interface Request {
    request: {
        url: string
    }
}

export const GET_EMPLOYEE_LIST_REQUEST = 'get/employee/LIST_REQUEST';
export const GET_EMPLOYEE_LIST_SUCCESS = 'get/employee/LIST_SUCCESS';
export const GET_EMPLOYEE_LIST_FAILURE = 'get/employee/LIST_FAIL';

export const getEmployeeList = () => (dispatch: any) => {

    dispatch({
        type: GET_EMPLOYEE_LIST_REQUEST
    });

    return axios
        .get(ApiEndpoints.baseUrl + ApiEndpoints.applicants)
        .then(response => {
            return dispatch({
                type: GET_EMPLOYEE_LIST_SUCCESS,
                payload: response,
            })
        })
        .catch(error => {
            return dispatch({
                type: GET_EMPLOYEE_LIST_FAILURE,
                payload: error,
            })
        });
};

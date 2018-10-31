import axios from "axios";
import {ApiEndpoint} from "../types/enums";
import {Dispatch} from "redux";
import {createAction} from "../utils";
import {Employee} from "../types";


export const GET_EMPLOYEE_LIST_REQUEST = 'get/employee/LIST_REQUEST';
export const GET_EMPLOYEE_LIST_SUCCESS = 'get/employee/LIST_SUCCESS';
export const GET_EMPLOYEE_LIST_FAILURE = 'get/employee/LIST_FAIL';


export const getEmployeeList = () => (dispatch: Dispatch) => {

    dispatch({
        type: GET_EMPLOYEE_LIST_REQUEST
    });

    return axios
        .get(ApiEndpoint.baseUrl + ApiEndpoint.employee)
        .then(response => {
            const payload = response.data as Employee[];
            return dispatch(createAction(GET_EMPLOYEE_LIST_SUCCESS, payload));
        })
        .catch(error => {
            return dispatch({
                type: GET_EMPLOYEE_LIST_FAILURE,
                payload: error,
            })
        });
};

import axios from 'axios';
import {Dispatch} from "redux";
import {ApiEndpoint} from "../types/enums";
import {ActionWithPayload, Employee, FormPayload} from "../types";

export const POST_EMPLOYEE_FORM_REQUEST = 'post/employee/SUBMIT_REQUEST';
export const POST_EMPLOYEE_FORM_SUCCESS = 'post/employee/SUBMIT_SUCCESS';
export const POST_EMPLOYEE_FORM_FAILURE = 'post/employee/SUBMIT_FAIL';

// I'd normally dispatch API actions through some kind of middleware but overkill for this exercise.

export const postEmployeeForm = (data: Employee) => (dispatch: Dispatch) => {

    dispatch({
        type: POST_EMPLOYEE_FORM_REQUEST
    });

    return axios
        .post(ApiEndpoint.baseUrl + ApiEndpoint.employee, data)
        .then(response => {
            return dispatch(createAction(POST_EMPLOYEE_FORM_SUCCESS, response));
        })
        .catch(error => {
            return dispatch(createAction(POST_EMPLOYEE_FORM_FAILURE, error));
        });
};

export const SET_FORM_FIELD_VALUE = 'SET_FORM_FIELD_VALUE';

export const setFormFieldValue = (payload: FormPayload) => {
    return createAction(SET_FORM_FIELD_VALUE, payload);
};

export const PUSH_FORM_FIELD_ERROR = 'PUSH_FORM_FIELD_ERROR';

export const pushFormFieldError = (payload: FormPayload) => {
    return createAction(PUSH_FORM_FIELD_ERROR, payload);
};

export const REMOVE_FORM_FIELD_ERROR = 'REMOVE_FORM_FIELD_ERROR';

export const removeFormFieldError = (payload: FormPayload) => {
    return createAction(REMOVE_FORM_FIELD_ERROR, payload);
};

export const CLEAR_FORM_DATA = 'CLEAR_FORM_DATA';

export const clearFormData = (payload: Partial<FormPayload>) => {
    return createAction(CLEAR_FORM_DATA, payload);
};

function createAction<P>(type: string, payload: P): ActionWithPayload<P> {
    return {
        type,
        payload,
    }
}
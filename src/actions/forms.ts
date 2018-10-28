import axios from 'axios';
import {ApiEndpoints, EmployeeAttribute, Entities} from "../types/enums";


export interface Action<P> {
    type: string,
    payload: P
}


export interface FormInterface {
    entity: Entities
    attribute: EmployeeAttribute
    value: string
}

export const POST_EMPLOYEE_FORM_REQUEST = 'post/employee/SUBMIT_REQUEST';
export const POST_EMPLOYEE_FORM_SUCCESS = 'post/employee/SUBMIT_SUCCESS';
export const POST_EMPLOYEE_FORM_FAILURE = 'post/employee/SUBMIT_FAIL';


// I'd normally dispatch API actions through some kind of middleware but overkill for this exercise.

export const postEmployeeForm = (data: any) => (dispatch: any) => {

    dispatch({
        type: POST_EMPLOYEE_FORM_REQUEST
    });

    return axios
        .post(ApiEndpoints.baseUrl + ApiEndpoints.applicants, data)
        .then(response => {
            return dispatch({
                type: POST_EMPLOYEE_FORM_SUCCESS,
                payload: response,
            })
        })
        .catch(error => {
            return dispatch({
                type: POST_EMPLOYEE_FORM_FAILURE,
                payload: error,
            })
        });
};

export const SET_FORM_FIELD_VALUE = 'SET_FORM_FIELD_VALUE';

export const setFormFieldValue = (payload: FormInterface) => {

    return {
        type: SET_FORM_FIELD_VALUE,
        payload,
    };
};

export const PUSH_FORM_FIELD_ERROR = 'PUSH_FORM_FIELD_ERROR';

export const pushFormFieldError = (payload: FormInterface) => {

    return {
        type: PUSH_FORM_FIELD_ERROR,
        payload
    };
};

export const REMOVE_FORM_FIELD_ERROR = 'REMOVE_FORM_FIELD_ERROR';

export const removeFormFieldError = (payload: FormInterface) => {

    return {
        type: REMOVE_FORM_FIELD_ERROR,
        payload
    };
};

export const CLEAR_FORM_DATA = 'CLEAR_FORM_DATA';

/**
 *
 * Just checking TypeScript knows it's returning Partial<FormInterface>
 *
 * @param {Partial<FormInterface>} payload
 * @returns {Action<Partial<FormInterface>>}
 */
export const clearFormData = (payload: Partial<FormInterface>) => {
    return createAction(CLEAR_FORM_DATA, payload);
};

function createAction<P>(type: string, payload: P): Action<P> {
    return {
        type,
        payload,
    }
}
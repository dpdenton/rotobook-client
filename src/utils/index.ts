import {FormEntity} from "../reducers/forms";
import {ActionWithPayload, Employee} from "../types";

export const parseFormData = (formData: FormEntity<Employee>): Employee => {

    return Object.keys(formData).reduce((prevValue, currentValue) => {
        const field = formData[currentValue];
        prevValue[currentValue] = field.value;
        return prevValue;
    }, {}) as Employee;
};

export function createAction<P>(type: string, payload: P): ActionWithPayload<P> {
    return {
        type,
        payload,
    }
}
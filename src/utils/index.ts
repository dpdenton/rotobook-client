import {FormEntity} from "../reducers/forms";
import {Employee} from "../types/models";

export const parseFormData = (formData: FormEntity<Employee>): Employee => {

    return Object.keys(formData).reduce((prevValue, currentValue) => {
        const field = formData[currentValue];
        prevValue[currentValue] = field.value;
        return prevValue;
    }, {}) as Employee;
};


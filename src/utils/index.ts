import {FormEntity} from "../reducers/forms";
import {Employee} from "../types";

export const parseFormData = (formData: FormEntity<Employee>): Employee => {

    return Object.keys(formData).reduce((prevValue, currentValue) => {
        const field = formData[currentValue];
        prevValue[currentValue] = field.value;
        return prevValue;
    }, {}) as Employee;
};

// export interface EventInterface {
//     validators: Validator[],
//     name: EmployeeAttribute,
//     value: string
//     errors: string[]
// }


// type EventFnInxterface<E, R> = (e: E) => R

// const onEvent = ({callback, validators, errors}: any): EventFnInterface<React.FormEvent<HTMLTextAreaElement>, EventInterface> => (e) => {
//     const {name, value} = e.currentTarget as { value: string, name: EmployeeAttribute };
//     callback({name, value, validators, errors});
// };


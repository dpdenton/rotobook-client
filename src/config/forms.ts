import {validatorEmail, validatorMinChars, validatorRequired} from "../utils/validators";
import {EmployeeAttributes} from "../types/enums";

export const getEmployeeFieldValidators = (attribute: string) => {
    return EMPLOYEE_FORM_VALIDATORS[attribute]
};

export const EMPLOYEE_FORM_VALIDATORS = {
    [EmployeeAttributes.Name]: [
        validatorRequired,
        validatorMinChars
    ],
    [EmployeeAttributes.Email]: [
        validatorRequired,
        validatorEmail,
        // validatorRotageekEmail
    ],
    [EmployeeAttributes.Message]: [
        validatorRequired
    ]
};

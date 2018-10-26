import {validatorEmail, validatorMinChars, validatorRequired, validatorRotageekEmail} from "../utils/validators";
import {EmployeeAttributes} from "../types/enums";

/*
Configure the form fields to validate upon zero or more validators, as define in utils/validators.js
 */

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
        validatorRotageekEmail
    ],
    [EmployeeAttributes.Message]: [
        validatorRequired
    ]
};

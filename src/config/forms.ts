import {validatorEmail, validatorMinChars, validatorRequired, validatorRotageekEmail} from "../utils/validators";
import {EmployeeAttribute} from "../types/enums";

/*
Configure the form fields to validate upon zero or more validators, as define in utils/validators.js
 */

export const getEmployeeFieldValidators = (attribute: string) => {
    return EMPLOYEE_FORM_VALIDATORS[attribute]
};

export const EMPLOYEE_FORM_VALIDATORS = {
    [EmployeeAttribute.Name]: [
        validatorRequired,
        validatorMinChars
    ],
    [EmployeeAttribute.Email]: [
        validatorRequired,
        validatorEmail,
        validatorRotageekEmail
    ],
    [EmployeeAttribute.Message]: [
        validatorRequired
    ]
};

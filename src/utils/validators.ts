import {Validator} from "../types";

export const validatorRequired: Validator = {

    isValid: (value: string) => {
        return value.length > 0;
    },
    message: 'This is a required field.'
};

export const validatorMinChars: Validator = {

    isValid: (value: string) => {
        return value.length >= 3;
    },
    message: 'Name must be at least 3 characters.'
};

export const validatorEmail: Validator = {
    isValid: (value: string) => {
        // lifted from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
    },
    message: 'Please enter a valid email address.'
};

export const validatorRotageekEmail: Validator = {
    isValid: (value: string) => {
        return value.endsWith('@rotageek.com');
    },
    message: "Your email must be an '@rotageek.com' address."
};


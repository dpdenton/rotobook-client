import {CLEAR_FORM_DATA, PUSH_FORM_FIELD_ERROR, REMOVE_FORM_FIELD_ERROR, SET_FORM_FIELD_VALUE} from "../actions/forms";
import {EmployeeAttribute, Entities} from "../types/enums";
import {Employee} from "../types/models";

/*

I set the form reducer up in such a way that you can easily add more forms with different fields
and use the same actions so manage them, minimising maintenance and duplicate code.

It's a pattern probably more used with entities but I think can work equally well with forms, especially if there
are lots of forms which map directly to entities within the app.

 */

export interface FormField {
    value: string,
    errors: string[]
}

// iterate every attribute in the entity and map to a 'FormField' interface
export type FormEntity<E> = {
    [P in keyof E]: FormField
}

interface FormInterface {
    [Entities.Employee]: FormEntity<Employee>
}

const initialFieldState = (): FormField => ({
    value: '',
    errors: []
});

const initialState = (): FormInterface => ({

    employee: {
        [EmployeeAttribute.Id]: {
            value: '-1',
            errors: [],
        },
        [EmployeeAttribute.Name]: initialFieldState(),
        [EmployeeAttribute.Email]: initialFieldState(),
        [EmployeeAttribute.Message]: initialFieldState(),
    }
});

const forms = (state = initialState(), action: any) => {

    switch (action.type) {

        case CLEAR_FORM_DATA:
            return {
                ...state,
                [action.payload.entity]: initialState[action.payload.entity]
            };

        case SET_FORM_FIELD_VALUE:
        case PUSH_FORM_FIELD_ERROR:
        case REMOVE_FORM_FIELD_ERROR:
            return {
                ...state,
                [action.payload.entity]: setEntity(state[action.payload.entity], action)
            }

    }
    return state;
};

const setEntity = (entity: any, action: any) => {

    return {
        ...entity,
        [action.payload.attribute]: setAttribute(entity[action.payload.attribute], action)
    }
};

const setAttribute = (attribute: any, action: any) => {

    switch (action.type) {

        case SET_FORM_FIELD_VALUE:
            return {
                ...attribute,
                value: setValue(attribute.value, action)
            };

        case PUSH_FORM_FIELD_ERROR:
            return {
                ...attribute,
                errors: pushError(attribute.errors, action)
            };

        case REMOVE_FORM_FIELD_ERROR:
            return {
                ...attribute,
                errors: removeError(attribute.errors, action)
            };
    }
};

const setValue = (value: any, action: any) => {

    return action.payload.value;
};

const pushError = (errors: string[], action: any) => {

    const {value} = action.payload;

    if (errors.indexOf(value) === -1) {
        const newErrors = errors.slice();
        newErrors.push(value);
        return newErrors;
    }

    return errors;
};

const removeError = (errors: string[], action: any) => {

    const {value} = action.payload;

    if (errors.indexOf(value) !== -1) {
        const newErrors = errors.slice();
        return newErrors.filter((e => e !== value));
    }

    return errors;
};

export default forms;
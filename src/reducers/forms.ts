import {CLEAR_FORM_DATA, PUSH_FORM_FIELD_ERROR, REMOVE_FORM_FIELD_ERROR, SET_FORM_FIELD_VALUE} from "../actions/forms";
import {EmployeeAttributes} from "../types/enums";

/*

I set the form reducer up in such a way that you can easily add more forms with different fields
and use the same actions so manage them, minimising maintenence and duplicate code.

It's a pattern probably more used with entities but I think can work equally well with forms, especially if there
are lots of forms which map directly to entities within the app.

 */

export interface ReducerFormInterface {
    employee: EmployeeFormInterface
}

export interface ReducerFieldInterface {
    value: string,
    errors: string[]
}

export interface EmployeeFormInterface {

    [EmployeeAttributes.Name]: ReducerFieldInterface,
    [EmployeeAttributes.Email]: ReducerFieldInterface,
    [EmployeeAttributes.Message]: ReducerFieldInterface,
}

const initialFieldState = {
    value: '',
    errors: []
};

const initialState: ReducerFormInterface = {

    employee: {
        [EmployeeAttributes.Name]: initialFieldState,
        [EmployeeAttributes.Email]: initialFieldState,
        [EmployeeAttributes.Message]: initialFieldState,
    }
};

const forms = (state = initialState, action: any) => {

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
import formReducer, {initialState} from './forms';
import {CLEAR_FORM_DATA, PUSH_FORM_FIELD_ERROR, REMOVE_FORM_FIELD_ERROR, SET_FORM_FIELD_VALUE} from "../actions/forms";
import {FormPayload} from "../types";
import {EmployeeAttribute, Entity} from "../types/enums";

describe('forms reducer', () => {

    it('returns initial state', () => {
        expect(formReducer(undefined, {})).toEqual(initialState());
    });

    it('sets form field value for a given entity', () => {

        // given
        const beforeState = initialState();

        const payload: FormPayload = {
            entity: Entity.Employee,
            attribute: EmployeeAttribute.Name,
            value: 'David Denton',
        };

        const action = {type: SET_FORM_FIELD_VALUE, payload};

        // when
        const afterState = formReducer(beforeState, action);

        const expectedAfterState = {
            [Entity.Employee]: {
                ...beforeState[Entity.Employee],
                [EmployeeAttribute.Name]: {
                    ...beforeState[Entity.Employee][EmployeeAttribute.Name],
                    value: 'David Denton',
                },
            }
        };

        // then
        expect(afterState).toEqual(expectedAfterState);
    });

    it('pushes a form field error for a given entity', () => {

        // given
        const beforeState = initialState();

        const payload: FormPayload = {
            entity: Entity.Employee,
            attribute: EmployeeAttribute.Name,
            value: 'Error Message.',
        };

        const action = {type: PUSH_FORM_FIELD_ERROR, payload};

        // when
        const afterState = formReducer(beforeState, action);

        const expectedAfterState = {
            [Entity.Employee]: {
                ...beforeState[Entity.Employee],
                [EmployeeAttribute.Name]: {
                    ...beforeState[Entity.Employee][EmployeeAttribute.Name],
                    errors: ['Error Message.'],
                },
            }
        };

        // then
        expect(afterState).toEqual(expectedAfterState);
    });

    it('removes a form field error for a given entity', () => {

        const errorMessage = 'Error Message.';

        // given
        let beforeState = initialState();

        beforeState = {
            [Entity.Employee]: {
                ...beforeState[Entity.Employee],
                [EmployeeAttribute.Name]: {
                    ...beforeState[Entity.Employee][EmployeeAttribute.Name],
                    errors: [errorMessage]
                }
            }
        };

        // when
        const afterAction = {
            type: REMOVE_FORM_FIELD_ERROR,
            payload: {
                entity: Entity.Employee,
                attribute: EmployeeAttribute.Name,
                value: errorMessage,
            }
        };

        const afterState = formReducer(beforeState, afterAction);

        const expectedAfterState = {
            [Entity.Employee]: {
                ...beforeState[Entity.Employee],
                [EmployeeAttribute.Name]: {
                    ...beforeState[Entity.Employee][EmployeeAttribute.Name],
                    errors: [],
                },
            }
        };

        // then
        expect(afterState).toEqual(expectedAfterState);
    });

    it('clears a form given entity', () => {

        // given
        let beforeState = initialState();

        beforeState = {
            [Entity.Employee]: {
                ...beforeState[Entity.Employee],
                [EmployeeAttribute.Name]: {
                    value: 'David Denton',
                    errors: ['Error Message One.', 'Error Message Two.']
                }
            }
        };

        // when
        const action = {
            type: CLEAR_FORM_DATA,
            payload: {
                entity: Entity.Employee,
            }
        };

        const afterState = formReducer(beforeState, action);

        // then
        expect(afterState).toEqual(initialState());
    });

});

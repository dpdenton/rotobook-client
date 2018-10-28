import * as React from 'react';
import Label from "./Label";
import FormGroup from "./FormGroup";
import {EmployeeAttribute} from "../types/enums";
import ErrorList from "./ErrorList";
import {Validator} from "../types";
import {EventInterface} from "../containers/FormContainer";

interface InputProps {
    value: string
    name: string
    placeholder?: string
    disabled?: boolean
    errors?: string[]
    label?: string
    type?: string
    onBlur?: (data: EventInterface) => void
    onChange?: (data: EventInterface) => void
    onMouseEnter?: () => void
    validators?: Validator[]
}

const Input: React.SFC<InputProps> = ({name, label, validators = [], errors = [], ...input}) => {

    const {onChange, onBlur, ...rest} = input;

    return (
        <FormGroup
            error={errors.length > 0}
        >
            {label &&
            <Label htmlFor={name}>
                {label}
            </Label>}
            <input
                className="formInput"
                {...rest}
                id={name}
                name={name}
                onBlur={onEvent({callback: onBlur, validators, errors})}
                onChange={onEvent({callback: onChange, validators, errors})}
            />
            <ErrorList
                errors={errors}
            />
        </FormGroup>
    )
};

const onEvent = ({callback, validators, errors}: any) => (e: React.FormEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget as { value: string, name: EmployeeAttribute };
    callback({name, value, validators, errors});
};

export default Input;
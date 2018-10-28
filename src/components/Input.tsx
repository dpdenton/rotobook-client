import * as React from 'react';
import Label from "./Label";
import FormGroup from "./FormGroup";
import {EmployeeAttribute} from "../types/enums";
import ErrorList from "./ErrorList";

interface InputProps {
    value: string
    name: string
    placeholder?: string
    disabled?: boolean
    errors?: string[]
    label?: string
    type?: string
    onBlur?: (name: string, value: string) => void
    onChange?: (name: string, value: string) => void
    onMouseEnter?: () => void
}

const Input: React.SFC<InputProps> = ({name, label, errors = [], ...input}) => {

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
                onBlur={onEvent.bind(null, onBlur)}
                onChange={onEvent.bind(null, onChange)}
            />
            <ErrorList
                errors={errors}
            />
        </FormGroup>
    )
};

const onEvent = (callbackFn: any, e: React.FormEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget as { value: string, name: EmployeeAttribute };
    callbackFn(name, value);
};


export default Input;
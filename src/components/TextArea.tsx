import * as React from 'react';
import Label from "./Label";
import FormGroup from "./FormGroup";
import ErrorList from "./ErrorList";
import {Validator} from "../types";
import {EmployeeAttribute} from "../types/enums";
import {EventInterface} from "../containers/FormContainer";

interface TextAreaProps {
    label?: string
    placeholder?: string
    value: string
    name: string
    errors: string[]
    type?: string
    onChange?: (data: EventInterface) => void
    onBlur?: (data: EventInterface) => void
    validators?: Validator[]
}

const TextArea: React.SFC<TextAreaProps> = ({name, label, validators = [], errors = [], ...input}) => {

    const {onBlur, onChange, ...rest} = input;

    return (
        <FormGroup
            error={errors.length > 0}
        >
            {label && <Label htmlFor={name}>
                {label}
            </Label>}
            <textarea
                className="formInput"
                id={name}
                name={name}
                onBlur={onEvent({callback: onBlur, validators, errors})}
                onChange={onEvent({callback: onChange, validators, errors})}
                {...rest}
            />
            <ErrorList
                errors={errors}
            />
        </FormGroup>
    )
};

const onEvent = ({callback, validators, errors}: any) => (e: React.FormEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.currentTarget as { value: string, name: EmployeeAttribute };
    callback({name, value, validators, errors});
};

export default TextArea;
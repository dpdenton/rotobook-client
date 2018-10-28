import * as React from 'react';
import Label from "./Label";
import FormGroup from "./FormGroup";
import {EmployeeAttribute} from "../types/enums";
import ErrorList from "./ErrorList";

interface TextAreaProps {
    label?: string
    placeholder?: string
    value: string
    name: string
    errors: string[]
    type?: string
    onChange?: (name: string, value: string) => void
    onBlur?: (name: string, value: string) => void
}

const TextArea: React.SFC<TextAreaProps> = ({name, label, errors, ...input}) => {

    const {onBlur, onChange, ...rest} = input;

    return (
        <FormGroup
            error={errors.length > 0}
        >
            {label && <Label htmlFor={name}>
                {label}
            </Label>}
            <textarea
                className="form-input"
                {...input}
                id={name}
                name={name}
                onBlur={onEvent.bind(null, onBlur)}
                onChange={onEvent.bind(null, onChange)}
                {...rest}
            />
            <ErrorList
                errors={errors}
            />
        </FormGroup>
    )
};

const onEvent = (callbackFn: any, e: React.FormEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.currentTarget as { value: string, name: EmployeeAttribute };
    callbackFn(name, value);
};

export default TextArea;
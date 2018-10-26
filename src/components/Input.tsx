import * as React from 'react';
import Label from "./Label";
import FormGroup from "./FormGroup";

interface InputProps {
    value: string
    name: string
    placeholder?: string
    disabled?: boolean
    errors?: string[]
    label?: string
    type?: string
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FormEvent<HTMLInputElement>) => void
}

const Input: React.SFC<InputProps> = ({name, label, errors = [], ...input}) => {

    // const {name, label, errors, ...input} = props;

    return (
        <FormGroup>
            {label &&
            <Label htmlFor={name}>
                {label}
            </Label>}
            <input
                className="form-input"
                {...input}
                id={name}
                name={name}
            />
            <ul className='error-list'>
                {errors.map((error, index) => (
                    <li
                        key={index}
                    >{error}</li>
                ))}
            </ul>
        </FormGroup>
    )
};

Input.defaultProps = {
    type: 'text',
    onChange: () => null,
    errors: [],
};

export default Input;
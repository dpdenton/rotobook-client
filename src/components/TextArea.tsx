import * as React from 'react';
import Label from "./Label";
import FormGroup from "./FormGroup";

interface TextAreaProps {
    label?: string
    placeholder?: string
    value: string
    name: string
    errors: string[]
    type?: string
    onChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void
    onBlur?: (e: React.FormEvent<HTMLTextAreaElement>) => void
}


const TextArea: React.SFC<TextAreaProps> = props => {

    const {name, label, errors, ...input} = props;

    return (
        <FormGroup>
            {label && <Label htmlFor={name}>
                {label}
            </Label>}
            <textarea
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

TextArea.defaultProps = {
    type: 'text',
    onChange: () => null,
};

export default TextArea;
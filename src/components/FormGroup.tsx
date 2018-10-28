import * as React from 'react';

interface FormGroupProps {
    error?: boolean
}

const FormGroup: React.SFC<FormGroupProps> = ({error = false, children}) => {

    const className = error ? 'error formGroup' : 'formGroup';

    return (
        <div className={className}>
            {children}
        </div>
    )
};

export default FormGroup;
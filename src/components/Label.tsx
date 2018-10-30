import * as React from 'react';

interface LabelProps {
    htmlFor: string
}

const Label: React.SFC<LabelProps> = props => {

    const {htmlFor, children} = props;

    return (
        <label htmlFor={htmlFor} className="formLabel">
            {children}
        </label>
    )
};

export default Label;
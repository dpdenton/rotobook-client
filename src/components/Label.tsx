import * as React from 'react';

interface ILabel {
    htmlFor: string
}

const Label: React.SFC<ILabel> = props => {

    const {htmlFor, children} = props;

    return (
        <label htmlFor={htmlFor} className="form-label">
            {children}
        </label>
    )
};

export default Label;
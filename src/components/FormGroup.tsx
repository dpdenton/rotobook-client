import * as React from 'react';

const FormGroup: React.SFC<{}> = props => {

    return (
        <div className="form-group">
            {props.children}
        </div>
    )
};

export default FormGroup;
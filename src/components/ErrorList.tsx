import * as React from 'react';

interface ErrorListProps {
    errors?: string[]
}

const ErrorList: React.SFC<ErrorListProps> = ({errors = []}) => {

    return (
        <ul className='errorList'>
            {errors.map(error => (
                <li
                    // error guaranteed to be a unique string so ok to do this
                    key={error}
                >
                    {error}
                </li>
            ))}
        </ul>
    )
};

export default ErrorList;
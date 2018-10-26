import * as React from 'react';

interface EmployeeListItemProps {
    name: string
    email: string
    message: string
}

const EmployeeListItem: React.SFC<EmployeeListItemProps> = props => {

    return (
        <div className='employeeListItem'>
            <div className='employeeListItemInfo'>
                <div className='imageWrapper'>
                    <img
                        width="60"
                        height="60"
                        src="https://www.rotageek.com/images/about/rotageek-icon.svg"
                    />
                </div>
                <div>
                    <div className='employeeListItemName'>{props.name}</div>
                    <div className='employeeListItemEmail'>{props.email}</div>
                </div>
            </div>
            <div className='employeeListItemMessage'>{`"${props.message}"`}</div>

        </div>
    )
};

export default EmployeeListItem;
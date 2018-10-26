import * as React from 'react';

interface TabProps {
    active: boolean
}

const Tab: React.SFC<TabProps> = props => {

    const className = props.active ? 'active' : '';

    return (
        <div className={`tab ${className}`}>
            {props.children}
        </div>
    )
};

export default Tab;
import * as React from 'react';

const Tabs: React.SFC<{}> = props => {

    return (
        <div className='tabs'>
            {props.children}
        </div>
    )
};

export default Tabs;
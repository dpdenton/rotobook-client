import * as React from 'react';

interface PageProps {
    style?: React.CSSProperties
}

const Page: React.SFC<PageProps> = props => {

    return (
        <div style={props.style} className='page'>
            {props.children}
        </div>
    )
};

Page.defaultProps = {
    style: {},
};

export default Page;
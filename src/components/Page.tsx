import * as React from 'react';

interface PageProps {
    style?: React.CSSProperties
}

const Page: React.SFC<PageProps> = ({style={}, children}) => {

    return (
        <div style={style} className='page'>
            {children}
        </div>
    )
};

export default Page;
import React from 'react';
import found from '../../../images/Notfound.png'
const NotFound = () => {
    return (
        <div>
           <h1 className='text-center text-danger'>Page Not Found</h1>
            <img className='w-100' src={found} alt="" />
        </div>
    );
};

export default NotFound;
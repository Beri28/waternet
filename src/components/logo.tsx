import React from 'react';
import logo from '../assets/png/logo2-no-background.png'

function Logo() {
    return (
        // <div className='flex items-center bg-green-800 rounded p-3'>
        //     <span className='text-white'>square</span>
        //     <span className='text-amber-300'>meals</span>
        // </div>
        <div className=''>
            <img src={logo} alt="square meals logo" />
        </div>
    );
}

export default Logo;
import React from 'react';
import Logo from '../logo';

function Navbar() {
    return (
        <div className='bg-white py-4 '>
            <div className='max-w-[90%] mx-auto flex justify-between items-center'>
                <div className="logo max-w-[20%]">
                    {/* <p className='texts font-extrabold text-xl cursor-pointer'>Square Meals</p> */}
                    <Logo />
                </div>
                <div className="menu w-[60%] flex justify-between items-center">
                    <div className="pages">
                        <ul className='list-none flex gap-x-10 items-center page-link'>
                            <li>Food Waste</li>
                            <li>About Us</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div className="cta flex items-center gap-x-5">
                        <button className='bg-green-800 hover:bg-green-600 texts-1 rounded-full p-2 px-4 cursor-pointer'>Register business</button>
                        <select value='English' name='language' title='language' className='border-2 border-black'>
                            <option>English</option>
                            <option>French</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
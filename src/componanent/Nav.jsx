import React from 'react';

const Nav = () => {
    return (
        <nav className='w-full flex justify-between bg-purple-500 py-2  text-white'>
            <div className='mx-3'>
                <h1 className='font-bold '>Todo</h1>
            </div>
            <ul className='mr-3 font-bold cursor-pointer'>
                <li>Home</li>
            </ul>
        </nav>
    );
}

export default Nav;

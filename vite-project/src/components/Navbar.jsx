import React from 'react'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='flex justify-between bg-blue-900 p-4'>
            <span className='text-xl font-bold text-white'>iTask</span>
            <ul className='flex gap-5'>

                <li className='hover:font-bold hover:transition-all cursor-pointer duration-100'> Home </li>
                <li className='hover:font-bold hover:transition-all cursor-pointer duration-100'>Your tasks  </li>

            </ul>
        </div>
    )
}

export default Navbar

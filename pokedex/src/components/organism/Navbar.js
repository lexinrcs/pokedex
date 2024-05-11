import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavBar(){
    const navigate = useNavigate();

    return(
        <div className='shadow bg-blue-2 w-full h-[120px] fixed flex items-center justify-between z-[1000]'>
            <img src='/assets/pokemon-logo.png' className='object-scale-down w-52 md:mx-16 sm:mx-12 ml-4'></img>
    
            <h1 className='mr-4 sm:mx-12 md:mx-16 font-["nunito"] text-3xl md:text-4xl text-yellow-1 font-extrabold hover:cursor-pointer' onClick={() => {navigate(`../`)}}> HOME </h1>
        </div>
    )
}
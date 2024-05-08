import React, { useEffect, useState} from 'react';

export default function NavBar(){
    return(
        <div className='shadow bg-blue-2 w-full h-[120px] fixed flex items-center justify-center z-[1000]'>
            <img src='/assets/pokemon-logo.png' className='object-scale-down w-52'></img>
        </div>
    )
}
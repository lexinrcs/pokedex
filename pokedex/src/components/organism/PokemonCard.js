import React, { useEffect, useState} from 'react';

export default function PokemonCard({pokemon, imageUrls, name}){
    if(pokemon && name){
        return(
            <div class="font-['nunito'] max-w-xs bg-white border-4 border-blue-2 shadow dark:bg-gray-800 dark:border-gray-700 mx-5 my-5">
                 {(imageUrls[name] && 
                (<img key={name} className="rounded-t-lg" src={imageUrls[name]} alt={name}/>)) ? (<img key={name} className="rounded-t-lg" src={imageUrls[name]} alt={name}/>) : 
                (
                    <div className='min-w-80 flex items-center justify-center'>
                        Loading...
                    </div>
                )}
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name.toUpperCase()}</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>
            </div>
        );
    }
}   
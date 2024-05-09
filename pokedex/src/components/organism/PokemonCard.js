import React, { useEffect, useState} from 'react';
import './PokemonCard.css'

export default function PokemonCard({pokemon, imageUrls, name}){
    if(pokemon && name){
        const idNumber = String(pokemon.id).padStart(3, '0');
        const types = pokemon.types.map((typeObj, index) => typeObj.type.name);

        return(
            <div class="rounded-md animated-background hover:bg-gradient-to-r hover:border-red-1 hover:cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-gray-400 
                        transition-all duration-300 ease-in-out from-red-100 via-yellow-50 to-blue-200
                        font-['nunito'] max-w-xs border-2 border-blue-2 shadow mx-5 my-5 bg-white">
                
                <div className='flex items-center justify-end w-full text-xl font-bold text-blue-2 pr-3 pt-2'>
                        ID: {idNumber}
                </div>

                 {(imageUrls[name] && 
                    (<img key={name} className="rounded-t-lg" src={imageUrls[name]} alt={name}/>)) ? (<img key={name} className="rounded-t-lg" src={imageUrls[name]} alt={name}/>) : 
                    (
                    <div className='min-w-80 flex items-center justify-center'>
                        Loading...
                    </div>
                    )
                }

                <div class="p-5 flex flex-col justify-center item-start">
                    <h5 class="mb-1 text-2xl font-bold text-blue-2 dark:text-white mx-1">{name.toUpperCase()}</h5> 
                    
                    <div className='flex mt-2 min-w-fit'>
                        {types.map((type) => (
                            <div
                            className={`max-w-fit rounded-md shadow px-3 mx-1 ${
                                type === 'normal' ? 'bg-gray-300 text-blue-2'
                                : type === 'fighting' ? 'bg-gray-700 text-white'
                                : type === 'steel' ? 'bg-gray-900 text-white'
                                : type === 'grass' ? 'bg-green-600 text-white' 
                                : type === 'poison' ? 'bg-violet-600 text-white'
                                : type === 'fire' ? 'bg-red-500 text-white'
                                : type === 'bug' ? 'bg-amber-800 text-white'
                                : type === 'water' ? 'bg-blue-600 text-white'
                                : type === 'flying' ? 'bg-orange-400 text-white'
                                : type === 'ground' ? 'bg-yellow-900 text-white'
                                : type === 'electric' ? 'bg-yellow-1 text-blue-2'
                                : type === 'rock' ? 'bg-gray-500 text-white'
                                : type === 'fairy' ? 'bg-pink-400 text-white'
                                : type === 'psychic' ? 'bg-yellow-500 text-white'
                                : type === 'ice' ? 'bg-sky-300 text-blue-2'
                                : type === 'dragon' ? 'bg-red-700 text-white'
                                : type === 'dark' ? 'bg-black text-white'
                                : type === 'ghost' ? 'bg-blue-900 text-white'
                                : 'bg-white text-blue-2'
                            }`}
                            >
                            {type.toUpperCase()}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        );
    }
}  


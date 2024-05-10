import React, { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../organism/Navbar.js';
import './ViewPokemon.css'
import { GrCaretNext,  GrCaretPrevious } from "react-icons/gr";


export default function ViewPokemon(){
    const navigate = useNavigate();
    const { id } = useParams();
    const integerId = parseInt(id);
    const [pokemonData, setPokemonData] = useState({});
    const [loading, setLoading] = useState(true);
    const [pokemonId, setPokemonId] = useState("");
    const [nextPokemon, setNextPokemon] = useState("");
    const [prevPokemon, setPrevPokemon] = useState("");

    useEffect(() => {
        const fetchPokemonData = async () => {
            try{
                setLoading(true);
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`); 
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setPokemonData(data);
                setPokemonId(String(id).padStart(3, '0'));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchPokemonData();
    },[]);

    useEffect(() => {
        if(pokemonData.length !== 0 && pokemonId !== ""){
            setLoading(false);
            const next = parseInt(id) + 1;
            const prev = parseInt(id) -1;
            if (parseInt(id) !== 1025 && parseInt(id) !== 1){
                setPrevPokemon(String(prev).padStart(3, '0'));
                setNextPokemon(String(next).padStart(3, '0'));
            } else if (parseInt(id) === 1025){
                setPrevPokemon(String(prev).padStart(3, '0'))
            } else {
                setNextPokemon(String(next).padStart(3, '0'))
            }
        }
    },[pokemonData, pokemonId]);

    const handlePrevClick = () => {
        if(prevPokemon !== ""){
            navigate(`../pokemon/${integerId - 1}`);
            window.location.reload()
        }
    };

    const handleNextClick = () => {
        if(nextPokemon !== ""){
            navigate(`../pokemon/${integerId + 1}`);
            window.location.reload()
        }
    };

    return (
        <div className='main-container min-h-fit w-full'>
            <NavBar/>
    
            {integerId <= 0 || integerId > 1025 ? (
                <div className='h-screen w-screen flex items-center justify-center text-4xl text-blue-2 font-["nunito"] font-bold'> PAGE NOT FOUND </div>
            ) : (
                <>
                    {loading && pokemonData !== null ? (
                        <div className="spinner bg-gray-100"></div>
                    ) : (
                        <div className='min-h-fit w-full bg-gray-100 flex items-center justify-center flex-wrap '>
                            {/* Pokemon Info Card */}
                            <div className='flex flex-col min-h-fit w-[1280px] border-2 rounded-lg mt-[140px]'>
                                <div className='flex w-full items-center justify-center'>
                                    <div className='flex items-center'>
                                        <h4 className='text-3xl font-["nunito"] font-bold text-blue-2 m-1'> {prevPokemon} </h4>       
                                        <GrCaretPrevious className={`h-12 w-12 bg-yellow-1 rounded-full p-1 m-1 ${prevPokemon !== "" ? 'hover:cursor-pointer' : ''}`} onClick={() => handlePrevClick()}/>   
                                    </div>
    
                                    <div className='flex items-center'>
                                        <GrCaretNext className={`h-12 w-12 bg-yellow-1 rounded-full p-1 m-1 ${nextPokemon !== "" ? 'hover:cursor-pointer' : ''}`} onClick={() => handleNextClick()}/>
                                        <h4 className='text-3xl font-["nunito"] font-bold text-blue-2 m-1'> {nextPokemon} </h4>
                                    </div>
                                </div>
    
                                <div className='p-8 flex flex-wrap border-2 border-blue-2 border-8 rounded-lg m-12 md:m-20 transition-all duration-300 ease-in-out from-red-100 via-yellow-50 to-blue-200 animated-background bg-gradient-to-r '>
                                    {/* Image */}
                                    <div className='flex flex-col items-center justify-center'>
                                        <img className="bg-yellow-1 mr-8" key={id} src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png`} alt={id}/>
                                    </div>
    
                                    {/* Details Section */}
                                    <div className='flex flex-col'>
                                        <h4 className='text-3xl font-["nunito"] font-bold text-blue-2 '> {pokemonData.name.toUpperCase()} </h4>
                                        ID: {String(id).padStart(3, '0')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
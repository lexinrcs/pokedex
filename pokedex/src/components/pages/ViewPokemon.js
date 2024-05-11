import React, { useEffect, useState, useRef} from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import NavBar from '../organism/Navbar.js';
import './ViewPokemon.css'
import { GrCaretNext,  GrCaretPrevious } from "react-icons/gr";
import Bar from '../atoms/Bar.js';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


export default function ViewPokemon(){
    const navigate = useNavigate();
    const { id } = useParams();
    const integerId = parseInt(id);
    const [pokemonData, setPokemonData] = useState({});
    const [loading, setLoading] = useState(true);
    const [pokemonId, setPokemonId] = useState("");
    const [nextPokemon, setNextPokemon] = useState("");
    const [prevPokemon, setPrevPokemon] = useState("");
    const [category, setCategory] = useState("");
    const [types, setTypes] = useState([]);
    const [weaknesses, setWeaknesses] = useState([]);
    const [stats, setStats] = useState({});
    // const chartRef = useRef(null); // Create ref for chart canvas

    const typeWeaknesses = {
        normal: ['Rock', 'Ghost', 'Steel'],
        fighting: ['Flying', 'Poison', 'Psychic', 'Bug', 'Ghost', 'Fairy'],
        flying: ['Rock', 'Steel', 'Electric'],
        poison: ['Poison', 'Ground', 'Rock', 'Ghost', 'Steel'],
        ground: ['Flying', 'Bug', 'Grass'],
        rock: ['Fighting', 'Ground', 'Steel'],
        bug: ['Fighting', 'Flying', 'Poison', 'Ghost', 'Steel', 'Fire', 'Fairy'],
        ghost: ['Normal', 'Dark'],
        steel: ['Steel', 'Fire', 'Water', 'Electric'],
        fire: ['Rock', 'Fire', 'Water', 'Dragon'],
        water: ['Water', 'Grass', 'Dragon'],
        grass: ['Flying', 'Poison', 'Bug', 'Steel', 'Fire', 'Grass', 'Dragon'],
        electric: ['Ground', 'Grass', 'Electric', 'Dragon'],
        psychic: ['Steel', 'Psychic', 'Dark'],
        ice: ['Steel', 'Fire', 'Water', 'Ice'],
        dragon:['Steel', 'Fairy'],
        dark: ['Fighting','Dark', 'Fairy'],
        fairy: ['Poison', 'Steel', 'Fire']
      };

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
        
        const fetchCategory = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const categories = data.genera.filter(category => category.language.name === 'en').map(category => category.genus);
                
                if (categories.length > 0) {
                    setCategory(categories[0]);
                } else {
                    setCategory('Unknown');
                }

            } catch (error) {
                console.error(error);
            }
        };
        
        fetchCategory();      
        fetchPokemonData();
    },[id]);

    useEffect(() => {
        if(pokemonData.types){
            setTypes(pokemonData.types.map((typeObj) => typeObj.type.name));
            const statsObject = pokemonData.stats.reduce((acc, stat) => {
                acc[stat.stat.name] = stat.base_stat;
                return acc;
              }, {});

              setStats(statsObject);
            //   console.log(statsObject)
        }
    },[pokemonData])

    useEffect(() => {
        if (types.length !== 0) {
            const combinedWeaknesses = types.reduce((combined, type) => {
            return [...combined, ...typeWeaknesses[type]];
            }, []);
            const uniqueWeaknesses = [...new Set(combinedWeaknesses)];
            setWeaknesses(uniqueWeaknesses);
        }
    }, [types]);
    
    useEffect(() => {
        if(pokemonData.length !== 0 && pokemonId !== "" && category !== "" && types.length !== 0 && Object.keys(stats).length !== 0){
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
    },[pokemonData, pokemonId, category, types, stats]);

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

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

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
                        <div className='min-h-screen w-full bg-gray-100 flex items-center justify-center flex-wrap '>
                            {/* Card */}
                            <div className='flex flex-col min-h-fit w-fit rounded-xl mt-[140px] px-12 py-8 md:py-12 md:px-16'>
                                {/* Functionality Section */}
                                <div className='flex w-full items-center justify-between'>
                                    <div className='flex items-center'>
                                        <h4 className='text-3xl font-["nunito"] font-extrabold text-blue-2 m-1'> {prevPokemon} </h4>       
                                        <FaArrowLeft className={`h-16 w-16 bg-yellow-1 text-blue-2 rounded-full p-4 m-1 ${prevPokemon !== "" ? 'hover:cursor-pointer' : ''}`} onClick={() => handlePrevClick()}/>   
                                    </div>
    
                                    <div className='flex items-center'>
                                        <FaArrowRight className={`h-16 w-16 text-blue-2 p-4 m-1 bg-yellow-1 rounded-full ${nextPokemon !== "" ? 'hover:cursor-pointer' : ''}`} onClick={() => handleNextClick()}/>
                                        <h4 className='text-3xl font-["nunito"] font-extrabold text-blue-2 m-1'> {nextPokemon} </h4>
                                    </div>
                                </div>

                                {/* Info Section*/}
                                <div className='min-h-fit w-fit flex flex-wrap items-center justify-center border-2 border-blue-2 border-8 rounded-2xl p-2 my-8
                                                transition-all duration-300 ease-in-out from-red-200 via-yellow-100 to-blue-300 animated-background bg-gradient-to-r '>
                                    {/* Details Section 1*/}
                                    <div className='my-2 px-4 h-full w-full xl:w-1/3 flex flex-wrap order-2 xl:order-1 flex-col'>
                                        {/* Types */}
                                        <div className='mb-4 p-4 w-full rounded-xl border-2 border-blue-2 ring-4 ring-blue-1 shadow bg-white'>
                                            <h1 className='text-3xl font-["nunito"] font-bold text-blue-2 '> TYPE </h1>
                                            <div className='flex flex-wrap mt-2 min-w-fit'>
                                                {types.map((type,index) => (
                                                    <div key={index}
                                                    className={`font-["nunito"] flex items-center justify-center w-32 rounded-lg shadow mr-2 mt-2 px-6 py-1 text-2xl ${
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
                                                    {capitalize(type)}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {/* Weaknesses */}
                                        <div className='mb-4 p-4 border-2 border-blue-2 ring-4 ring-blue-1 shadow w-full rounded-xl bg-white'>
                                            <h4 className='text-3xl font-["nunito"] font-bold text-blue-2 '> WEAKNESS </h4>
                                            <div className='flex flex-wrap mt-2 w-fit'>
                                                {weaknesses.map((weakness,index) => (
                                                    <div key={index}
                                                    className={`font-["nunito"] w-32 flex items-center justify-center rounded-lg shadow mr-2 mt-2 px-6 py-1 text-2xl ${
                                                        weakness === 'Normal' ? 'bg-gray-300 text-blue-2'
                                                        : weakness === 'Fighting' ? 'bg-gray-700 text-white'
                                                        : weakness === 'Steel' ? 'bg-gray-900 text-white'
                                                        : weakness === 'Grass' ? 'bg-green-600 text-white' 
                                                        : weakness === 'Poison' ? 'bg-violet-600 text-white'
                                                        : weakness === 'Fire' ? 'bg-red-500 text-white'
                                                        : weakness === 'Bug' ? 'bg-amber-800 text-white'
                                                        : weakness === 'Water' ? 'bg-blue-600 text-white'
                                                        : weakness === 'Flying' ? 'bg-orange-400 text-white'
                                                        : weakness === 'Ground' ? 'bg-yellow-900 text-white'
                                                        : weakness === 'Electric' ? 'bg-yellow-1 text-blue-2'
                                                        : weakness === 'Rock' ? 'bg-gray-500 text-white'
                                                        : weakness === 'Fairy' ? 'bg-pink-400 text-white'
                                                        : weakness === 'Psychic' ? 'bg-yellow-500 text-white'
                                                        : weakness === 'Ice' ? 'bg-sky-300 text-blue-2'
                                                        : weakness === 'Dragon' ? 'bg-red-700 text-white'
                                                        : weakness === 'Dark' ? 'bg-black text-white'
                                                        : weakness === 'Ghost' ? 'bg-blue-900 text-white'
                                                        : 'bg-white text-blue-2'
                                                    }`}
                                                    >
                                                    {weakness}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                                
                                        <div className='mb-4 w-full flex flex-wrap items-center justify-between'>
                                            <div className='mb-4 p-4 border-2 border-blue-2 ring-4 ring-blue-1 shadow rounded-xl w-full bg-white'>
                                                <h4 className='text-3xl font-["nunito"] font-bold text-blue-2 '> CATEGORY </h4>
                                                <h4 className='text-2xl font-["nunito"] text-blue-2 '> {category} </h4>
                                            </div>

                                            <div className='p-4 border-2 border-blue-2 ring-4 ring-blue-1 shadow rounded-xl w-full bg-white'>
                                                <h4 className='text-3xl font-["nunito"] font-bold text-blue-2 '> ABILITY </h4>
                                                <div className='flex flex-col'>
                                                    {pokemonData.abilities.filter(ability => !ability.is_hidden).map((ability, index) => (
                                                        <h4 className='my-1 text-2xl font-["nunito"] text-blue-2'> {capitalize(ability.ability.name)} </h4>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                     
                                    </div>

                                    {/*Id,Image, Name*/}
                                    <div className='my-2 h-full w-full xl:w-1/3 flex flex-col order-1 xl:order-2 items-center justify-center flex-wrap'>
                                        <h4 className='text-4xl font-["nunito"] font-extrabold text-blue-2 center'> {pokemonData.name.toUpperCase()}</h4>
                                        <h4 className='text-4xl font-["nunito"] font-bold text-blue-2 opacity-80 '> ID #{pokemonId}</h4>
                                        <img className="w-full" key={id} src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png`} alt={id}/>
                                    </div>
    
                                    {/* Details Section 2*/}
                                    <div className='rounded-lg w-full my-2 px-4 h-full xl:w-1/3 flex flex-wrap order-3 xl:order-3 flex-col '>
                                        {/* Height and Weight*/}
                                        <div className='mb-4 flex flex-wrap items-center justify-center w-full '>
                                            <div className='mb-4 p-4 rounded-xl w-full border-2 border-blue-2 ring-4 ring-blue-1 shadow bg-white'>
                                                <h4 className='text-3xl font-["nunito"] font-bold text-blue-2 '> HEIGHT</h4>
                                                <h4 className='text-2xl font-["nunito"] text-blue-2 '> {parseFloat(pokemonData.height/10)} m</h4>
                                            </div>
                                            <div className='p-4 rounded-xl w-full border-2 border-blue-2 ring-4 ring-blue-1 shadow bg-white'>
                                                <h4 className='text-3xl font-["nunito"] font-bold text-blue-2 '> WEIGHT </h4>
                                                <h4 className='text-2xl font-["nunito"] text-blue-2 '> {parseFloat(pokemonData.weight/10)} kg</h4>
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className='mb-4 w-full object-scale-down  border-2 border-blue-2 ring-4 ring-blue-1 shadow  rounded-xl p-4 bg-white'>
                                            <h4 className='text-3xl font-["nunito"] font-bold text-blue-2 '> STATS </h4>
                                                <div className="p-2 flex flex-col items-start justify-start rounded-lg w-fit">
                                                    <div className='flex items-end justify-start mt-8'>
                                                        {Object.entries(stats).map(([statName, value]) => (
                                                            <div key={statName} className="flex flex-col flex-wrap items-center group relative m-2">
                                                                <div className="rounded-[5px] font-bold group-hover:opacity-100 opacity-0 absolute -top-12 transition-opacity">
                                                                    {value} {/* Render the stat value */}
                                                                </div>

                                                                {/* Adjust the height based on the stat value */}
                                                                <Bar height={parseInt(value * 2)}/>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    
                                                    <div className="flex items-start justify-center">
                                                        {Object.entries(stats).map(([statName, value]) => (
                                                                <div className='text-blue-2 text-center w-fit flex flex-col flex-wrap group relative m-2'>
                                                                    <h1 className='w-8 md:w-[40px] text-xs'>{statName.replace(/-/g, ' ').toUpperCase()}</h1> {/* Render the stat name */}
                                                                </div>
                                                        ))}
                                                    </div>

                                                </div>
                                        </div>
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
import React, { useEffect, useState, useRef} from 'react';
import NavBar from '../organism/Navbar.js';
import PokemonCard from '../organism/PokemonCard.js';
import './HomePage.css'
import { FaSearch } from "react-icons/fa";


export default function HomePage(){
    const [loading, setLoading] = useState(true);

    const [pokemonCount, setPokemonCount] = useState();
    const [pokemonList, setPokemonList] = useState([]);

    const [hasMore, setHasMore] = useState(true);
    const [numberOfCards, setNumberOfCards] = useState(10);
    
    const [currentCards, setCurrentCards] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("id_asc");
    const [filterById, setFilterById] = useState("");
    const [filterByName, setFilterByName] = useState("");
    const [disableFilterById, setDisableFilterById] = useState(true);
    const [disableFilterByName, setDisableFilterByName] = useState(true);

    const [beenSorted, setBeenSorted] = useState(false);

    const [imageUrls, setImageUrls] = useState({});
    const [pokemonData, setPokemonData] = useState({});

    const [count, setCount] = useState(0);

    const cardSection = useRef(null);

    useEffect(() => {
        fetchAllPokemons();
    }, []); //fetch once

    useEffect(() => {
        setTimeout(() => {
            setCount(currentCards.length);
        }, 1000); // Delay in milliseconds (e.g., 2000ms = 2 seconds)
      }, [currentCards]);

    useEffect(() => {
        const fetchPokemonImages = async () => {
          try {
            const fetchedImageUrls = {};
            const allDataPokemons = {};

            await Promise.all(
              pokemonList.map(async (pokemon) => {
                const response = await fetch(pokemon.url);
                if (response.ok) {
                  const data = await response.json();
                  allDataPokemons[pokemon.name] = data;

                  const id = String(data.id).padStart(3, '0');
                  const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
                  fetchedImageUrls[pokemon.name] = imageUrl;
                }
              })
            );
            
            setImageUrls(fetchedImageUrls);
            setPokemonData(allDataPokemons);
          } catch (error) {
            console.error("Error fetching Pokemon images:", error);
          }
        };

        fetchPokemonImages();
      }, [pokemonList]);

    useEffect(() => {
        const filteredData = pokemonList.filter((pokemon) => {
            const data = pokemonData[pokemon.name]

            return (
              (filterById === "" || data.id.toString().includes(String(filterById).padStart(3, '0')) || String((data.id).toString()).padStart(3, '0').includes(filterById)) &&
              (filterByName === "" || pokemon.name.toLowerCase().includes(filterByName.toLowerCase())) &&
              (searchTerm === "" || pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) || data.id.toString().includes(String(searchTerm).padStart(3, '0')) || String((data.id).toString()).padStart(3, '0').includes(searchTerm))
            );
        });
        // console.log(filteredData)

        const sortedData = [...filteredData].sort((a, b) => {
            const data1 = pokemonData[a.name]
            const data2 = pokemonData[b.name]
    
            if(data1 && data2){
                if (sortBy === "id_asc") {
                  return data1.id - data2.id;
                } else if (sortBy === "id_desc") {
                  return data2.id - data1.id;
                } else if (sortBy === "name_asc") {
                  return a.name.localeCompare(b.name);
                } else if (sortBy === "name_desc") {
                  return b.name.localeCompare(a.name);
                } else {
                  return 0;
                }
            } else{
                if (sortBy === "id_asc") {
                    return a.id - b.id;
                } else if (sortBy === "id_desc") {
                    return b.id - a.id;
                } else if (sortBy === "name_asc") {
                    return a.name.localeCompare(b.name);
                } else if (sortBy === "name_desc") {
                    return b.name.localeCompare(a.name);
                } else {
                    return 0;
                }
            }
        });
        
        setCurrentCards(sortedData.slice(0, numberOfCards));
        setHasMore((sortedData.length > numberOfCards) ? true : false);
        setLoading(false);
    }, [pokemonList, numberOfCards, searchTerm, filterById, filterByName, sortBy])
    

    const fetchAllPokemons = async () => {
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025}`); 
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const allPokemons = await response.json();
            setPokemonList(allPokemons.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleLoadMore = () => {
        if ((numberOfCards+10) >= pokemonCount){
            setNumberOfCards(pokemonCount);
            setHasMore(false);
        } else {
            setNumberOfCards(numberOfCards + 10);
        }
    }

    const handleExploreClick = () => {
        setTimeout(() => {
            scrollToSection(cardSection);
        }, 100); // Adjust the delay as needed
    };

    const scrollToSection = (elementRef) => {
        elementRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    };
  
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
  
    const handleSort = (type) => {
        setSortBy(type);
    };
  
    const handleFilterById = (e) => {
        setFilterById(e.target.value);
    };
  
    const handleFilterByName = (e) => {
      setFilterByName(e.target.value);
    };

    if (loading) {
        return (
            <div className="spinner"></div>
        );
    }
    

    return (
        <div className='main-container h-min'>
            {/* Nav Bar */}
            <NavBar />
            <div className='h-[120px]'></div>
            {/* Main Home Page Screen */}
            <div className='w-full h-min flex items-center justify-center flex-col'>
                {/* Welcome section */}
                <div className='w-full h-screen flex flex-col items-center justify-center bg-gray-100'>
                    <img id="pokeball" src='/assets/pokeball.png' className='w-[500px]'/>
          
                    <p className="text-lg m-6 group relative w-max pt-5">
                        <button className='hover:text-blue-1 text-3xl font-["nunito"] font-black text-blue-2' onClick={handleExploreClick} disabled={!hasMore}>EXPLORE POKEMONS</button>
                        <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-blue-1 group-hover:w-3/6"></span>
                        <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-blue-1 group-hover:w-3/6"></span>
                    </p>

                </div>
                {/* Card Section */}
                <div  className='h-min-content w-full bg-gray-100 flex flex-col items-center justify-center' id="card-view-section" ref={cardSection}>
                    {/* Functionalities Section */}
                    <div className='mt-[160px] w-full flex flex-wrap items-center justify-center mx-5 mb-20'>
                        {/* Search bar */}
                        <div className='min-w-fit flex items-center justify-center'>
                            <FaSearch className='w-5 h-5 text-blue-2 mx-2 mb-3'/>
                            <input type="text" placeholder="Search by name or id" value={searchTerm} onChange={handleSearch}
                                className="font-['nunito'] w-96 xl:w-[400px] h-12 border-2 border-blue-2 px-3 py-1 rounded-lg mb-3 mx-2 placeholder-slate-400 
                                focus:outline-none focus:border-blue-1 focus:ring-1 focus:ring-sky-200"/>
                        </div>

                        {/* Sort buttons */}
                        <div className="flex">
                            {/* Dropdown for sort selection */}
                            <select onChange={(e) => handleSort(e.target.value)} className="btn w-96 xl:w-[370px] h-12 rounded-lg border-2 border-blue-2 px-3 py-1 rounded-lg mb-3 placeholder-slate-400 
                                    focus:outline-none focus:border-blue-1 focus:ring-2 focus:ring-sky-200 ml-8">
                                <option value="id_asc">ID (Lowest to Highest)</option>
                                <option value="id_desc">ID (Highest to Lowest)</option>
                                <option value="name_asc">Name (A to Z)</option>
                                <option value="name_desc">Name (Z to A)</option>
                            </select>
                        </div>

                        <div className='flex flex-wrap flex-row mx-4 items-center justify-center min-w-fit md:w-[800px]'>
                            {/* Filter by ID */}
                            <div className='flex items-center justify-center'>
                                <input type="checkbox" checked={!disableFilterById} onChange={() => {setDisableFilterById(!disableFilterById); setFilterById("")}} 
                                    className='w-[20px] h-[20px] text-blue-2 bg-gray-100 border-2 border-blue-2 rounded focus:ring-blue-1 mx-2 mb-3'/>

                                <input type="text" placeholder="Filter by ID" value={filterById} onChange={handleFilterById}
                                    className={`w-96 xl:w-[370px] flex-grow font-['nunito'] h-12 border-2 border-blue-2 px-3 py-1 rounded-lg mb-3 placeholder-slate-400 
                                    focus:outline-none focus:border-blue-1 focus:ring-2 focus:ring-sky-200 ${disableFilterById ? 'opacity-50' : ''}`}
                                    disabled={disableFilterById}
                                />
                            </div>
                           

                            {/* Filter by Name */}
                            <div className='flex flex-wrap items-center justify-center'>   
                                <input type="checkbox" checked={!disableFilterByName} onChange={() =>{ setDisableFilterByName(!disableFilterByName); setFilterByName("");}} 
                                    className='w-[20px] h-[20px] text-blue-2 bg-gray-100 border-2 border-blue-2 rounded focus:ring-blue-1 mx-2 md:mr-2 md:ml-4  mb-3'/>

                                <input type="text" placeholder="Filter by Name" value={filterByName} onChange={handleFilterByName}
                                    className={`w-96 xl:w-[370px] flex-grow font-['nunito'] h-12 border-2 border-blue-2 px-3 py-1 rounded-lg mb-3 placeholder-slate-400 
                                    focus:outline-none focus:border-blue-1 focus:ring-2 focus:ring-sky-200 ${disableFilterByName ? 'opacity-50' : ''}`}
                                    disabled={disableFilterByName}
                                />
                            </div>
                           
                        </div>
                    </div>
                    {count > 0 ? (
                        <>
                            <div className='flex flex-wrap items-center justify-center'>
                                {currentCards.map((pokemon) => (
                                    <PokemonCard key={pokemon.name} pokemon={pokemonData[pokemon.name]} imageUrls={imageUrls} name={pokemon.name}/>                
                                ))}
                            </div>

                            {hasMore ? (
                                <p className="text-lg m-6 group relative w-max">
                                    <button className='hover:text-blue-1 text-2xl font-["nunito"] font-extrabold text-blue-2' onClick={() =>{ handleLoadMore();}} disabled={!hasMore}>LOAD MORE</button>
                                    <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-blue-1 group-hover:w-3/6"></span>
                                    <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-blue-1 group-hover:w-3/6"></span>
                                </p>
                            ) : (
                                <div className='font-bold text-blue-2 text-2xl font-["nunito"] my-10'>
                                    -- END OF RESULTS -- 
                                </div>
                            )}

                            
                        </>
                    ) : (
                        <div className='font-bold text-blue-2 text-2xl font-["nunito"] my-10'>
                            -- NO DATA AVAILABLE -- 
                        </div>
                    )}
                  
                </div>

            </div>

        </div>
    );
}

import React, { useEffect, useState, useRef} from 'react';
import NavBar from '../organism/Navbar.js';
import PokemonCard from '../organism/PokemonCard.js';
import './HomePage.css'
import { useIsomorphicLayoutEffect } from 'framer-motion';


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
        }, 3000); // Delay in milliseconds (e.g., 2000ms = 2 seconds)
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
              (filterById === "" || data.id.toString().includes(filterById)) &&
              (filterByName === "" || pokemon.name.toLowerCase().includes(filterByName.toLowerCase())) &&
              (searchTerm === "" || pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        });
        console.log(filteredData)

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
        return <div>Loading...</div>;
    }
    

    return (
        <div className='main-container h-min'>
            {/* Nav Bar */}
            <NavBar /> 
            {/* Main Home Page Screen */}
            <div className='w-full h-min flex items-center justify-center flex-col'>
                {/* Welcome section */}
                <div className='w-full h-screen flex flex-col items-center justify-center bg-gray-100'>
                    <img id="pokeball" src='/assets/pokeball.png' className='mt-24 w-[600px]'/>
          
                    <p className="text-lg m-6 group relative w-max pt-5">
                        <button className='hover:text-blue-1 text-3xl font-["nunito"] font-bold text-blue-2' onClick={handleExploreClick} disabled={!hasMore}>EXPLORE POKEMONS</button>
                        <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-blue-1 group-hover:w-3/6"></span>
                        <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-blue-1 group-hover:w-3/6"></span>
                    </p>

                </div>
                {/* Card Section */}
                <div  className='h-min-content w-full bg-gray-100 flex flex-col items-center justify-center' id="card-view-section" ref={cardSection}>
                    {/* Functionalities Section */}
                    <div className='mt-[140px] flex flex-wrap items-center justify-center'>
                        {/* Search bar */}
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="border border-gray-300 px-3 py-1 rounded-md mb-3"
                        />

                        {/* Filter by ID */}
                        <input
                            type="text"
                            placeholder="Filter by ID"
                            value={filterById}
                            onChange={handleFilterById}
                            className="border border-gray-300 px-3 py-1 rounded-md mb-3"
                        />

                        {/* Filter by Name */}
                        <input
                            type="text"
                            placeholder="Filter by Name"
                            value={filterByName}
                            onChange={handleFilterByName}
                            className="border border-gray-300 px-3 py-1 rounded-md mb-3"
                        />

                        {/* Sort buttons */}
                        <div className="flex space-x-3 mb-3">
                            <button onClick={() => handleSort("id_asc")} className="btn">Sort by ID (asc)</button>
                            <button onClick={() => handleSort("id_desc")} className="btn">Sort by ID (desc)</button>
                            <button onClick={() => handleSort("name_asc")} className="btn">Sort by Name (asc)</button>
                            <button onClick={() => handleSort("name_desc")} className="btn">Sort by Name (desc)</button>
                        </div>
                    </div>
                    {count > 0 ? (
                        <>
                            <div className='flex flex-wrap items-center justify-center'>
                                {currentCards.map((pokemon) => (
                                    <PokemonCard pokemon={pokemonData[pokemon.name]} imageUrls={imageUrls} name={pokemon.name}/>                
                                ))}
                            </div>

                            <p class="text-lg m-6 group relative w-max">
                                <button className='hover:text-blue-1 text-2xl font-["nunito"] font-bold text-blue-2' onClick={handleLoadMore} disabled={!hasMore}>LOAD MORE</button>
                                <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-blue-1 group-hover:w-3/6"></span>
                                <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-blue-1 group-hover:w-3/6"></span>
                            </p>
                        </>
                    ) : (
                        <div> 
                            Loading...
                        </div>
                    )}
                  
                </div>

            </div>

        </div>
    );
}

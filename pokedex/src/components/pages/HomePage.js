import React, { useEffect, useState, useRef} from 'react';
import NavBar from '../organism/Navbar.js';
import PokemonCard from '../organism/PokemonCard.js';
import './HomePage.css'


export default function HomePage(){
    const [loading, setLoading] = useState(true);

    const [pokemonCount, setPokemonCount] = useState();
    const [pokemonList, setPokemonList] = useState([]);

    const [hasMore, setHasMore] = useState(true);
    const [numberOfCards, setNumberOfCards] = useState();
    
    const [currentSorting, setCurrentSorting] = useState("Pokemon ID (Ascending)");
    const [beenSorted, setBeenSorted] = useState(false);

    const [currentCards, setCurrentCards] = useState([]);
        
    useEffect(() => {
        fetchPokemonCount();
    }, []); //fetch once

    useEffect(() => {
        if(beenSorted){
            fetchAllPokemons();
        } else {
            fetchFixedCountPokemons(numberOfCards);
        }
        
        const currentPokemons = pokemonList.slice(0, numberOfCards);
        setCurrentCards(currentPokemons);
    }, [numberOfCards, pokemonList])
    
    const fetchPokemonCount = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1}`); //limit = 1; let's just fetch the number of pokemons provided by the api
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const pokemons = await response.json();
            setNumberOfCards(10);
            setPokemonCount(pokemons.count);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchFixedCountPokemons = async (numberOfCards) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfCards}}`); //limit = 1; let's just fetch the number of pokemons provided by the api
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const pokemons = await response.json();
            setPokemonList(pokemons.results)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchAllPokemons = async () => {
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonCount}}`); 
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const allPokemons = await response.json();
            setNumberOfCards(10);
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
    const [showPokemonList, setShowPokemonList] = useState(false);
    const cardSection = useRef(null);


    const handleExploreClick = () => {
        setShowPokemonList(true);
        setTimeout(() => {
            scrollToSection(cardSection);
        }, 100); // Adjust the delay as needed
    };

    const scrollToSection = (elementRef) => {
        elementRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [filterById, setFilterById] = useState("");
    const [filterByName, setFilterByName] = useState("");
  
    const handleSearch = (e) => {
        setBeenSorted(true)
        setSearchTerm(e.target.value);
    };
  
    const handleSort = (type) => {
        setBeenSorted(true)
        setSortBy(type);
    };
  
    const handleFilterById = (e) => {
        setBeenSorted(true)
        setFilterById(e.target.value);
    };
  
    const handleFilterByName = (e) => {
      setFilterByName(e.target.value);
    };
  
    const filteredData = pokemonList.filter((item) => {
      return (
        (filterById === "" || item.id.toString().includes(filterById)) &&
        (filterByName === "" || item.name.toLowerCase().includes(filterByName.toLowerCase())) &&
        (searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  
    const sortedData = [...filteredData].sort((a, b) => {
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
    });
    
    const [imageUrls, setImageUrls] = useState({});
    const [pokemonData, setPokemonData] = useState({});

    const getPokemonId = (pokemonData) => {
        const id = String(pokemonData.id).padStart(3, '0');
        return id;
    }

    useEffect(() => {
        const fetchPokemonImages = async () => {
          try {
            const fetchedImageUrls = {};
            const allDataPokemons = {};

            await Promise.all(
              pokemonList.map(async (pokemon) => {
                const response = await fetch(pokemon.url);
                if (response.ok) {
                  const pokemonData = await response.json();
                  allDataPokemons[pokemon.name] = pokemonData;

                  const id = String(pokemonData.id).padStart(3, '0');
                  const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
                  fetchedImageUrls[pokemon.name] = imageUrl;
                }
              })
            );
            
            setImageUrls(fetchedImageUrls);
            setPokemonData(allDataPokemons);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching Pokemon images:", error);
            setLoading(false);
          }
        };

        fetchPokemonImages();
      }, [pokemonList]);

    if (loading) {
        return <div>Loading...</div>;
    }
    

    return (
        <div className='h-min'>
            {/* Nav Bar */}
            <NavBar /> 
            {/* Main Home Page Screen */}
            <div className='w-full h-min flex items-center justify-center flex-col'>
                {/* Welcome section */}
                <div className='w-full h-screen flex flex-col items-center justify-center bg-gray-100'>
                    <img id="pokeball" src='/assets/pokeball.png' className='mt-24 w-[600px]'/>
          
                    <button onClick={handleExploreClick} className='text-blue-2 px-10 pt-8 font-["nunito"] text-3xl font-bold hover:text-blue-1'> 
                        EXPLORE OTHER POKEMONS 
                    </button>
                </div>
                {/* Card Section */}
                <div  className='h-min-content w-full bg-gray-100 flex flex-col items-center justify-center' id="card-view-section" ref={cardSection}>
                    {/* Functionalities Section */}
                    <div className='mt-[140px] flex items-center justify-center'>
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
                    <div className='flex flex-wrap items-center justify-center'>
                        {currentCards.map((pokemon) => (
                            <PokemonCard pokemon={pokemonData[pokemon.name]} imageUrls={imageUrls} name={pokemon.name}/>                
                        ))}
                    </div>

                    <p class="text-lg m-6 group relative w-max">
                        <button className='text-2xl font-["nunito"] font-bold text-blue-2' onClick={handleLoadMore} disabled={!hasMore}>LOAD MORE</button>
                        <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-blue-2 group-hover:w-3/6"></span>
                        <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-blue-2 group-hover:w-3/6"></span>
                    </p>
                </div>

            </div>

        </div>
    );
}

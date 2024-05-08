import React, { useEffect, useState, useRef} from 'react';
import NavBar from '../organism/Navbar.js';
import './HomePage.css'


export default function HomePage(){
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
    }

    return (
        <div className='h-min'>
            {/* Nav Bar */}
            <NavBar /> 
            {/* Main Home Page Screen */}
            <div className='w-full h-min flex items-center justify-center flex-col'>
                {/* Welcome section */}
                <div className='h-screen flex flex-col items-center justify-center'>
                    <img id="pokeball" src='/assets/pokeball.png' className='mt-24 w-[600px]'/>

                    <div className='border-4 border-blue-2 w-fit mt-20'>
                        <button onClick={handleExploreClick} className='bg-blue-2 text-white px-10 py-4 font-["nunito"] text-yellow-1 border-4 border-yellow-1'> EXPLORE POKEMONS </button>
                    </div>
                </div>
                {/* Card Section */}
                <div  className='h-screen w-full bg-yellow-1' id="card-view-section" ref={cardSection}>
                    {/* Functionalities Section */}
                    <div>
                      
                    </div>      
                    {currentCards.map((pokemon, index) => (
                        <li key={pokemon.name}><button onClick={() => { console.log(pokemon) }}>{pokemon.name}</button></li>
                    ))}
                    <button onClick={handleLoadMore} disabled={!hasMore}>
                        LOAD MORE
                    </button>
                </div>

            </div>

        </div>
    );
}

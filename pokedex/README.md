# Pokédex - Mini-Project
### Author: Alexis Marie Narciso
### Date created: May 7 to May 12, 2024
## Description
This react app is a simple catalog for over 1000 pokémons. Users can see the list of pokémons and view a page providing detailed information about each pokémon. Inspired from: https://www.pokemon.com/us/pokedex

## Pages
### 1. Card View List - Home Page (route: /) 
- This feature provides users with an interactive way to explore a comprehensive list of up to 1025 Pokémon species.  Each card displays key information such as the Pokémon's name, ID, type, and an image thumbnail. This feature is designed to offer a seamless browsing experience, allowing users to easily search, filter, and sort through the Pokémon catalog to find exactly what they're looking for. 

- Key Features:
    - Search by ID or Name
    - Filter by ID or Name
    - Sort Options:
        - Sort by Name (Ascending)
        - Sort by Name (Descending) 
        - Sort by ID (Ascending)
        - Sort by ID (Descending)

### 2. View Pokemon Details (route: /pokemon/:idnumber)
- This feature allows users to explore a wide range of information about each Pokémon, including their physical attributes, abilities, pokémon type, and more.
- Key Features:
    - **Detailed Pokémon Information**
        - Photo
        - ID Number
        - Abilities
        - Type
        - Weaknesses
        - Height and Weight
        - Statistics: HP (Hit Points), Attack, Defense, Special Attack, Special Defense, and Speed.
        - Category

    - **Navigation Options**
        - View Next Pokémon (by id)
        - View Previous Pokémon (by id)

## How to Run

1. Ensure that you have Node.js installed on your system. If not, you can download and install it from [here](https://nodejs.org/).

2. Navigate to the `../pokedex/pokedex` directory in your terminal or command prompt. Make sure this directory contains a `src` folder, which includes the React app files.

3. Run the following command to install the required dependencies for the React app: `npm i` or `npm install`

4. Once the dependencies are installed, start the React app by running: `npm start`

5. You should now see the Pokémon (Gotta Catch 'Em All) webpage running locally on your machine. (localhost:3000) Enjoy exploring the world of Pokémon!


## Data Sources
1. **Pokémon Data:** https://pokeapi.com
2. **Pokémon Photos:** https://assets.pokemon.com/assets/cms2/img/pokedex/
3. **Pokeball Photo:** https://pokemon-fano.fandom.com/wiki/Poke_Ball?file=Poke_Ball.png

## References
1. **Bar graph** inspired from: https://github.com/RyanCahela/Expenses_Chart_Component

## Some Notes

1. **Modularization:** At present, most sections of the application are not divided into reusable components. Due to time constraints,I was not able to complete the mpodularization of the code. Work on this aspect will continue to enhance the maintainability and scalability of the project.

2. **Homepage Design:** There are plans to improve its layout and aesthetics in future improvement of the project. 
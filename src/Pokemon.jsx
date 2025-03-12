import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";
import "./Pokemon.css";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      //   console.log(data);
      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });
      console.log(detailedPokemonData);

      const detailedResponse = await Promise.all(detailedPokemonData);
      console.log("detailed", detailedResponse);
      setPokemon(detailedResponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Error Detected.. {error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <section className="conatiner">
        <header>
          <h1>Lets Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search Pokémon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            <i className="fas fa-search"></i> Search
          </button>
        </div>

        <div>
          <ul className="cards">
            {/* {pokemon.map((curPokemon) => { */}
            {searchData.map((curPokemon) => {
              return (
                <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

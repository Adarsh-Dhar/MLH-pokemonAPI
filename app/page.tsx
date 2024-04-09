"use client"

import { useState } from "react";
import axios from "axios";

interface Pokemon {
  name: string;
  abilities: Ability[];
  height: number;
  moves: Move[];
  sprites: {
    front_default: string;
  };
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
}

interface Move {
  move: {
    name: string;
    url: string;
  };
}

export default function Home() {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function buttonHandler() {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      const responseData: Pokemon = response.data;
      setPokemonData(responseData);
      setError(null);
    } catch (error) {
      setError("Pokemon not found!");
      setPokemonData(null);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
  <div className="bg-white rounded-lg p-8 shadow-md max-w-md w-full">
    <input
      type="text"
      placeholder="Search Pokemon"
      value={pokemon}
      onChange={(e) => setPokemon(e.target.value)}
      className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
    />
    <button
      onClick={buttonHandler}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
    >
      Search
    </button>
    {pokemonData && (
      <div className="mt-4">
        <h2 className="text-2xl mb-2">{pokemonData.name}</h2>
        <div className="flex items-center justify-center">
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} className="w-32 h-32" />
        </div>
        <div className="mt-4">
          <p><strong>Height:</strong> {pokemonData.height}</p>
        </div>
        <div className="mt-4">
          <p><strong>Abilities:</strong> {pokemonData.abilities.map((ability, index) => (
            <span key={index}>{ability.ability.name}{index !== pokemonData.abilities.length - 1 && ", "}</span>
          ))}</p>
        </div>
        <div className="mt-4">
          <p><strong>Moves:</strong> {pokemonData.moves.map((move, index) => (
            <span key={index}>{move.move.name}{index !== pokemonData.moves.length - 1 && ", "}</span>
          ))}</p>
        </div>
      </div>
    )}
    {error && <p className="mt-4 text-red-500">{error}</p>}
  </div>
</div>

  );
}

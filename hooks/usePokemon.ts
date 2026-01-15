import { useEffect, useState } from "react";
import { Pokemon, PokemonListItem } from "../types/pokemon";

export function usePokemon() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPokemons();
    }, []);

    async function fetchPokemons() {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
            if (!response.ok) {
                throw new Error("Failed to fetch pokemon list");
            }
            const data = await response.json();

            const detailedPokemons = await Promise.all(
                data.results.map(async (pokemon: PokemonListItem) => {
                    const res = await fetch(pokemon.url);
                    if (!res.ok) {
                        return null; // Handle individual failures gracefully
                    }
                    const details = await res.json();
                    return {
                        name: pokemon.name,
                        front_image: details.sprites.front_default,
                        back_image: details.sprites.back_default,
                        types: details.types,
                    };
                })
            );

            // Filter out any nulls from failed individual requests
            setPokemons(detailedPokemons.filter((p): p is Pokemon => p !== null));
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return { pokemons, loading, error, refetch: fetchPokemons };
}

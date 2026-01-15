import { useEffect, useState } from "react";
import { PokemonDetails } from "../types/pokemon";

export function usePokemonDetails(name: string) {
    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (name) {
            fetchPokemonDetails();
        }
    }, [name]);

    async function fetchPokemonDetails() {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            if (!response.ok) {
                throw new Error("Failed to fetch pokemon details");
            }
            const data = await response.json();

            setPokemon({
                name: data.name,
                front_image: data.sprites.front_default,
                back_image: data.sprites.back_default,
                types: data.types,
                id: data.id,
                height: data.height,
                weight: data.weight,
                stats: data.stats,
                abilities: data.abilities,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return { pokemon, loading, error, refetch: fetchPokemonDetails };
}

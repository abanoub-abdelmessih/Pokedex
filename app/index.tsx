import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

interface Pokemon {
  name: string;
  front_image: string;
  back_image: string;
}

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  useEffect(() => {
    // fetch pokemons
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    // Fetch main pokemon data
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10");
    const data = await response.json();

    const detailedPokemons = await Promise.all(
      data.results.map(async (pokemon: any) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();
        return {
          name: pokemon.name,
          front_image: details.sprites.front_default,
          back_image: details.sprites.back_default,
        };
      })
    );

    setPokemons(detailedPokemons);
  }

  return (
    <ScrollView>
      {pokemons.map((pokemon) => (
        <View key={pokemon.name}>
          {/* Pokemon Name */}
          <Text>{pokemon.name}</Text>

          {/* Images View */}
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: pokemon.front_image }}
              style={{ width: 150, height: 150 }}
            />
            <Image
              source={{ uri: pokemon.back_image }}
              style={{ width: 150, height: 150 }}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

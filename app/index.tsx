import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

interface PokemonListItem {
  name: string;
  url: string;
}

interface Pokemon {
  name: string;
  front_image: string;
  back_image: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

const colorsByType: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

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
      data.results.map(async (pokemon: PokemonListItem) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();
        return {
          name: pokemon.name,
          front_image: details.sprites.front_default,
          back_image: details.sprites.back_default,
          types: details.types,
        };
      })
    );

    setPokemons(detailedPokemons);
  }

  type PokemonTypeName = keyof typeof colorsByType;

  function getPokemonColor(types: PokemonType[]): string {
    const primaryType = types[0]?.type.name as PokemonTypeName | undefined;
    return primaryType ? colorsByType[primaryType] + 50 : "#AAA";
  }

  return (
    <FlatList
      data={pokemons}
      keyExtractor={(item) => item.name}
      contentContainerStyle={{ gap: 16, padding: 16 }}
      renderItem={({ item }) => (
        <View
          style={{
            backgroundColor: getPokemonColor(item.types),
            padding: 20,
            borderRadius: 20,
          }}
        >
          {/* Name */}
          <Text style={styles.name}>{item.name}</Text>

          {/* Types */}
          <Text style={styles.type}>
            {item.types.map((t) => t.type.name).join(", ")}
          </Text>

          {/* Images */}
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image
              source={{ uri: item.front_image }}
              style={{ width: 120, height: 120 }}
            />
            <Image
              source={{ uri: item.back_image }}
              style={{ width: 120, height: 120 }}
            />
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
  },
});

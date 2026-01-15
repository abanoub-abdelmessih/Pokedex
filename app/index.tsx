import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PokemonCard } from "../components/PokemonCard";
import { usePokemon } from "../hooks/usePokemon";

export default function Index() {
  const { pokemons, loading, error, refetch } = usePokemon();

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Text style={styles.retryText} onPress={() => refetch()}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingBottom: 16,
    color: "#333",
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginBottom: 8,
  },
  retryText: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
});

import { Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colorsByType } from "../constants/colors";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import { PokemonType } from "../types/pokemon";

type PokemonTypeName = keyof typeof colorsByType;

function getPokemonColor(types: PokemonType[]): string {
  const primaryType = types[0]?.type.name as PokemonTypeName | undefined;
  return primaryType ? colorsByType[primaryType] : "#AAA";
}

export default function Details() {
  const params = useLocalSearchParams();
  const name = params.name as string;
  const { pokemon, loading, error } = usePokemonDetails(name);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error || "Pokemon not found"}</Text>
      </View>
    );
  }

  const backgroundColor = getPokemonColor(pokemon.types);

  return (
    <>
      <Stack.Screen
        options={{
          title: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
          headerStyle: { backgroundColor },
          headerTintColor: "#FFF",
        }}
      />
      <ScrollView style={[styles.container, { backgroundColor }]}>
        <View style={styles.header}>
          <Image
            source={{ uri: pokemon.front_image }}
            style={styles.image}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{pokemon.name}</Text>
            <View style={styles.typesContainer}>
              {pokemon.types.map((t) => (
                <View key={t.type.name} style={styles.typeBadge}>
                  <Text style={styles.typeText}>{t.type.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <View style={styles.row}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Height</Text>
                <Text style={styles.statValue}>{pokemon.height / 10} m</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Weight</Text>
                <Text style={styles.statValue}>{pokemon.weight / 10} kg</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Base Stats</Text>
            {pokemon.stats.map((stat) => (
              <View key={stat.stat.name} style={styles.statRow}>
                <Text style={styles.statName}>
                  {stat.stat.name.replace('-', ' ').toUpperCase()}
                </Text>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${Math.min(stat.base_stat, 100)}%`, backgroundColor }
                    ]}
                  />
                </View>
                <Text style={styles.statNumber}>{stat.base_stat}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  image: {
    width: 200,
    height: 200,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: -20
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    color: '#FFF',
    textTransform: 'capitalize',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  typesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  typeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  typeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
    textTransform: 'capitalize',
  },
  statsCard: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    minHeight: 500, // Ensure it fills remaining space visually
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statName: {
    width: 100,
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  statNumber: {
    width: 40,
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
});

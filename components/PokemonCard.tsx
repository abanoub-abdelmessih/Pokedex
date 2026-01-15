import { Link } from "expo-router";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { colorsByType } from "../constants/colors";
import { Pokemon, PokemonType } from "../types/pokemon";

interface PokemonCardProps {
    pokemon: Pokemon;
}

type PokemonTypeName = keyof typeof colorsByType;

function getPokemonColor(types: PokemonType[]): string {
    const primaryType = types[0]?.type.name as PokemonTypeName | undefined;
    return primaryType ? colorsByType[primaryType] : "#AAA";
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
    const backgroundColor = getPokemonColor(pokemon.types);

    // Calculate width to fit 2 columns nicely
    const windowWidth = Dimensions.get('window').width;
    const cardWidth = (windowWidth - 48) / 2; // Subtracting padding (16*3)

    return (
        <Link
            href={{ pathname: "/details", params: { name: pokemon.name } }}
            style={[styles.linkContainer, { backgroundColor, width: cardWidth }]}
        >
            <View style={styles.cardContent}>
                <Text style={styles.name}>{pokemon.name}</Text>

                <View style={styles.typesContainer}>
                    {pokemon.types.map((t) => (
                        <View key={t.type.name} style={styles.typeBadge}>
                            <Text style={styles.typeText}>{t.type.name}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: pokemon.front_image }}
                        style={styles.image}
                    />
                </View>
            </View>
        </Link>
    );
}

const styles = StyleSheet.create({
    linkContainer: {
        borderRadius: 20,
        marginBottom: 16,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Elevation for Android
        elevation: 5,
    },
    cardContent: {
        padding: 16,
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: '#FFF',
        textTransform: 'capitalize',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    typesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 4,
        marginBottom: 8,
    },
    typeBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    typeText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#FFF",
        textTransform: 'capitalize',
    },
    imageContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 60,
        padding: 5,
    },
    image: {
        width: 100,
        height: 100,
    },
});

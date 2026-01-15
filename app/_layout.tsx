import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Pokedex" }} />
        <Stack.Screen
          name="details"
          options={{
            title: "Details",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}

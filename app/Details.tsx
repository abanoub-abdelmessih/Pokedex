import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function Details() {
  const params = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{ title: params.name as string }} />
      <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }}>
        <Text>Details</Text>
      </ScrollView>
    </>
  );
}

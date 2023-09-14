import { useLocalSearchParams, useGlobalSearchParams } from "expo-router"
import { Text } from "react-native";

function Details () {
  const local = useLocalSearchParams();
  console.log(local.id)
  return (
    <>
      <Text>Hello {local.id}</Text>
    </>
)
}

export default Details
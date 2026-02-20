import { View } from "react-native";
import { TextInput } from "react-native-paper";

export default function addHabit() {
  return (
    <View>
      <TextInput label={"Title"} mode="outlined" />
      <TextInput label={"Description"} mode="outlined" />
    </View>
  );
}

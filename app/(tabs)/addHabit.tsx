import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import "react-native-get-random-values";
import {
  Button,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

const FREQUENCIES = ["daily", "weekly", "monthly"];
type Frequency = (typeof FREQUENCIES)[number];

export default function addHabit() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [frequency, setFrequency] = useState<Frequency>("");
  const [error, setError] = useState<string>("");
  const theme = useTheme();

  const handleSubmit = async () => {
    if (!title || !description || !frequency) {
      setError("Proszę wypełnić wszystkie pola.");
      return;
    }

    try {
      const { error: supabaseError } = await supabase.from("habit-db").insert([
        {
          title: title,
          description: description,
          frequency: frequency,
        },
      ]);
      if (supabaseError) {
        setError(supabaseError.message);
        return;
      }
      setTitle("");
      setDescription("");
      setFrequency("");
      setError("");

      router.back();
    } catch (err) {
      setError("Wystąpił nieoczekiwany błąd połączenia.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label={"Title"}
        mode="outlined"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        activeOutlineColor="#75B06F"
      />
      <TextInput
        label={"Description"}
        mode="outlined"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        activeOutlineColor="#75B06F"
      />
      <View style={styles.frequencyContainer}>
        <SegmentedButtons
          theme={{ colors: { secondaryContainer: "#75B06F" } }}
          value={frequency}
          onValueChange={(value) => setFrequency(value as Frequency)}
          buttons={FREQUENCIES.map((freq) => ({
            value: freq,
            label: freq.charAt(0).toUpperCase() + freq.slice(1),
          }))}
        />
      </View>
      {/* <TextInput
        label={"Custom frequency in days"}
        mode="outlined"
        style={styles.input}
        value={frequency}
        onChangeText={setFrequency}
        activeOutlineColor="#75B06F"
      /> */}
      <Button
        mode="contained"
        theme={{ colors: { primary: "#75B06F" } }}
        style={styles.button}
        onPress={handleSubmit}
        disabled={!title || !description || !frequency}
      >
        Add Habit
      </Button>
      {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "f5f5f5",
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
  },
  frequencyContainer: {
    marginBottom: 24,
  },
  button: {
    marginTop: 16,
  },
});

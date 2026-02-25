import { useAuth } from "@/lib/authContext";
import { supabase } from "@/lib/supabase";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  const { session, initialized } = useAuth();
  const handleSingOut = async () => {
    await supabase.auth.signOut();
  };
  return (
    <View style={styles.view}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button mode="text" onPress={handleSingOut}>
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    width: 300,
    backgroundColor: "coral",
    height: 30,
    textAlign: "center",
    borderRadius: 8,
    verticalAlign: "middle",
  },
});

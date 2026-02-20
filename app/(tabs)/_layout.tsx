import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#80ced7" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="streaks"
        options={{
          title: "Streaks",
          tabBarIcon: ({ color }) => (
            <Entypo name="area-graph" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addHabit"
        options={{
          title: "Add Habit",
          tabBarIcon: ({ color }) => (
            <Entypo name="add-to-list" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

const chatData = [
  {
    id: "1",
    name: "Doc Calvin Plado",
    message: "Ayun mas mabuti para matapos natin...",
    time: "9:45 AM",
  },
  {
    id: "2",
    name: "Doc Harrold Chaps",
    message: "Sige, i-send mo na lang sa email.",
    time: "8:30 AM",
  },
  {
    id: "3",
    name: "Doc Oliver",
    message: "Naka-leave ako bukas.",
    time: "Yesterday",
  },
  {
    id: "4",
    name: "Dr.Maria Santos",
    message: "Kamusta ang project?",
    time: "Yesterday",
  },
  {
    id: "5",
    name: "Dr.Ariel Mendoza",
    message: "Okay na sir.",
    time: "Monday",
  },
];

export default function ChatsScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const filteredChats = chatData.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.dispatch(DrawerActions.openDrawer())
          }
        >
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Stack Navigation
        </Text>

        <TouchableOpacity>
          <Ionicons
            name="ellipsis-vertical"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {/* Search */}

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="gray"
          style={{ marginRight: 8 }}
        />

        <TextInput
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <Text style={styles.title}>Message List</Text>

      {/* Chat List */}

      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatCard}
            onPress={() =>
              router.push({
                pathname: "/message",
                params: {
                  name: item.name,
                },
              })
            }
          >
            {/* Avatar */}

            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.name.charAt(0)}
              </Text>
            </View>

            {/* Chat Info */}
            <View style={styles.chatInfo}>
              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text
                numberOfLines={1}
                style={styles.message}
              >
                {item.message}
              </Text>
            </View>

            {/* Time */}
            <Text style={styles.time}>
              {item.time}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    backgroundColor: "#6C2BD9",
    paddingTop: 55,
    paddingBottom: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  searchContainer: {
    margin: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
  },

  title: {
    marginHorizontal: 15,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 18,
  },

  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ECECEC",
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#D8D8D8",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#555",
  },

  chatInfo: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#222",
  },

  message: {
    color: "#666",
    marginTop: 4,
  },

  time: {
    fontSize: 12,
    color: "#888",
  },
});
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const peopleData = [
  {
    id: "1",
    name: "Doc Calvin Plado",
    status: "Online",
  },
  {
    id: "2",
    name: "Doc Harrold Chaps",
    status: "Online",
  },
  {
    id: "3",
    name: "Doc Oliver",
    status: "Online",
  },
  {
    id: "4",
    name: "Dr.Maria Santos",
    status: "Offline",
  },
  {
    id: "5",
    name: "Dr.Ariel Mendoza",
    status: "Online",
  },
  
];

export default function PeopleScreen() {
  const [search, setSearch] = useState("");

  const filteredPeople = peopleData.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>People</Text>
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
          placeholder="Search People"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredPeople}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.personCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.name.charAt(0)}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>

              <Text
                style={[
                  styles.status,
                  {
                    color:
                      item.status === "Online"
                        ? "green"
                        : "#888",
                  },
                ]}
              >
                ● {item.status}
              </Text>
            </View>

          </View>
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
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22,
  },

  searchContainer: {
    margin: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    paddingHorizontal: 12,
  },

  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
  },

  personCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
  },

  name: {
    fontWeight: "bold",
    fontSize: 17,
  },

  status: {
    marginTop: 4,
    fontSize: 13,
  },

  addButton: {
    backgroundColor: "#6C2BD9",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  addText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "600",
  },
});
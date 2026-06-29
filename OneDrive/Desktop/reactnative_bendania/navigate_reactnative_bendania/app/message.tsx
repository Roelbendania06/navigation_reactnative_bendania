import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function MessageScreen() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello, magandang umaga.",
      sender: "me",
    },
    {
      id: "2",
      text: "Magandang umaga din po sir.",
      sender: "them",
    },
    {
      id: "3",
      text: "kamusta ka?",
      sender: "me",
    },
  ]);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: message,
        sender: "me",
      },
    ]);

    setMessage("");

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({
        animated: true,
      });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : undefined}
    >
      {/* Header */}



      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 15,
        }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === "me"
                ? styles.right
                : styles.left,
            ]}
          >
            <View
              style={[
                styles.bubble,
                item.sender === "me"
                  ? styles.myBubble
                  : styles.otherBubble,
              ]}
            >
              <Text
                style={{
                  color:
                    item.sender === "me"
                      ? "#fff"
                      : "#000",
                }}
              >
                {item.text}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Ionicons
            name="happy-outline"
            size={25}
            color="#6C2BD9"
          />
        </TouchableOpacity>

        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          style={styles.input}
        />

        <TouchableOpacity onPress={sendMessage}>
          <Ionicons
            name="send"
            size={26}
            color="#6C2BD9"
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 12,
  },

  avatarText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#6C2BD9",
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  status: {
    color: "#ddd",
    fontSize: 13,
  },

  messageContainer: {
    marginVertical: 6,
  },

  left: {
    alignItems: "flex-start",
  },

  right: {
    alignItems: "flex-end",
  },

  bubble: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 18,
  },

  myBubble: {
    backgroundColor: "#6C2BD9",
    borderBottomRightRadius: 5,
  },

  otherBubble: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 5,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },

  input: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    marginHorizontal: 10,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
  },
});
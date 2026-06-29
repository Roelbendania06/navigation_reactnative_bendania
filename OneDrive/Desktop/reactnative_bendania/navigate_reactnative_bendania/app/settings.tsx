import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";

export default function SettingsScreen() {
  const navigation = useNavigation();

  const [activeStatus] = useState(true);
  const [notification] = useState(true);
  const [darkMode] = useState("System");
  const [dataSaver] = useState(false);

  const SettingRow = ({
    icon,
    color,
    title,
    value,
    onPress,
  }: any) => (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={[styles.circle, { backgroundColor: color }]}>
        <Ionicons name={icon} size={18} color="#fff" />
      </View>

      <Text style={styles.rowTitle}>{title}</Text>

      <View style={styles.right}>
        <Text style={styles.value}>{value}</Text>
        <Ionicons
          name="chevron-forward"
          size={18}
          color="#999"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>

      {/* Header */}

      <View style={styles.header}>
        

        <View style={{ width: 25 }} />
      </View>

      {/* Profile */}

      <View style={styles.profileContainer}>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            JM
          </Text>
        </View>

        <Text style={styles.name}>
          Jason Magsino
        </Text>

       

      </View>

      {/* PROFILE */}

      <Text style={styles.section}>
        PROFILE
      </Text>

      <SettingRow
        icon="radio"
        color="#1abc9c"
        title="Active Status"
        value={activeStatus ? "On" : "Off"}
      />

      <SettingRow
        icon="person"
        color="#2196F3"
        title="Username"
        value="m.me/johndoe"
      />

      {/* PREFERENCES */}

      <Text style={styles.section}>
        PREFERENCES
      </Text>

      <SettingRow
        icon="notifications"
        color="#E53935"
        title="Notifications & Sounds"
        value={notification ? "On" : "Off"}
      />

      <SettingRow
        icon="moon"
        color="#111"
        title="Dark Mode"
        value={darkMode}
      />

      <SettingRow
        icon="speedometer"
        color="#27AE60"
        title="Data Saver"
        value={dataSaver ? "On" : "Off"}
      />

      {/* ACCOUNT */}

      <Text style={styles.section}>
        ACCOUNT & LEGAL
      </Text>

      <SettingRow
        icon="settings"
        color="#607D8B"
        title="Account Settings"
        value=""
      />

      <SettingRow
        icon="warning"
        color="#D68910"
        title="Report Technical Problem"
        value=""
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace("/(tabs)")}
      >
        <Feather
          name="message-circle"
          size={20}
          color="#2196F3"
        />

        <Text style={styles.backText}>
          Back to Chats
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#fff"
  },

  header:{
    height:0,
    backgroundColor:"##6C2BD9",
    flexDirection:"row",
    alignItems:"flex-end",
    justifyContent:"space-between",
    paddingHorizontal:15,
    paddingBottom:30
  },

  headerTitle:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:22
  },

  profileContainer:{
    alignItems:"center",
    marginTop:30,
    marginBottom:25
  },

  avatar:{
    width:100,
    height:100,
    borderRadius:50,
    backgroundColor:"#1E88E5",
    justifyContent:"center",
    alignItems:"center"
  },

  avatarText:{
    color:"#fff",
    fontWeight:"bold",
    fontSize:42
  },

  name:{
    marginTop:18,
    fontSize:30,
    fontWeight:"bold"
  },

  edit:{
    marginTop:6,
    color:"#888",
    fontSize:16
  },

  section:{
    color:"#777",
    marginHorizontal:20,
    marginTop:25,
    marginBottom:10,
    fontWeight:"600"
  },

  row:{
    flexDirection:"row",
    alignItems:"center",
    paddingHorizontal:20,
    paddingVertical:18
  },

  circle:{
    width:34,
    height:34,
    borderRadius:17,
    justifyContent:"center",
    alignItems:"center"
  },

  rowTitle:{
    flex:1,
    marginLeft:15,
    fontSize:18
  },

  right:{
    flexDirection:"row",
    alignItems:"center"
  },

  value:{
    color:"#777",
    marginRight:5,
    fontSize:16
  },

  backButton:{
    alignItems:"center",
    marginVertical:30
  },

  backText:{
    color:"#2196F3",
    marginTop:5,
    fontWeight:"600"
  }

});
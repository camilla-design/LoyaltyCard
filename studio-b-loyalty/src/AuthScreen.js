import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function AuthScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    (async () => {
      const savedEmail = await AsyncStorage.getItem("email");
      const savedPassword = await AsyncStorage.getItem("password");
      if (savedEmail && savedPassword) {
        handleLogin(savedEmail, savedPassword, true);
      }
    })();
  }, []);

  const handleRegister = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        email,
        role: "customer",
        stamps: 0
      });
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);
      onLogin({ email, role: "customer" });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogin = async (loginEmail, loginPassword, auto = false) => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const userDoc = await getDoc(doc(db, "users", userCred.user.uid));
      if (userDoc.exists()) {
        await AsyncStorage.setItem("email", loginEmail);
        await AsyncStorage.setItem("password", loginPassword);
        onLogin({ email: loginEmail, role: userDoc.data().role, uid: userCred.user.uid });
      }
    } catch (err) {
      if (!auto) alert(err.message);
    }
  };

  return (
  
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Text>Password:</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <Button color="#e8889d" title="Login" onPress={() => handleLogin(email, password)} />
        <Text style={styles.registerText}>Get a stamp for your visit & unlock rewards! ✨ </Text>
      <Button color="#000"  title="Join Today" onPress={handleRegister} />
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, },
  input: { borderWidth: 1, width: 350, marginVertical: 5, marginBottom: 3, padding: 8, borderColor: '#efa3b4', color: "#000", },
  registerText: {
    textAlign: 'center',
    paddingTop: 10,
    margin: 3,
    fontSize: 15,
  }
  
  
});

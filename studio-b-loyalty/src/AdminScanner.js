import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { db } from "./firebaseConfig";
import { doc, getDoc, updateDoc, increment, setDoc } from "firebase/firestore";

export default function AdminScanner({ adminId }) {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleScan = async ({ data }) => {
    try {
      const { id, ts, sig } = JSON.parse(data);
      const now = Date.now();
      if (now - parseInt(ts) > 30000) {
        return Alert.alert("Invalid QR", "This code has expired");
      }

      const usedRef = doc(db, "usedTokens", sig);
      const usedSnap = await getDoc(usedRef);
      if (usedSnap.exists()) {
        return Alert.alert("Invalid QR", "This code was already used");
      }

      const customerRef = doc(db, "users", id);
      const customerSnap = await getDoc(customerRef);
      if (!customerSnap.exists()) {
        return Alert.alert("Invalid QR", "Customer not found");
      }

      await updateDoc(customerRef, { stamps: increment(1) });
      await setDoc(usedRef, { usedAt: now });

      Alert.alert("Success", "Stamp added!");
    } catch (err) {
      Alert.alert("Invalid QR", "Could not read this code");
    }
  };

  if (hasPermission === null) return <Text>Requesting camera permission...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <BarCodeScanner
      onBarCodeScanned={handleScan}
      style={{ flex: 1 }}
    />
  );
}

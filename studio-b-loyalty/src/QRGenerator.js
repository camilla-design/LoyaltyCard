import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as Crypto from "expo-crypto";
import { auth } from "./firebaseConfig";

export default function QRGenerator() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const generateToken = async () => {
      const ts = Date.now().toString();
      const sig = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        auth.currentUser.uid + ts + "SECRET_KEY"
      );
      setToken(JSON.stringify({ id: auth.currentUser.uid, ts, sig }));
    };
    generateToken();
    const interval = setInterval(generateToken, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <Text>Your QR Code</Text>
      {token && <QRCode value={token} size={200} />}
    </View>
  );
}

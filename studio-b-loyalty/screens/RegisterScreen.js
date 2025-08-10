// screens/RegisterScreen.js
import React from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Image } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../src/firebaseConfig';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Please fill name, email and password');
      return;
    }
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(userCred.user, { displayName: name });
      const uid = userCred.user.uid;
      await setDoc(doc(db, 'users', uid), {
        name,
        email: email.trim(),
        phone: phone.trim(),
        visitCount: 0,
        createdAt: serverTimestamp(),
        lastVisitDate: null,
        lastReward: null
      });
      // user is signed in automatically; navigation will switch to Home
    } catch (err) {
      console.error(err);
      Alert.alert('Registration error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
        <Image
                     style={styles.logo}
                     source={require('../assets/b-studio-logo.jpg')}
                          />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button  color={'#e8889d'} title={loading ? "Registering..." : "Register"} onPress={onRegister} disabled={loading} />
      <View style={{height:10}} />
      <Text style={{textAlign:'center'}}>Already have an account?</Text>
      <Button color={'#74acfaff'} title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
     container:{flex:1,alignItems: 'center',
    justifyContent: 'center',},
  subtitle:{fontSize:16, marginTop:20, textAlign:'center'},
    input:{borderWidth:1, borderColor:'#efa3b4', padding:10, marginTop: 10, marginBottom:10, borderRadius:6, width: 200,},
   logo: {
    width: 350,
    height: 155,
     alignItems: 'center',
    justifyContent: 'center',
  },
});

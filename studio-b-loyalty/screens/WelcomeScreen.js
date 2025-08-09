import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.companyName}>Studio B</Text>
            <View style={{height:10}} />
      <Button color={'#e8889d'} title="Login" onPress={() => navigation.navigate('Login')} />
      <View style={{height:20}} />
      <Button color={'#000'} title="Join Now" onPress={() => navigation.navigate('Register')} />
              <Text style={styles.subtitle}>Register today and get one step closer to your first discount.✨</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,},
  title:{fontSize:28, fontWeight:'700', textAlign:'center'},
  subtitle:{fontSize:16, marginTop:20, textAlign:'center'},
  companyName: {
    fontSize:28, fontWeight:'400',  marginTop:20, textAlign:'center',
  }
});
import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to</Text>
       <Image
             style={styles.logo}
             source={require('../assets/b-studio-logo.jpg')}
                  />
            <View style={{height:10}} />
      <Button color={'#e8889d'} title="Login" onPress={() => navigation.navigate('Login')} />
      <View style={{height:20}} />
      <Button color={'#74acfaff'} fontSize={30} title="Join Now" onPress={() => navigation.navigate('Register')} />
              <Text style={styles.subtitle}>Register today and get one step closer to your first discount.✨</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,alignItems: 'center',
    justifyContent: 'center',},
  title:{fontSize:28, fontWeight:'700', textAlign:'center', color:'#efa3b4'},
  subtitle:{fontSize:16, marginTop:20, textAlign:'center'},
  companyName: {
    fontSize:28, fontWeight:'400',  marginTop:20, textAlign:'center',
  },
   logo: {
    width: 350,
    height: 155,
     alignItems: 'center',
    justifyContent: 'center',
  },
});
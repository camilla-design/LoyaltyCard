import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';


export default function App() {
  return (
    <View style={styles.container}>
       <Image
               style={styles.logo}
              source={require('./assets/b-studio-logo.jpg')}
            />
      <WelcomeScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF4F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
   logo: {
    width: 350,
    height: 350,
  },
});

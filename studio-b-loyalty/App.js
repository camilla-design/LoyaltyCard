import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import AuthScreen from './src/AuthScreen';

export default function App() {
  return (
    <View style={styles.container}>
      
      <AuthScreen />
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
});

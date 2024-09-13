import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const App = () => {

  const [data, setData] = useState('')
  const url = 'http://10.0.2.2:3000/'

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch(url)
      const response = await res.json()
      setData(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (

    <View style={styles.section}>
      <Text style={styles.appTitleText}> Welcome Mobile 👋 </Text>
      <Text style={styles.appTitleText}> {data.message} 🎉 </Text>
    </View>

  );

}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitleText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default App;
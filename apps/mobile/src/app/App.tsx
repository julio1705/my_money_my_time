import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export const App = () => {

  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [typeTransaction, setTypeTransaction] = useState('inflow')
  const [value, setValue] = useState('');
  const [editingTransaction, setEditingTransaction] = useState(null);

  const url = 'http://10.0.2.2:3000'

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const response = await fetch(`${url}/`)
      const data = await response.json()
      setTransactions(data)
    } catch (error) {
      console.error(error)
    }
  }

  const createTransaction = async () => {

    if (!description || !value || isNaN(value)) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    try {

      const newTrasaction = {
        typeTransaction,
        value: parseFloat(value),
        description
      }

      const response = await fetch(`${url}/`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTrasaction)
      })
      const data = await response.json()
      setTransactions([...transactions, data])
      clearForm()
      alert('Transação cadastrada!');
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = (item) => {
    setEditingTransaction(item);
    setDescription(item.description);
    setTypeTransaction(item.typeTransaction);
    setValue(item.value.toString());
  }

  const updateTransaction = async () => {
    if (!description || !value || isNaN(value)) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    try {
      const response = await fetch(`${url}/${editingTransaction.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description,
          typeTransaction,
          value: parseFloat(value)
        })
      });
      const updatedTransaction = await response.json();
      setTransactions(transactions.map(transaction => transaction.id === editingTransaction.id ? updatedTransaction : transaction));
      clearForm();
      alert('Transação atualizada!');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTransaction = async (id) => {

    try {
      await fetch(`${url}/${id}`, {
        method: 'DELETE'
      });
      setTransactions(transactions.filter(transaction => transaction.id !== id));
      alert('Transação removida!')
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = () => {
    setDescription('');
    setValue('');
    setTypeTransaction('inflow');
    setEditingTransaction(null);
  };

  return (

    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 20 }}>

        <Text style={styles.appTitleText}>Minhas Transações:</Text>

        <Text>Valor:</Text>
        <TextInput
          placeholder="Digite o valor"
          value={value}
          onChangeText={setValue}
          keyboardType="numeric"
          style={styles.inputs}
        />

        <Text>Descrição:</Text>
        <TextInput
          placeholder="Digite a descrição"
          value={description}
          onChangeText={setDescription}
          style={styles.inputs}
        />

        <Text>Tipo de transação:</Text>
        <Picker
          selectedValue={typeTransaction}
          onValueChange={(itemValue) => setTypeTransaction(itemValue)}
          style={styles.inputs}
        >
          <Picker.Item label="Entrada" value="inflow" />
          <Picker.Item label="Saída" value="outflow" />
        </Picker>

        <View style={styles.buttonsForm}>
          <Button
            title={editingTransaction ? "Atualizar Transação" : "Adicionar Transação"}
            onPress={editingTransaction ? updateTransaction : createTransaction}
          />
          <Button
            title={editingTransaction ? "Cancelar" : "Limpar"}
            onPress={clearForm}
            color="#B22222"
          />
        </View>

        <View style={{ marginTop: 15 }}>
          {transactions.map(transaction => (
            <View key={transaction.id} style={styles.controlTranaction}>
              <TouchableOpacity onPress={() => handleEdit(transaction)}>
                <Text>{transaction.description}</Text>
                <Text>{transaction.typeTransaction === 'inflow' ? '+' : '-'} R$ {transaction.value.toFixed(2)}</Text>
              </TouchableOpacity>
              <Button title="Excluir" color="#B22222" onPress={() => deleteTransaction(transaction.id)} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>

  );

}

const styles = StyleSheet.create({
  appTitleText: {
    fontWeight: 'bold',
    fontSize: 30,
    paddingVertical: 15
  },
  inputs: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10
  },
  buttonsForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5
  },
  controlTranaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  }
});

export default App;
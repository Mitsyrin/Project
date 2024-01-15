import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS,SIZES } from '../constants';
import Button from './Comp/Button';


const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  const handleNum1Change = (text) => {
    setNum1(text);
  };

  const handleNum2Change = (text) => {
    setNum2(text);
  };

  const handleAddition = () => {
    const sum = parseFloat(num1) + parseFloat(num2);
    setResult(sum.toString());
  };

  const handleSubtraction = () => {
    const difference = parseFloat(num1) - parseFloat(num2);
    setResult(difference.toString());
  };

  const handleMultiplication = () => {
    const product = parseFloat(num1) * parseFloat(num2);
    setResult(product.toString());
  };

  const handleDivision = () => {
    const quotient = parseFloat(num1) / parseFloat(num2);
    setResult(quotient.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={{ ...FONTS.h1, color: COLORS.primary, marginTop: 20 }}>Калькулятор</Text>

      <TextInput
        style={styles.input}
        placeholder="Введите первое число"
        value={num1}
        onChangeText={handleNum1Change}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Введите второе число"
        value={num2}
        onChangeText={handleNum2Change}
        keyboardType="numeric"
      />

        <Button title="Прибавить" onPress={handleAddition} 
        style={{
          width: '100%',
          marginBottom: SIZES.padding
      }} />
        <Button title="Вычесть" onPress={handleSubtraction} 
        style={{
          width: '100%',
          marginBottom: SIZES.padding
      }}/>
        <Button title="Умножить" onPress={handleMultiplication}
        style={{
          width: '100%',
          marginBottom: SIZES.padding
      }} />
        <Button title="Разделить" onPress={handleDivision}
        style={{
          width: '100%',
          marginBottom: SIZES.padding
      }} />
      {result !== '' && <Text style={styles.input}><Text>Ответ:</Text>{result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.primary,
    marginTop: 1,
    alignSelf: 'flex-start',
    marginLeft: 1,
  },
  input: {
    width: '100%',
    backgroundColor: COLORS.gray,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    borderRadius: 12,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginVertical: 5,
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Calculator;
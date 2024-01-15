import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, SIZES } from '../constants';
import Button from './Comp/Button';
import { auth, database } from '../firebase';
import { ref, push, update } from 'firebase/database';

const SetScreen = ({ navigation }) => {
  const [purchaseDate, setPurchaseDate] = useState('');
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [cost, setCost] = useState('');

  const userId = auth.currentUser.uid;

  const addPurchase = () => {
    const newPurchase = {
      purchaseDate,
      category,
      itemName,
      cost,
    };

    const userPurchasesRef = ref(database, `users/${userId}/historybuy`);
    push(userPurchasesRef, newPurchase)
      .then(() => {
        console.log('Успешно добавлено.');
      })
      .catch((error) => {
        console.error('Ошибка', error);
      });

    setPurchaseDate('');
    setCategory('');
    setItemName('');
    setCost('');
  };

  return (
    <View style={styles.container}>
      <Text style={{ ...FONTS.h1, color: COLORS.primary, marginTop: 20 }}>Добавить историю покупок</Text>
      <View style={styles.input}>
        <TextInput
          placeholder="Дата покупки"
          value={purchaseDate}
          onChangeText={setPurchaseDate}
          style={{ flex: 1 }}
        />
      </View>

      <View style={styles.input}>
        <TextInput
          placeholder="Категория товара"
          value={category}
          onChangeText={setCategory}
          style={{ flex: 1 }}
        />
      </View>

      <View style={styles.input}>
        <TextInput
          placeholder="Название вещи"
          value={itemName}
          onChangeText={setItemName}
          style={{ flex: 1 }}
        />
      </View>

      <View style={styles.input}>
        <TextInput
          placeholder="Стоимость"
          value={cost}
          onChangeText={setCost}
          style={{ flex: 1 }}
        />
      </View>

      <Button title="Добавить" onPress={addPurchase} style={{ marginTop: 20 }} />
      <Button title="Назад" onPress={() => navigation.navigate('DataEntryTab')} style={{ marginTop: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
});

export default SetScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Button from './Comp/Button';
import { COLORS, SIZES, FONTS } from '../constants';
import { auth, database } from '../firebase';
import { ref, set, onValue, off } from 'firebase/database';


const DataEntryTab = ({ navigation }) => {
  const [purchases, setPurchases] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const userId = auth.currentUser.uid;

  useEffect(() => {
    // Получение данных из базы данных Firebase
    const purchasesRef = ref(database, `users/${userId}/historybuy`);
    onValue(purchasesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (Array.isArray(data)) {
          // Если данные являются массивом, установите его как список покупок
          setPurchases(data);
        } else {
          // Если данные являются объектом, преобразуйте их в массив и установите как список покупок
          const purchasesList = Object.values(data);
          setPurchases(purchasesList);
        }
      } else {
        // Если данных нет, установите пустой список покупок
        setPurchases([]);
      }
    });
  
    // Отписка от прослушивания изменений при размонтировании компонента
    return () => {
      off(purchasesRef);
    };
  }, []);

  const addPurchase = () => {
    const newPurchaseNumber = purchases.length + 1;
    const newPurchase = {
      id: `history${newPurchaseNumber}`,
      purchaseDate: '',
      category: '',
      itemName: '',
      cost: '',
    };

    // Добавление новой записи в базу данных Firebase
    const purchaseRef = ref(database, `users/${userId}/historybuy/history${newPurchaseNumber}`);
    set(purchaseRef, newPurchase);
  };

  const handleEdit = (item) => {
    setSelectedPurchase(item);
    // Навигация к экрану редактирования с передачей выбранной записи
    navigation.navigate('DeleteScreen', { purchase: item });
  };
  
  const handleDelete = (item) => {
    // Удаление записи из базы данных Firebase
    const purchaseRef = ref(database, `users/${userId}/historybuy/${item.id}`);
    set(purchaseRef, null);
  };

  const renderItem = ({ item }) => (
    <View key={item.id} style={styles.textContainer}>
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>Дата покупки: {item.purchaseDate}</Text>
        <Text style={styles.noteText}>Категория: {item.category}</Text>
        <Text style={styles.noteText}>Наименование: {item.itemName}</Text>
        <Text style={styles.noteText}>Стоимость: {item.cost}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Редактировать"
          onPress={() => handleEdit(item)}
          style={{ marginTop: 20}}
        />
        <Button
          title="Удалить"
          onPress={() => handleDelete(item)}
          style={{ marginTop: 20}}
          filled
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{ ...FONTS.h1, color: COLORS.primary, marginTop: 20 }}>История покупок</Text>

      <Button title="Добавить историю покупок" onPress={addPurchase} />

      <FlatList
        data={purchases}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  noteContainer: {
    width: '100%',
    backgroundColor: COLORS.gray,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    borderRadius: 12,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteText: {
    flex: 1,
    color: COLORS.primary,
    ...FONTS.body3,
    marginBottom: 10,
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
  textContainer: {
    width: '100%',
    backgroundColor: COLORS.gray,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    borderRadius: 12,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginVertical: 5,
  },
  borderContainer:{
    borderRadius: 12,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginVertical: 5,
  }
});

export default DataEntryTab;
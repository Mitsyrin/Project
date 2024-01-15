import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Button from './Comp/Button';
import { COLORS, SIZES, FONTS } from '../constants';
import { auth, database } from '../firebase';
import { ref, set } from 'firebase/database';

const DeleteScreen = ({ route, navigation }) => {
    const { purchase } = route.params;
  const [editedPurchase, setEditedPurchase] = useState({
    ...purchase,
    id: purchase.id, // Установка идентификатора записи
  });
  const userId = auth.currentUser.uid;

  const handleSave = () => {
    // Сохранение отредактированной записи в базе данных Firebase
    const purchaseRef = ref(database, `users/${userId}/historybuy/${editedPurchase.id}`);
    set(purchaseRef, editedPurchase);

    // Возврат на предыдущий экран
    navigation.goBack();
  };
  
    return (
        <View style={styles.container}>
        <Text style={{ ...FONTS.h1, color: COLORS.primary, marginTop: 20 }}>Редактирование записи</Text>
  
        <View style={styles.noteContainer}>
          <Text style={{ ...FONTS.h3, color: COLORS.primary }}>Дата покупки:</Text>
          <TextInput
            style={styles.input}
            value={editedPurchase.purchaseDate}
            onChangeText={(text) =>
              setEditedPurchase((prevPurchase) => ({ ...prevPurchase, purchaseDate: text }))
            }
          />
        </View>
        <View style={styles.noteContainer}>
          <Text style={{ ...FONTS.h3, color: COLORS.primary }}>Категория:</Text>
          <TextInput
            style={styles.input}
            value={editedPurchase.category}
            onChangeText={(text) =>
              setEditedPurchase((prevPurchase) => ({ ...prevPurchase, category: text }))
            }
          />
        </View>
        <View style={styles.noteContainer}>
          <Text style={{ ...FONTS.h3, color: COLORS.primary }}>Наименование:</Text>
          <TextInput
            style={styles.input}
            value={editedPurchase.itemName}
            onChangeText={(text) =>
              setEditedPurchase((prevPurchase) => ({ ...prevPurchase, itemName: text }))
            }
          />
        </View>
        <View style={styles.noteContainer}>
          <Text style={{ ...FONTS.h3, color: COLORS.primary }}>Стоимость:</Text>
          <TextInput
            style={styles.input}
            value={editedPurchase.cost}
            onChangeText={(text) =>
              setEditedPurchase((prevPurchase) => ({ ...prevPurchase, cost: text }))
            }
          />
        </View>
  
        <Button title="Сохранить" onPress={handleSave} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    noteContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      borderRadius: 12,
      borderColor: COLORS.primary,
      borderWidth: 1,
      marginVertical: 5,
      flexDirection: 'row',
    },
    noteText: {
      ...FONTS.body3,
      marginRight: 10,
    },
    input: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 8,
    },
  });

export default DeleteScreen
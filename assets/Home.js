import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, FONTS } from '../constants';
import { StyleSheet, Dimensions } from 'react-native';
import Button from './Comp/Button';
import { auth, database } from '../firebase';
import { ref, onValue, set, off } from 'firebase/database';

const Home = () => {
  const [balance, setBalance] = useState(0);
  const [newAmount, setNewAmount] = useState('');
  const [userData, setUserData] = useState(null);

  const fetchUserData = () => {
    const userId = auth.currentUser.uid;
    const userRef = ref(database, `users/${userId}`);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUserData(data);
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const userId = auth.currentUser.uid;

  useEffect(() => {
    const balanceRef = ref(database, 'users/' + userId + '/balance');
    onValue(balanceRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBalance(data);
      }
    });

    return () => {
      off(balanceRef);
    };
  }, []);

  const updateBalance = (amount) => {
    const updatedBalance = balance + amount;
    set(ref(database, 'users/' + userId + '/balance'), updatedBalance)
      .then(() => {
        console.log('Баланс успешно обновлен в Realtime Database');
      })
      .catch((error) => {
        console.error('Ошибка при обновлении баланса в Realtime Database:', error);
      });
  };

  const handleIncreaseBalance = () => {
    const amount = parseInt(newAmount, 10);
    if (!isNaN(amount) && amount > 0) {
      updateBalance(amount);
    }
    setNewAmount('');
  };

  const handleDecreaseBalance = () => {
    const amount = parseInt(newAmount, 10);
    if (!isNaN(amount) && amount > 0) {
      if (amount >= balance) {
        updateBalance(-balance);
      } else {
        updateBalance(-amount);
      }
    }
    setNewAmount('');
  };


  return (
    <View style={styles.container}>
      <Text style={{ ...FONTS.h1, color: COLORS.primary, marginTop: 20 }}>Главная</Text>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ ...FONTS.h2, color: COLORS.primary, marginTop: 20 }}>
          Добро пожаловать, {userData?.username}!
        </Text>
        <Text style={{ ...FONTS.h2, color: COLORS.primary, marginTop: 20 }}>
          Текущий баланс: {balance}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Введите сумму"
          value={newAmount}
          onChangeText={setNewAmount}
          keyboardType="numeric"
        />
        <Button
          title="Пополнить"
          filled
          style={{ width: '100%', marginVertical: 20 }}
          onPress={handleIncreaseBalance}
        />
        <Button
          title="Списать"
          style={{ width: '100%' }}
          onPress={handleDecreaseBalance}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  balanceText: {
    ...FONTS.body1,
    color: COLORS.primary,
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    width: '100%',
    backgroundColor: COLORS.gray,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    borderRadius: 12,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default Home;
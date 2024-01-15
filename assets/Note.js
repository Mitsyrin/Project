import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, FlatList, StyleSheet } from 'react-native';
import Button from './Comp/Button';
import { COLORS, SIZES, FONTS } from '../constants';
import { auth, database } from '../firebase';
import { ref, set, onValue, off } from 'firebase/database';

const Note = () => {
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([]);
  const userId = auth.currentUser.uid;

  useEffect(() => {
    // Получение данных заметок из Realtime Database
    const notesRef = ref(database, 'users/' + userId + '/notes');
    onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const notesList = Object.values(data);
        setNotes(notesList);
      }
    });

    // Отписка от прослушивания изменений при размонтировании компонента
    return () => {
      off(notesRef);
    };
  }, []);

  const addNote = () => {
    if (noteText) {
      const newNote = {
        id: Date.now().toString(),
        text: noteText,
      };
      setNotes([...notes, newNote]);
      setNoteText('');

      set(ref(database, 'users/' + userId + '/notes/' + newNote.id), newNote)
        .then(() => {
          console.log('Заметка успешно сохранена в Realtime Database');
        })
        .catch((error) => {
          console.error('Ошибка при сохранении заметки в Realtime Database:', error);
        });
    }
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    set(ref(database, 'users/' + userId + '/notes/' + id), null)
      .then(() => {
        console.log('Заметка успешно удалена из Realtime Database');
      })
      .catch((error) => {
        console.error('Ошибка при удалении заметки из Realtime Database:', error);
      });
  };

  const deleteItem = ({ item }) => (
    <View style={styles.noteContainer}>
      <Text style={styles.noteText}>{item.text}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Удалить" onPress={() => deleteNote(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{ ...FONTS.h1, color: COLORS.primary, marginTop: 20 }}>Заметки</Text>

      <TextInput
        style={styles.input}
        placeholder="Ввод"
        value={noteText}
        onChangeText={setNoteText}
      />
      <Button title="Сохранить запись" onPress={addNote} />

      <FlatList
        data={notes}
        renderItem={deleteItem}
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
  list: {
    flex: 1,
    marginTop: 10,
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
  },
  noteText: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default Note;
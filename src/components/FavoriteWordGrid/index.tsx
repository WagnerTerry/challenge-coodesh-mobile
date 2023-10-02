import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ScrollView, Button } from 'react-native';
import { IWord, useWordList } from '../../context/WordsContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Tts from 'react-native-tts';

export const FavoriteWordGrid = (props: any) => {

  const { words, removeWord } = useWordList()
  const [favorites, setFavorites] = useState([] as any);

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalWord, setModalWord] = useState([] as any);

  const favoriteWords = '@FavoriteWords'

  useEffect(() => {
    async function loadWords() {
      const favoritWords = await AsyncStorage.getItem(favoriteWords)

      if (favoritWords) {
        setFavorites(JSON.parse(favoritWords))

      }
    }
    Tts.setDefaultRate(0.5); // Velocidade da fala (0.5 é metade da velocidade normal)
    Tts.setDefaultPitch(1.0); // Tom da voz (1.0 é o tom padrão)
    loadWords()
    //loadMoreData();
  }, [favorites]);

  const speakText = (text: string) => {
    Tts.speak(text);
  };


  const addFavorites = async (word: IWord) => {
    try {
      const newWord = [...favorites, word]
      setFavorites(newWord)
      await AsyncStorage.setItem(favoriteWords, JSON.stringify(newWord))
    } catch(error){
      console.log("error saving word", error as string)
      throw new Error("An error occurred while saving word")
    }

  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openModalWithParam = (word: any) => {
    setModalWord(word); // Define o título do modal com o parâmetro
    toggleModal(); // Abre o modal
  };

  const removeFavoriteWord = async (id: string) => {
    try {
      const wordList = favorites.filter((word: any) => word.id !== id)
      setFavorites(wordList)
      await AsyncStorage.setItem(favoriteWords, JSON.stringify(wordList))
      // handleShowToast("Palavra removida")
    } catch (error) {
      console.log("Error removing word", error)
    }
  }

  const handleRemoveFavoriteWord = (id: string, word: string) => {
    Alert.alert(word, 'Deseja realmente excluir essa palavra', [
      {
        text: "Cancelar",
        onPress: () => { }
      },
      {
        text: "Excluir",
        onPress: () => removeFavoriteWord(id)
      }
    ])
  }

  return (
    <>
      <FlatList
        data={favorites}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => openModalWithParam(item)}
              onLongPress={() => handleRemoveFavoriteWord(item.id, item.word)}
            >
              <Text style={styles.truncatedText}>{item.word}</Text>

            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.1}
        columnWrapperStyle={styles.columnWrapper}
      />

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Icon
            name='close'
            size={40}
            onPress={toggleModal}
          />
          <ScrollView style={styles.scrollView}>

            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>{modalWord.word}</Text>
              <Text style={styles.modalText}>{modalWord && modalWord.phonetics && modalWord.phonetics[0].text && modalWord.phonetics[0].text}</Text>
            </View>
            <View>
              <Text style={styles.meaningsTitle}>Meanings</Text>
              {modalWord && modalWord.meanings && modalWord.meanings[0].definitions.map((meaning: any) => (
                <Text style={styles.meaningsText} key={`${modalWord.id}-${meaning.definition}`}>{meaning.definition}</Text>
              ))}
              <Button title="Reproduzir palavra" onPress={() => speakText(modalWord.word)} />
              <TouchableOpacity  onPress={() => addFavorites(modalWord)}>
                <Text style={styles.favorite}>Adicionar aos favoritos</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>

        </View>
      </Modal>

    </>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 0.5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnWrapper: {
    marginLeft: -5,
  },
  truncatedText: {
    fontSize: 18,
    maxWidth: '100%', // Define um tamanho máximo para o texto
    overflow: 'hidden', // Esconde o texto que ultrapassar o tamanho máximo
  },
  scrollView: {
    flex: 1
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    height: '70%',
  },
  modalContainer: {
    marginTop: 16,
    backgroundColor: '#efa8b4',
    padding: 16
  },
  modalText: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 16
  },

  meaningsTitle: {
    marginTop: 24,
    marginBottom: 16,
    fontSize: 30
  },
  meaningsText: {
    fontSize: 18,
    marginBottom: 16
  },
  favorite: {
    marginTop: 16,
    backgroundColor: '#e3d925',
    fontSize: 18,
    textAlign: 'center',
    color: '#902872',
    height: 30
  }

});

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ScrollView, Button } from 'react-native';
import { IWord, useWordList } from '../../context/WordsContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Tts from 'react-native-tts';
interface Item {
  id: string;
  text: string;
}

// const data = [
//   { id: '1', text: 'Item 1' },
//   { id: '2', text: 'Item 2' },
//   { id: '3', text: 'Item 3' },
//   // Adicione mais itens conforme necessário
// ];

export const GridText = (props: any) => {
  // Função para renderizar cada item da grade

  const { words, removeWord } = useWordList()
  // const [data, setData] = useState<Item[]>([])
  const [data, setData] = useState<IWord[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState([] as any);


  const [pageNumber, setPageNumber] = useState<number>(1);
  const itemsPerPage: number = 9;

  const storeWord = '@StoreWord'

  useEffect(() => {
    async function loadWords() {
      const wordList = await AsyncStorage.getItem(storeWord)
      if (wordList) {
        setData(JSON.parse(wordList))
      }
    }
    Tts.setDefaultRate(0.5); // Velocidade da fala (0.5 é metade da velocidade normal)
    Tts.setDefaultPitch(1.0); // Tom da voz (1.0 é o tom padrão)
    loadWords()
    //loadMoreData();
  }, [words]);

  const speakText = (text: string) => {
    Tts.speak(text);
  };

  // const loadMoreData = () => {
  //   setTimeout(() => {
  //     const newData: IWord[] = [
  //       ...teste,
  //       { id: `${teste.id}`, word: `Item ${pageNumber * itemsPerPage + 1}` },
  //     ];
  //     setTeste(newData);
  //     setPageNumber(pageNumber + 1);
  //   }, 1000);
  // };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  function showWord() {
    console.log("show word")
  }

  function addFavorites() {
    console.log("Add favorites")
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openModalWithParam = (word: any) => {
    setModalTitle(word); // Define o título do modal com o parâmetro
    toggleModal(); // Abre o modal
  };

  const handleRemoveTask = (id: string, word: string) => {
    Alert.alert(word, 'Deseja realmente excluir essa palavra', [
      {
        text: "Cancelar",
        onPress: () => { }
      },
      {
        text: "Excluir",
        onPress: () => removeWord(id)
      }
    ])
  }

  return (
    <>
      <FlatList
        data={props.wordList ? props.wordList : data}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => openModalWithParam(item)}
              onLongPress={() => handleRemoveTask(item.id, item.word)}
            >
              <Text style={styles.truncatedText}>{item.word}</Text>

            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        //onEndReached={loadMoreData}
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
              <Text style={styles.modalText}>{modalTitle.word}</Text>
              <Text style={styles.modalText}>{modalTitle && modalTitle.phonetics && modalTitle.phonetics[0].text && modalTitle.phonetics[0].text}</Text>
            </View>
            <View>
              <Text style={styles.meaningsTitle}>Meanings</Text>
              {modalTitle && modalTitle.meanings && modalTitle.meanings[0].definitions.map((meaning: any, idx: number) => (
                <Text style={styles.meaningsText} key={`${modalTitle.id}-${meaning.definition}`}>{meaning.definition}</Text>
              ))}
              <Button title="Reproduzir palavra" onPress={() => speakText(modalTitle.word)} />

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
  }
});

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { IWord, useWordList } from '../../context/WordsContext';
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const GridText = () => {
  // Função para renderizar cada item da grade

  const {words, removeWord} = useWordList()
  const [data, setData] = useState<Item[]>([]);
  const [teste, setTeste] = useState<IWord[]>([]);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const itemsPerPage: number = 9;

  const storeWord = '@StoreWord'

  useEffect(() => {
    async function loadWords() {
      const wordList = await AsyncStorage.getItem(storeWord)
      if (wordList) {
        setTeste(JSON.parse(wordList))
      }
    }
    loadWords()
    //loadMoreData();
  }, [words]);

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

  function showWord(){
    console.log("show word")
  }

  function addFavorites(){
    console.log("Add favorites")
  }

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
    <FlatList
      data={teste as unknown as IWord[]}
      numColumns={3}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => showWord()}
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
});

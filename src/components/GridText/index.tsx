import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

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

  const [data, setData] = useState<Item[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const itemsPerPage: number = 9;

  const loadMoreData = () => {
    setTimeout(() => {
      const newData: Item[] = [
        ...data,
        { id: `${pageNumber}-1`, text: `Item ${pageNumber * itemsPerPage + 1}` },
        { id: `${pageNumber}-2`, text: `Item ${pageNumber * itemsPerPage + 2}` },
        { id: `${pageNumber}-3`, text: `Item ${pageNumber * itemsPerPage + 3}` },
      ];
      setData(newData);
      setPageNumber(pageNumber + 1);
    }, 1000);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  function showWord(){
    console.log("show word")
  }

  function addFavorites(){
    console.log("Add favorites")
  }


  return (
    <FlatList
      data={data}
      numColumns={3}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => showWord()}
          onLongPress={() => addFavorites()}
          >
          <Text style={styles.truncatedText}>{truncateText(item.text, 20)}</Text>

          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item.id}
      onEndReached={loadMoreData}
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

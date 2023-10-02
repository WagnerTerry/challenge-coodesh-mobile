import { useEffect, useState } from 'react'
import { Alert, SafeAreaView, Text, TextInput, ToastAndroid, View, FlatList } from 'react-native'
import { styles } from '../../style/styles'
import { GridText } from '../../components/GridText'
import {  useWordList } from '../../context/WordsContext'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Favorites = () => {

  const [favoriteWords, setFavoritesWords] = useState('')

  const [loading, setLoading] = useState(false);
  const [errorAPI] = useState(null)


  const { words, addWord, removeAllWords } = useWordList()
  const favorites = '@FavoriteWords'


  useEffect(() => {
    async function loadWords() {
      const favorite = await AsyncStorage.getItem(favorites)

      if (favorite) {
        setFavoritesWords(JSON.parse(favorite))
      }
    }
    loadWords()
  }, [favoriteWords])

  const handleShowToast = (message: string) => {
    // Exibe uma mensagem de sucesso temporária
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG, // Duração da mensagem (LONG ou SHORT)
      ToastAndroid.BOTTOM, // Posição (TOP, BOTTOM, CENTER)
      25, // Deslocamento vertical em pixels
      50 // Deslocamento horizontal em pixels
    );
  }


  const clearWordList = () => {
    Alert.alert('Apagar lista', "Tem certeza de que deseja apagar a lista de palavras?", [
      {
        text: "Cancelar",
        onPress: () => { }
      }, {
        text: 'Excluir',
        onPress: () => removeAllWords()
      }
    ])
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerWithOutInput}>
          <Text style={styles.title}>Favorites</Text>
          <Icon
            name='delete'
            size={30}
            color="#eb1c1c"
            onPress={clearWordList}
          />
        </View>
        {/* <TextInput
          style={styles.input}
          placeholder='Search word'
          placeholderTextColor={'#b4bec7'}
          onChangeText={setWord}
          value={word}
          onBlur={() => searchWord(word)}
          editable={!loading}
        /> */}
        {loading ? (
          <Text style={styles.loadingText}>Buscando Palavra...</Text>
        ) : (
          <>
            {errorAPI ? (
              <Text>Erro ao buscar dados. Por favor, tente novamente mais tarde.</Text>
            ) : <View>
              <GridText favorites={favoriteWords}/>
            </View>}
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

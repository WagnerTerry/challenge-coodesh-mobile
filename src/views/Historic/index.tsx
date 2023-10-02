import { useState } from 'react'
import { Alert, SafeAreaView, Text, TextInput, ToastAndroid, View, FlatList } from 'react-native'
import { fetchWord } from '../../services/DictionaryService'
import { styles } from '../../style/styles'
import { GridText } from '../../components/GridText'
import {  useWordList } from '../../context/WordsContext'
import Icon from 'react-native-vector-icons/MaterialIcons'

export const Historic = () => {

  const [word, setWord] = useState('')
  const [loading, setLoading] = useState(false);
  const [errorAPI] = useState(null)

  const { words, addWord, removeAllWords } = useWordList()

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

  async function searchWord(text: string) {
    try {
      if (text.trim() === '') {
        Alert.alert("Campo vazio", "Por favor, busque por uma palavra")
        return;
      }
      setLoading(true)
      const newWord = await fetchWord(text)
      const checkRepeatedWord = words.filter((wordRepeated) => wordRepeated.word.toUpperCase() === text.toUpperCase())
      if(checkRepeatedWord.length > 0){
        Alert.alert('Palavra repetida', "Essa palavra já foi registrada")
        setLoading(false);
        setWord('')
        return;
      }
      const data = {
        id: String(new Date().getTime()),
        word: newWord[0].word,
        phonetics: newWord[0].phonetics,
        meanings: newWord[0].meanings

      }
      addWord(data)
      setWord('')
      setLoading(false);
      handleShowToast("Busca concluída")


    } catch (error) {
      console.log("error fetching word data", error)
      setLoading(false);
      handleShowToast("Ocorreu um erro ao buscar palavra, tente novamente mais tarde, ou verifique a internet")
    }
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
        <View style={styles.header}>
          <Text style={styles.title}>Historic</Text>
          {words.length > 0 && (
            <Icon
              name='delete'
              size={30}
              color="#eb1c1c"
              onPress={clearWordList}
            />
          )}
        </View>
        <TextInput
          style={styles.input}
          placeholder='Search word'
          placeholderTextColor={'#b4bec7'}
          onChangeText={setWord}
          value={word}
          onBlur={() => searchWord(word)}
          editable={!loading}
        />
        {loading ? (
          <Text style={styles.loadingText}>Buscando Palavra...</Text>
        ) : (
          <>
            {errorAPI ? (
              <Text>Erro ao buscar dados. Por favor, tente novamente mais tarde.</Text>
            ) : <View>
              <GridText />
            </View>}
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

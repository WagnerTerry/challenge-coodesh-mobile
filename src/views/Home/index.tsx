import { useState } from 'react'
import { SafeAreaView, Text, TextInput, ToastAndroid, View } from 'react-native'
import {fetchWord} from '../../services/DictionaryService'
import { styles } from './styles'

export const Home = () => {

  const [word, setWord] = useState('')
  const [loading, setLoading] = useState(false);
  const [errorAPI] = useState(null)

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

  async function searchWord(text: string){
    try {
      setLoading(true)
      const word = await fetchWord(text)
     console.log("aee", word)
     // setWord(word)
     setLoading(false);
     handleShowToast("Busca concluída")


    } catch(error){
      console.log("error fetching word data", error)
      setLoading(false);
      handleShowToast("Ocorreu um erro ao buscar palavra, verifique a internet")
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Word list</Text>
        {/* <View>
          <Text></Text>
        </View> */}
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
          <Text style={styles.loadingText}>Carregando Tarefa...</Text>
        ) : (
          <>
            {errorAPI && (
              <Text>Erro ao buscar dados. Por favor, tente novamente mais tarde.</Text>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

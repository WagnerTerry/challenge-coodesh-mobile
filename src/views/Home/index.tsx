import { useState } from 'react'
import { SafeAreaView, Text, TextInput, View } from 'react-native'
import {fetchWord} from '../../services/DictionaryService'
import { styles } from './styles'

export const Home = () => {

  const [word, setWord] = useState('')

  async function searchWord(text: string){
     const word = await fetchWord(text)
    console.log("aee", word)
    // setWord(word)
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
        />
      </View>
    </SafeAreaView>
  )
}

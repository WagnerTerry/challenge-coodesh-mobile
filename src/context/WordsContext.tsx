import React, { useContext, useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IProps {
  children: React.ReactElement
}

export interface IWord {
  id?: string;
  word: string;
  phonetics: [];
  meanings: []
}

export interface IWordsContext {
  words: IWord[];
  addWord(word: IWord): void;
  removeWord(id: string): void;
  removeAllWords(): void;
}

const storeWord = '@StoreWord'

export const WordsContext = React.createContext<IWordsContext>({} as IWordsContext)

export const WordsProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const [data, setData] = useState<IWord[]>([])

  useEffect(() => {
    async function loadWords() {
      const wordList = await AsyncStorage.getItem(storeWord)

      if (wordList) {
        setData(JSON.parse(wordList))
      }
    }
    loadWords()
  }, [])

  const addWord = async (word: IWord) => {
    try {
      const newWord = [...data, word]
      setData(newWord)
      await AsyncStorage.setItem(storeWord, JSON.stringify(newWord))
    } catch (error) {
      console.log("error saving word", error as string)
      throw new Error("An error occurred while saving word")
    }

  }

  const removeWord = async (id: string) => {
    try {
      const wordList = data.filter((word: any) => word.id !== id)
      setData(wordList)
      await AsyncStorage.setItem(storeWord, JSON.stringify(wordList))
      handleShowToast("Palavra removida")
    } catch (error) {
      console.log("Error removing word", error)
    }
  }

  const removeAllWords = async () => {
    try {
      await AsyncStorage.setItem(storeWord, JSON.stringify([]))
      setData([])
      handleShowToast("Palavras removidas")
    } catch (error) {
      console.log("Error removing all list", error)
    }
  }

  const handleShowToast = (message: string) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  }


  return (
    <WordsContext.Provider value={{
      words: data, addWord, removeWord, removeAllWords
    }}
    >
      {children}
    </WordsContext.Provider>
  )
}

export function useWordList(): IWordsContext {
  const context = useContext(WordsContext)

  if (!context) {
    console.log("error: useWordList must be used in a WordsProvider")
    throw new Error("useWordList must be used in a WordsProvider")
  }

  return context
}

import React, { useContext, useEffect, useState } from 'react'
import { ToastAndroid } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

interface IProps {
  children: React.ReactElement
}

export interface IWord {
  id: string;
  word: string;
  phonetics: [];
  meanings: []
}

export interface IWordsContext {
  words: IWord[];
  addWord(word: IWord): void;
  // removeTask(id: string): void;
  // completeTask(id: string): void;
  // removeAllTasks(): void;
}

const storeWord = '@StoreWord'

export const WordsContext = React.createContext<IWordsContext>({} as IWordsContext)

export const WordsProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const [data, setData] = useState([] as any)

  useEffect(() => {
    async function loadWords() {
      const wordList = await AsyncStorage.getItem(storeWord)
      console.log("aaaa", wordList)

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

  // const removeTask = async (id: string) => {
  //   try {
  //     const newTaskList = data.filter((task) => task.id !== id)
  //     setData(newTaskList)
  //     await AsyncStorage.setItem(tasksData, JSON.stringify(newTaskList))
  //     handleShowToast("Tarefa removida")
  //   } catch (error) {
  //     console.log("Error removing task", error)
  //   }
  // }

  // const removeAllTasks = async () => {
  //   try {
  //     await AsyncStorage.setItem(tasksData, JSON.stringify([]))
  //     setData([])
  //     handleShowToast("Lista apagada")
  //   } catch (error) {
  //     console.log("Error removing all list", error)
  //   }
  // }

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
      words: data, addWord
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

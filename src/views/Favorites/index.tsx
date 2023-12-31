import { useEffect, useState } from 'react'
import { Alert, SafeAreaView, Text, View } from 'react-native'
import { styles } from '../../style/styles'
import { IWord, useWordList } from '../../context/WordsContext'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FavoriteWordGrid } from '../../components/FavoriteWordGrid'

export const Favorites = () => {

  const { handleShowToast } = useWordList()

  const [favorites, setFavorites] = useState<IWord[]>([])

  const [loading, setLoading] = useState(false);
  const [errorAPI] = useState(null)

  const favoriteWords = '@FavoriteWords'

  useEffect(() => {
    async function loadWords() {
      const favorite = await AsyncStorage.getItem(favoriteWords)

      if (favorite) {
        setFavorites(JSON.parse(favorite))
      }
    }
    loadWords()
  }, [])

  const removeAllFavoriteWords = async () => {
    try {
      await AsyncStorage.setItem(favoriteWords, JSON.stringify([]))
      setFavorites([])
      handleShowToast("Favoritos removidos")
    } catch (error) {
      console.log("Error removing all list", error)
    }
  }

  const clearFavorites = () => {
    Alert.alert('Apagar lista de favoritos', "Tem certeza de que deseja apagar os favoritos?", [
      {
        text: "Cancelar",
        onPress: () => { }
      }, {
        text: 'Excluir',
        onPress: () => removeAllFavoriteWords()
      }
    ])
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerWithOutInput}>
          <Text style={styles.title}>Favorites</Text>
          {favorites.length > 0 && (
            <Icon
              name='delete'
              size={30}
              color="#eb1c1c"
              onPress={clearFavorites}
            />
          )}
        </View>
        {loading ? (
          <Text style={styles.loadingText}>Buscando Palavra...</Text>
        ) : (
          <>
            {errorAPI ? (
              <Text>Erro ao buscar dados. Por favor, tente novamente mais tarde.</Text>
            ) :
              <FavoriteWordGrid />
            }
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

// RN
import { Text, View, Image, ScrollView, TextInput, Pressable } from 'react-native'
// Libs
import axios from 'axios'
import * as Progress from 'react-native-progress'
// React
import { useState, useEffect } from 'react'
// Expo
import { router } from 'expo-router'
// Utils
import { Movie } from '../../utils/types/movie'
import { default_not_found_image } from '../../utils/general'

export default function Movies() {

  const [movies, setMovies] = useState<Movie[] | null>(null)

  const getMovies = async()=> {
    try{
      const res = await axios.get(`https://api.potterdb.com/v1/movies?page[size]=25`)
      setMovies(res.data.data)
    }catch(error){
      console.log('Error while accessing Potter API', error)
    }
  }

  useEffect(()=> {
    getMovies()
  }, [])

  return (
  <View className={'flex-1 px-4'}>
    {movies ? 
    
      <ScrollView>
        {movies.map((character)=> (
        <Pressable key={character.id}onPress={()=> router.push(`/movie/${character.id}`)}>
          <View className={'flex-row items-center gap-4 py-3'}>
            <Image className={'rounded-sm'} 
              source={{uri: character.attributes.poster ?? default_not_found_image}}
              height={80} 
              width={50}/>
            <Text>{character.attributes.title}</Text>
          </View>
        </Pressable>))}
      </ScrollView>
       
      :

      <View className={'flex-row justify-center h-44 items-center'}>
        <Progress.Circle size={30} color={'#eeba30'} borderWidth={3} indeterminate={true} />
      </View>
    }

  </View>)
}
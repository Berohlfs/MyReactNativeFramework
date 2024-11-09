// RN
import { Text, View, Image, ScrollView, TextInput, Pressable } from 'react-native'
// Libs
import axios from 'axios'
import * as Progress from 'react-native-progress'
import dayjs from 'dayjs'
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
        {movies.map((movie)=> (
        <Pressable key={movie.id}onPress={()=> router.push(`/movie/${movie.id}`)}>
          <View className={'flex-row items-center gap-4 py-3'}>
            <Image className={'rounded-sm'} 
              source={{uri: movie.attributes.poster ?? default_not_found_image}}
              height={80} 
              width={50}/>
            <View className={'w-9/12'}>
              <Text numberOfLines={1} className={'truncate font-bold text-lg'}>{movie.attributes.title}</Text>
              <Text>{dayjs(movie.attributes.release_date).format('MM/DD/YYYY')}</Text>
            </View>
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
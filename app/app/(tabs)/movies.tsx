// RN
import { Image, ScrollView, Pressable } from 'react-native'
// Libs
import axios from 'axios'
import dayjs from 'dayjs'
// React
import { useState, useEffect } from 'react'
// Expo
import { router } from 'expo-router'
// Utils
import { Movie } from '../../utils/types/movie'
import { default_not_found_image } from '../../utils/general'
// Components
import { CustomView, CustomText, CircularProgressView } from '../../components'

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
  <CustomView className={'px-4'}>
    {movies ? 
    
      <ScrollView>
        {movies.map((movie)=> (
        <Pressable key={movie.id}onPress={()=> router.push(`/movie/${movie.id}`)}>
          <CustomView className={'flex-row items-center gap-4 py-3'}>
            <Image className={'rounded-sm'} 
              source={{uri: movie.attributes.poster ?? default_not_found_image}}
              height={80} 
              width={50}/>
            <CustomView className={'w-9/12'}>
              <CustomText numberOfLines={1} className={'truncate font-bold text-lg'}>{movie.attributes.title}</CustomText>
              <CustomText>{dayjs(movie.attributes.release_date).format('MM/DD/YYYY')}</CustomText>
            </CustomView>
          </CustomView>
        </Pressable>))}
      </ScrollView>
       
      :

      <CircularProgressView/>
    }

  </CustomView>)
}
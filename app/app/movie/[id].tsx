// RN
import { Text, View, Image, ScrollView } from 'react-native'
// Libs
import axios from 'axios'
import * as Progress from 'react-native-progress'
import dayjs from 'dayjs'
// React
import { useState, useEffect } from 'react'
// Expo
import { useLocalSearchParams, Link } from 'expo-router'
// Utils
import { default_not_found_image } from '../../utils/general'
import { Movie, MovieAttributes } from '../../utils/types/movie'

export default function MovieInfo() {

  const {id} = useLocalSearchParams()

  const ordered_wanted_attr: (keyof MovieAttributes)[] = [
    "box_office",
    "budget",
    //"cinematographers",
    //"directors",
    //"distributors",
    //"editors",
    //"music_composers",
    //"producers",
    "rating",
    "running_time",
    //"screenwriters",
    "summary",
    "trailer",
    "wiki",
  ]

  const [movie, setMovie] = useState<Movie | null>(null)

  const getMovie = async()=> {
    try{
      const res = await axios.get(`https://api.potterdb.com/v1/movies/${id}`)
      setMovie(res.data.data)
    }catch(error){
      console.log('Error while accessing Potter API', error)
    }
  }

  useEffect(()=> {
    getMovie()
  }, [])

  return (
  <View className={'flex-1 pt-8 px-5 flex-col justify-center items-center'}>
    {movie?.attributes ? <>
    
      <Image className={'rounded-md'} 
        source={{uri: movie?.attributes.poster ?? default_not_found_image}}
        height={250} 
        width={150}/>

      <Text className={'text-xl pt-6 font-bold text-center px-5'}>{movie.attributes.title}</Text>
      <Text className={'pb-6 text-center'}>{dayjs(movie.attributes.release_date).format('MM/DD/YYYY')}</Text>

      <View className="h-[1px] bg-gray-200 w-full" />

      <ScrollView className={'w-full px-2'}>

        <View className={'flex-col gap-4 py-4'}>

          {ordered_wanted_attr.filter((attr)=> movie.attributes[attr]).map(attr => (
            <View key={attr} className="p-4 bg-white rounded-lg shadow-lg w-full">
              <Text className="text-md pb-1 font-semibold">{attr.toUpperCase().replaceAll('_', ' ')}</Text>
              
              {(attr === 'wiki' || attr === 'trailer') ? 
              <Link className={'text-blue-700'} href={movie.attributes[attr]!}>{movie.attributes[attr]}</Link> : 
              <Text className="text-gray-500">{movie.attributes[attr]}</Text>}
            </View>
          ))}

        </View>

      </ScrollView>
    
    </> :
    
    <View className={'flex-row justify-center h-44 items-center'}>
        <Progress.Circle size={30} color={'#eeba30'} borderWidth={3} indeterminate={true} />
    </View>}
  </View>)
}
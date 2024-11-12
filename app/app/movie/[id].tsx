// RN
import { Image } from 'react-native'
// Libs
import axios from 'axios'
import dayjs from 'dayjs'
// React
import { useState, useEffect } from 'react'
// Expo
import { useLocalSearchParams } from 'expo-router'
// Utils
import { default_not_found_image } from '../../utils/general'
import { Movie, MovieAttributes } from '../../utils/types/movie'
// Components
import { CustomView, CustomText, Divider, CircularProgressView } from '../../components/generic'
import { EntityAttributesList } from '../../components/pages'

export default function MovieInfo() {

  const {id} = useLocalSearchParams()

  const ordered_wanted_attr: (keyof MovieAttributes)[] = [
    "box_office",
    "budget",
    "rating",
    "running_time",
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
  <CustomView className={'flex-1 pt-8 px-5 flex-col justify-center items-center'}>
    {movie?.attributes ? <>
    
      <Image className={'rounded-md'} 
        source={{uri: movie?.attributes.poster ?? default_not_found_image}}
        height={250} 
        width={150}/>

      <CustomText className={'text-xl pt-6 font-bold text-center px-5'}>{movie.attributes.title}</CustomText>
      <CustomText className={'pb-6 text-center'}>{dayjs(movie.attributes.release_date).format('MM/DD/YYYY')}</CustomText>

      <Divider/>

      <EntityAttributesList
        entity={movie} 
        attribute_list={ordered_wanted_attr}/>
    
    </> :
    
    <CircularProgressView/>}
  </CustomView>)
}
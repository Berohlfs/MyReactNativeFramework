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
import { Book, BookAttributes } from '../../utils/types/book'
// Components
import { CustomView, CustomText, Divider, CircularProgressView } from '../../components/generic'
import { EntityAttributesList } from '../../components/pages'

export default function BookInfo() {

  const {id} = useLocalSearchParams()

  const ordered_wanted_attr: (keyof BookAttributes)[] = [
    "author",
    "pages",
    "summary",
    "dedication",
    "wiki"
  ]

  const [book, setBook] = useState<Book | null>(null)

  const getBook = async()=> {
    try{
      const res = await axios.get(`https://api.potterdb.com/v1/books/${id}`)
      setBook(res.data.data)
    }catch(error){
      console.log('Error while accessing Potter API', error)
    }
  }

  useEffect(()=> {
    getBook()
  }, [])

  return (
  <CustomView className={'pt-8 px-5 flex-col justify-center items-center'}>
    {book?.attributes ? <>
    
      <Image className={'rounded-md'} 
        source={{uri: book?.attributes.cover ?? default_not_found_image}}
        height={250} 
        width={150}/>

      <CustomText className={'text-xl pt-6 font-bold text-center px-5'}>{book.attributes.title}</CustomText>
      <CustomText className={'pb-6 text-center'}>{dayjs(book.attributes.release_date).format('MM/DD/YYYY')}</CustomText>

      <Divider/>

      <EntityAttributesList 
        entity={book} 
        attribute_list={ordered_wanted_attr}/>
    
    </> :
    
    <CircularProgressView/>}
  </CustomView>)
}
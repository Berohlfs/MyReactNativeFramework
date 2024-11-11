// RN
import { Image, ScrollView } from 'react-native'
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
import { CustomView, CustomText, CircularProgressView, Divider, CustomLink } from '../../components'

export default function BookInfo() {

  const {id} = useLocalSearchParams()

  const ordered_wanted_attr: (keyof BookAttributes)[] = [
    "wiki",
    "author",
    "pages",
    "summary",
    "dedication"
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

      <ScrollView className={'w-full px-2'}>

        <CustomView className={'flex-col gap-4 py-4'}>

          {ordered_wanted_attr.filter((attr)=> book.attributes[attr]).map(attr => (
            <CustomView key={attr} paper={true} className="p-4">
              <CustomText className="text-md pb-1 font-semibold">{attr.toUpperCase().replaceAll('_', ' ')}</CustomText>
              {attr === 'wiki' ? 
              <CustomLink href={book.attributes[attr]!}>{book.attributes[attr]}</CustomLink> : 
              <CustomText className="text-gray-500">{book.attributes[attr]}</CustomText>}
            </CustomView>
          ))}

        </CustomView>

      </ScrollView>
    
    </> :
    
    <CircularProgressView/>}
  </CustomView>)
}
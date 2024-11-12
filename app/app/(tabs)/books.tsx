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
import { Book } from '../../utils/types/book'
// Components
import { CustomView, CustomText, CircularProgressView } from '../../components/generic'

export default function Books() {

  const [books, setBooks] = useState<Book[] | null>(null)

  const getBooks = async()=> {
    try{
      const res = await axios.get(`https://api.potterdb.com/v1/books?page[size]=25`)
      setBooks(res.data.data)
    }catch(error){
      console.log('Error while accessing Potter API', error)
    }
  }

  useEffect(()=> {
    getBooks()
  }, [])

  return (
  <CustomView className={'px-4'}>
    {books ? 
    
      <ScrollView>
        {books.map((book)=> (
        <Pressable key={book.id}onPress={()=> router.push(`/book/${book.id}`)}>
          <CustomView className={'flex-row items-center gap-4 py-3'}>
            <Image className={'rounded-sm'} 
              source={{uri: book.attributes.cover}}
              height={80} 
              width={50}/>
            <CustomView className={'w-9/12'}>
              <CustomText numberOfLines={1} className={'truncate font-bold text-lg'}>{book.attributes.title}</CustomText>
              <CustomText secondary={true}>
                {dayjs(book.attributes.release_date).format('MM/DD/YYYY')}
              </CustomText>
              <CustomText secondary={true}>
                {book.attributes.pages} pages
              </CustomText>
            </CustomView>
          </CustomView>
        </Pressable>))}
      </ScrollView>
       
      :

      <CircularProgressView/>
    }

  </CustomView>)
}
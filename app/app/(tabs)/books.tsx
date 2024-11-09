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
import { Book } from '../../utils/types/book'

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
  <View className={'flex-1 px-4'}>
    {books ? 
    
      <ScrollView>
        {books.map((book)=> (
        <Pressable key={book.id}onPress={()=> router.push(`/book/${book.id}`)}>
          <View className={'flex-row items-center gap-4 py-3'}>
            <Image className={'rounded-sm'} 
              source={{uri: book.attributes.cover}}
              height={80} 
              width={50}/>
            <View className={'w-9/12'}>
              <Text numberOfLines={1} className={'truncate font-bold text-lg'}>{book.attributes.title}</Text>
              <Text>{dayjs(book.attributes.release_date).format('MM/DD/YYYY')}</Text>
              <Text>{book.attributes.pages} pages</Text>
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
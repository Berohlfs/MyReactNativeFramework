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
        {books.map((character)=> (
        <Pressable key={character.id}onPress={()=> router.push(`/book/${character.id}`)}>
          <View className={'flex-row items-center gap-4 py-3'}>
            <Image className={'rounded-sm'} 
              source={{uri: character.attributes.cover}}
              height={80} 
              width={50}/>
            <View>
              <Text>{character.attributes.title}</Text>
              <Text>{character.attributes.release_date}</Text>
              <Text>{character.attributes.pages} pages</Text>
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
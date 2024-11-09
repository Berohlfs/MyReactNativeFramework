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
import { Book, BookAttributes } from '../../utils/types/book'

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
  <View className={'flex-1 pt-8 px-5 flex-col justify-center items-center'}>
    {book?.attributes ? <>
    
      <Image className={'rounded-md'} 
        source={{uri: book?.attributes.cover ?? default_not_found_image}}
        height={250} 
        width={150}/>

      <Text className={'text-xl pt-6 font-bold text-center px-5'}>{book.attributes.title}</Text>
      <Text className={'pb-6 text-center'}>{dayjs(book.attributes.release_date).format('MM/DD/YYYY')}</Text>

      <View className="h-[1px] bg-gray-200 w-full" />

      <ScrollView className={'w-full px-2'}>

        <View className={'flex-col gap-4 py-4'}>

          {ordered_wanted_attr.filter((attr)=> book.attributes[attr]).map(attr => (
            <View key={attr} className="p-4 bg-white rounded-lg shadow-lg w-full">
              <Text className="text-md pb-1 font-semibold">{attr.toUpperCase().replaceAll('_', ' ')}</Text>
              {attr === 'wiki' ? 
              <Link className={'text-blue-700'} href={book.attributes[attr]!}>{book.attributes[attr]}</Link> : 
              <Text className="text-gray-500">{book.attributes[attr]}</Text>}
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
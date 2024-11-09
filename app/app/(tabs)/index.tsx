// RN
import { Text, View, Image, ScrollView, TextInput, Pressable } from 'react-native'
// Libs
import axios from 'axios'
import { debounce } from 'lodash'
import * as Progress from 'react-native-progress'
// React
import { useState, useEffect } from 'react'
// Expo
import { router } from 'expo-router'
// Utils
import { default_profile_picture } from '../../utils/general'
import { Character } from '../../utils/types/character'

export default function Characters() {

  const [characters, setCharacters] = useState<Character[] | null>(null)

  const getCharacters = async(search?: string)=> {
    try{
      setCharacters(null)
      const res = await axios.get(`https://api.potterdb.com/v1/characters?${search ? `filter[name_cont]=${search}` : ''}&page[size]=25&sort=patronus`)
      setCharacters(res.data.data)
    }catch(error){
      console.log('Error while accessing Potter API', error)
    }
  }

  const debouncedGetCharacters = debounce((value: string)=> getCharacters(value), 700)

  useEffect(()=> {
    getCharacters()
  }, [])

  return (
  <View className={'flex-1 pt-4 px-4'}>
    <View className={'flex-row p-1 border border-gray-300 rounded-md items-center'}>
      <TextInput className={'w-11/12 p-2'}
        placeholder={"Search by character's name"}
        onChangeText={(value)=> debouncedGetCharacters(value)}/>
    </View>

    <View className="h-[1px] bg-gray-300 mt-4" />

    {characters ? 
    
      <ScrollView>
        {characters.map((character)=> (
        <Pressable key={character.id}onPress={()=> router.push(`/character/${character.id}`)}>
          <View className={'flex-row items-center gap-4 py-3'}>
            <Image className={'rounded-full'} 
              source={{uri: character.attributes.image ?? default_profile_picture}}
              height={50} 
              width={50}/>
            <View className={'w-8/12'}>
              <Text numberOfLines={1} className={'truncate font-bold text-lg'}>{character.attributes.name}</Text>
              <Text numberOfLines={1} className={'text-base truncate'}>{character.attributes.species ?? 'Unknown species'}</Text>
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
// RN
import { Image, ScrollView, Pressable } from 'react-native'
// Libs
import axios from 'axios'
import { debounce } from 'lodash'
// React
import { useState, useEffect } from 'react'
// Expo
import { router } from 'expo-router'
// Utils
import { default_profile_picture } from '../../utils/general'
import { Character } from '../../utils/types/character'
// Components
import { CustomView, CustomText, Divider, CustomTextInput, CircularProgressView } from '../../components'

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
  <CustomView className={'pt-4 px-4'}>

    <CustomTextInput
      placeholder={"Search by character's name"}
      onChangeText={(value)=> debouncedGetCharacters(value)}/>

    <Divider className={'mt-3'}/>

    {characters ? 
    
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        {characters.map((character)=> (
        <Pressable key={character.id}onPress={()=> router.push(`/character/${character.id}`)}>
          <CustomView className={'flex-row items-center gap-4 py-3'}>
            <Image className={'rounded-full'} 
              source={{uri: character.attributes.image ?? default_profile_picture}}
              height={50} 
              width={50}/>
            <CustomView className={'w-8/12'}>
              <CustomText numberOfLines={1} className={'truncate font-bold text-lg'}>{character.attributes.name}</CustomText>
              <CustomText numberOfLines={1} className={'text-base truncate'}>{character.attributes.species ?? 'Unknown species'}</CustomText>
            </CustomView>
          </CustomView>
        </Pressable>))}
      </ScrollView>
       
      :

      <CircularProgressView/>
    }

  </CustomView>)
}
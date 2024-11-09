// RN
import { Text, View, Image, ScrollView } from 'react-native'
// Libs
import axios from 'axios'
import * as Progress from 'react-native-progress'
// React
import { useState, useEffect } from 'react'
// Expo
import { useLocalSearchParams, Link } from 'expo-router'
// Utils
import { default_profile_picture } from '../../utils/general'
import { CharacterAttributes, Character } from '../../utils/types/character'

export default function CharacterInfo() {

  const {id} = useLocalSearchParams()

  const ordered_wanted_attr: (keyof CharacterAttributes)[] = [
    "wiki",
    "born",
    "died",
    "animagus",
    "blood_status",
    "boggart",
    "eye_color",
    "gender",
    "hair_color",
    "height",
    "house",
    "marital_status",
    "nationality",
    "patronus",
    "species",
    "weight"
  ]

  const [character, setCharacter] = useState<Character | null>(null)

  const getCharacter = async()=> {
    try{
      const res = await axios.get(`https://api.potterdb.com/v1/characters/${id}`)
      setCharacter(res.data.data)
    }catch(error){
      console.log('Error while accessing Potter API', error)
    }
  }

  useEffect(()=> {
    getCharacter()
  }, [])

  return (
  <View className={'flex-1 pt-8 px-5 flex-col justify-center items-center'}>
    {character?.attributes ? <>
    
      <Image className={'rounded-full'} 
        source={{uri: character?.attributes.image ?? default_profile_picture}}
        height={150} 
        width={150}/>

      <Text className={'text-2xl py-6 font-bold text-center'}>{character.attributes.name}</Text>

      <View className="h-[1px] bg-gray-200 w-full" />

      <ScrollView className={'w-full px-2'}>

        <View className={'flex-col gap-4 py-4'}>

          {ordered_wanted_attr.filter((attr)=> character.attributes[attr]).map(attr => (
            <View key={attr} className="p-4 bg-white rounded-lg shadow-lg w-full">
              <Text className="text-lg font-semibold">{attr.toUpperCase().replaceAll('_', ' ')}</Text>
              {attr === 'wiki' ? 
              <Link className={'text-blue-700'} href={character.attributes[attr]!}>{character.attributes[attr]}</Link> : 
              <Text className="text-gray-500">{character.attributes[attr]}</Text>}
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
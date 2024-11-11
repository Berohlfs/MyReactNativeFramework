// RN
import { Image, ScrollView } from 'react-native'
// Libs
import axios from 'axios'
// React
import { useState, useEffect } from 'react'
// Expo
import { useLocalSearchParams } from 'expo-router'
// Utils
import { default_profile_picture } from '../../utils/general'
import { CharacterAttributes, Character } from '../../utils/types/character'
// Components
import { CustomView, CustomText, Divider, CircularProgressView, CustomLink } from '../../components'

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
  <CustomView className={'pt-8 px-5 flex-col justify-center items-center'}>
    {character?.attributes ? <>
    
      <Image className={'rounded-full'} 
        source={{uri: character?.attributes.image ?? default_profile_picture}}
        height={120} 
        width={120}/>

      <CustomText className={'text-xl pt-6 font-bold text-center px-5'}>{character.attributes.name}</CustomText>
      <CustomText className={'pb-6 text-center'}>{character.attributes.species ?? 'Unkown species'}</CustomText>

      <Divider/>

      <ScrollView className={'w-full px-2'}>

        <CustomView className={'flex-col gap-4 py-4'}>

          {ordered_wanted_attr.filter((attr)=> character.attributes[attr]).map(attr => (
            <CustomView key={attr} paper={true} className="p-4">
              <CustomText className="text-md pb-1 font-semibold">{attr.toUpperCase().replaceAll('_', ' ')}</CustomText>
              {attr === 'wiki' ? 
              <CustomLink href={character.attributes[attr]!}>{character.attributes[attr]}</CustomLink> : 
              <CustomText className="text-gray-500">{character.attributes[attr]}</CustomText>}
            </CustomView>
          ))}

        </CustomView>

      </ScrollView>
    
    </> :
    
    <CircularProgressView/>}

  </CustomView>)
}
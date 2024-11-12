// RN
import { ScrollView, Text, View } from "react-native"
// Components
import { CustomView, CustomLink, CustomText, Divider, CustomIcon } from "../generic"

type Props = {
    attribute_list: (string | 'wiki' | 'trailer')[]
    entity: {
        attributes: {[key: string]: string | number | null | string[]}
    }
}

export const EntityAttributesList = ({attribute_list, entity}: Props)=> {
    return (
    <ScrollView className={'w-full'}>

        <CustomView className={'flex-col py-4 px-3'}>

          {attribute_list.filter((attr)=> entity.attributes[attr]).map(attr => (
            <CustomView key={attr}>
              <View className={'flex-row gap-2 items-center'}>
                <CustomIcon name={'circle'} size={5} color={'secondary'} />
                <CustomText  className="text-md pb-1 font-semibold">{attr.toUpperCase().replaceAll('_', ' ')}</CustomText>
              </View>
              
              {(attr === 'wiki' || attr === 'trailer') ? 

              <CustomLink href={entity.attributes[attr] as string}>{entity.attributes[attr]}</CustomLink> 
              :
              <CustomText secondary={true}>{entity.attributes[attr]}</CustomText>}

              <Divider className={'my-4'}/>
            </CustomView>
          ))}

        </CustomView>

    </ScrollView>
    )
}
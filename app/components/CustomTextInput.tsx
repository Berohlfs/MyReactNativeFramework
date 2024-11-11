// RN
import { TextInput, TextInputProps, View } from "react-native"
// Styling
import { useColorScheme } from "nativewind"
import { colors } from "../theme/colors"

export const CustomTextInput = ({ ...other}: TextInputProps)=> {

    const { colorScheme } = useColorScheme()

    const textColor = colorScheme === 'dark' ? colors.text.dark : colors.text.light

    return (
        <View className={`flex-row p-1 border border-divider-light dark:border-divider-dark rounded-md items-center`}>
            <TextInput className={'w-11/12 p-2 text-text-light dark:text-text-dark'}
                {...other}
                placeholderTextColor={textColor}/>
        </View>
    )
}
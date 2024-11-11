// Libs
import * as Progress from 'react-native-progress'
// Components
import { CustomView } from './CustomView'
// Styling
import { useColorScheme } from "nativewind"
import { colors } from "../theme/colors"

export const CircularProgressView = ()=> {

    const { colorScheme } = useColorScheme()

    const secondaryColor = colorScheme === 'dark' ? colors.secondary.dark : colors.secondary.light

    return (
        <CustomView className={'justify-center items-center'}>
            <Progress.Circle size={30} color={secondaryColor} borderWidth={3} indeterminate={true} />
        </CustomView>
    )
}


// Expo
import { MaterialIcons } from '@expo/vector-icons'
// Styling
import { useColorScheme } from 'nativewind'
// Utils
import { colors } from '../../theme/colors'

type Props = {
    name: string
    size?: number
    color: keyof (typeof colors)
}

export const CustomIcon = ({name, size, color}: Props)=> {

    const { colorScheme } = useColorScheme()

    return (
        <MaterialIcons 
            size={size ?? 28} 
            name={name as any} 
            color={colors[color][colorScheme ?? 'light']}/>
        )
}
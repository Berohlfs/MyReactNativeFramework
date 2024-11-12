// RN
import { View, ViewProps } from "react-native"

export const Divider = ({ className, ...other}: ViewProps)=> {
    return (
        <View 
            {...other} 
            className={`h-[1px] bg-divider-light dark:bg-divider-dark w-full ${className}`}>
        </View>
    )
}
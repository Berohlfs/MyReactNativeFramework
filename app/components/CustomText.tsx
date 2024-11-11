// RN
import { Text, TextProps } from "react-native"
// React
import { ReactNode } from "react"

interface Props extends TextProps {
    children: ReactNode
}

export const CustomText = ({children, className, ...other}: Props)=> {
    return (
        <Text 
            {...other} 
            className={`text-text-light dark:text-text-dark ${className}`}>
            {children}
        </Text>
    )
}
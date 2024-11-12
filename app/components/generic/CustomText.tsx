// RN
import { Text, TextProps } from "react-native"
// React
import { ReactNode } from "react"

interface Props extends TextProps {
    children: ReactNode
    secondary?: true
}

export const CustomText = ({secondary, children, className, ...other}: Props)=> {
    return (
        <Text 
            {...other} 
            className={`text-text-light dark:text-text-dark ${secondary ? 'text-text2-light dark:text-text2-dark' : ''} ${className}`}>
            {children}
        </Text>
    )
}
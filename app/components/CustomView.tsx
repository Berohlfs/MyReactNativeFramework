// RN
import { View, ViewProps } from "react-native"
// React
import { ReactNode } from "react"

interface Props extends ViewProps {
    children: ReactNode
    paper?: true
}

export const CustomView = ({children, className, paper, ...other}: Props)=> {
    return (
        <View 
            {...other} 
            className={`bg-background-light dark:bg-background-dark flex-1 ${paper ? 'border rounded-md border-divider-light dark:border-divider-dark' : ''} ${className}`}>
            {children}
        </View>
    )
}
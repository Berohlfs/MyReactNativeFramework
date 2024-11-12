// Expo
import { Link, LinkProps } from "expo-router"

export const CustomLink = ({children, className, ...other}: LinkProps<string>)=> {
    return (
        <Link 
            {...other} 
            className={`text-link-light dark:text-link-dark ${className}`}>
            {children}
        </Link>
    )
}
# MyReactNativeFramework

## How did I set Expo up?

1. `yarn create expo --template`.
1. Chose `Blank Typescript`.
1. Followed Expo Router's manual [installation guide](https://docs.expo.dev/router/installation).
1. Created an `app` folder for navigation.
1. Deleted the `App.tsx` file.
1. Created a new `index.tsx` file inside the `app` folder containing the following content: 

```
import { Text } from 'react-native'

export default function Page() {
  return <Text>Home page</Text>
}
```
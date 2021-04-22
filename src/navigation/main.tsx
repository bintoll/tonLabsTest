import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { NavScreenNameMain } from '@constants/navigation'

import { ChooseImagesScreen } from '@screens/choose-images'
import { FavouriteImagesScreen } from '@screens/favourite-images'

import type { MainStackParamList } from './typings'

const MainStack = createStackNavigator<MainStackParamList>()

interface Props {}

export const MainNavigation: React.NamedExoticComponent<React.PropsWithChildren<Props>> = React.memo(() => (
  <NavigationContainer>
    <MainStack.Navigator initialRouteName={NavScreenNameMain.ChooseImages} screenOptions={{ headerShown: false }}>
      <MainStack.Screen name={NavScreenNameMain.ChooseImages} component={ChooseImagesScreen} />
      <MainStack.Screen name={NavScreenNameMain.FavouriteImages} component={FavouriteImagesScreen} />
    </MainStack.Navigator>
  </NavigationContainer>
))

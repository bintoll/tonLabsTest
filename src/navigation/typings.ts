import { NavScreenNameMain } from '@constants/navigation'

import { CardItem } from '@screens/choose-images'

export type ChooseImagesScreenParams = undefined
export type FavouriteImagesScreenParams = { likedData: CardItem[] }

export type MainStackParamList = {
  [NavScreenNameMain.ChooseImages]: ChooseImagesScreenParams
  [NavScreenNameMain.FavouriteImages]: FavouriteImagesScreenParams
}

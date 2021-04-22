import { Platform, ScaledSize, Dimensions, StatusBar } from 'react-native'

import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper'

const window: ScaledSize = Dimensions.get('window')
const DESIGN_LAYOUT_WIDTH = 375

export const windowWidth = window.width
export const windowHeight = window.height

export const statusBarHeight: number = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight || 0

export const getPercentageOfNumber = (percent: number, total: number): number => (percent / 100) * total

// Считаем размеры в нормальных px
export const getRelativeWidth = (size: number): number => (size * window.width) / DESIGN_LAYOUT_WIDTH

export const getRelativeHeightFromPercent = (percent: number): number =>
  getPercentageOfNumber(percent, window.height) + (isIphoneX() ? statusBarHeight : 0)

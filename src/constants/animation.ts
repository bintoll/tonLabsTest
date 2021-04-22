import Animated from 'react-native-reanimated'

import { windowWidth } from '@utils/dimensions'

export const SWIPE_VELOCITY = 800

export const hiddenTranslateX = 1.5 * windowWidth

export const springBaseConfig: Animated.WithSpringConfig = {
  stiffness: 100,
  mass: 0.5,
  damping: 12,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
}

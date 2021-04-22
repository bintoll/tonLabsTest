import React from 'react'
import { View } from 'react-native'

import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, { interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle } from 'react-native-reanimated'

import { hiddenTranslateX } from '@constants/animation'

import { EvaluationType } from '../swipable-stack-view'
import { styles } from './stack-view-footer.style'

interface Props {
  currentIndex: number
  cardTranslateX: Animated.SharedValue<number>
  onEvaluateCard: (evaluationType: EvaluationType) => void
}

export const StackViewFooter: React.FC<Props> = ({ cardTranslateX, currentIndex, onEvaluateCard }) => {
  const handleTapLike = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onEnd: () => {
      onEvaluateCard && runOnJS(onEvaluateCard)(EvaluationType.like)
    },
  })

  const handleTapDislike = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onEnd: () => {
      onEvaluateCard && runOnJS(onEvaluateCard)(EvaluationType.dislike)
    },
  })

  const likeButtonStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: interpolate(cardTranslateX.value, [-hiddenTranslateX, 10, hiddenTranslateX], [1, 1, 1.2]) }],
    }),
    [currentIndex],
  )

  const dislikeButtonStyle = useAnimatedStyle(
    () => ({
      transform: [
        { scale: interpolate(cardTranslateX.value, [-hiddenTranslateX, -10, hiddenTranslateX], [1.2, 1, 1]) },
      ],
    }),
    [currentIndex],
  )

  return (
    <View style={styles.root}>
      <TapGestureHandler onHandlerStateChange={handleTapDislike}>
        <Animated.View style={[styles.button, styles.dislikeButton, dislikeButtonStyle]} />
      </TapGestureHandler>
      <TapGestureHandler onHandlerStateChange={handleTapLike}>
        <Animated.View style={[styles.button, styles.likeButton, likeButtonStyle]} />
      </TapGestureHandler>
    </View>
  )
}

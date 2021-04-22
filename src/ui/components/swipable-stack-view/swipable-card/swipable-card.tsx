import React, { ReactElement, useEffect, useMemo } from 'react'
import { LayoutAnimation, UIManager, View } from 'react-native'

import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated'

import { hiddenTranslateX, SWIPE_VELOCITY } from '@constants/animation'

import { EvaluationType } from '../swipable-stack-view'
import { styles } from './swipable-card.style'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

export type RenderCardParams<T> = {
  item: T
  index: number
}

export type RenderCardContent<T> = ({ item, index }: RenderCardParams<T>) => ReactElement

type Props<T> = {
  card: T
  currentIndex: number
  index: number
  cardTranslateX: Animated.SharedValue<number>
  renderCardContent: RenderCardContent<T>
  onEvaluateCard: (evaluationType: EvaluationType) => void
}

export const SwipableCard = <T,>({
  cardTranslateX,
  currentIndex,
  index,
  card,
  onEvaluateCard,
  renderCardContent,
}: Props<T>) => {
  useEffect(() => {
    setTimeout(() => {
      cardTranslateX.value = 0
    }, 100)
  }, [currentIndex, cardTranslateX])

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { startX: number }>({
    onStart: (_, context) => {
      context.startX = cardTranslateX.value
    },
    onActive: (event, context) => {
      cardTranslateX.value = context.startX + event.translationX
    },
    onEnd: ({ velocityX }) => {
      if (Math.abs(velocityX) < SWIPE_VELOCITY) {
        cardTranslateX.value = withSpring(0)
        return
      }

      const evaluationType = velocityX > 0 ? EvaluationType.like : EvaluationType.dislike

      onEvaluateCard && runOnJS(onEvaluateCard)(evaluationType)
    },
  })

  const translateY = useDerivedValue(
    () => interpolate(cardTranslateX.value, [-hiddenTranslateX, 0, hiddenTranslateX], [100, 0, 100]),
    [currentIndex, cardTranslateX],
  )

  const currentCardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: cardTranslateX.value }, { translateY: translateY.value }],
  }))

  const nextCardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(cardTranslateX.value, [-hiddenTranslateX, 0, hiddenTranslateX], [27, 0, 27]),
        },
        {
          scale: interpolate(cardTranslateX.value, [-hiddenTranslateX, 0, hiddenTranslateX], [1.086, 1, 1.086]),
        },
      ],
    }
  }, [currentIndex])

  const cardContent = useMemo<ReactElement>(() => renderCardContent({ item: card, index }), [card, index])

  if (currentIndex > index) {
    return <View />
  }

  if (currentIndex === index) {
    return (
      <View style={styles.currentCardWrapper}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={currentCardAnimatedStyle}>{cardContent}</Animated.View>
        </PanGestureHandler>
      </View>
    )
  } else {
    const nextCardWrapperStyles = [styles.nextCardWrapper, { zIndex: 1000 - index }, nextCardAnimatedStyle]
    const nextCardInnerStyles = [
      styles.nextCardInner,
      // eslint-disable-next-line react-native/no-inline-styles
      {
        transform: [{ translateY: -40 * (index - currentIndex) }, { scale: 1 - 0.08 * (index - currentIndex) }],
        opacity: index - currentIndex > 2 ? 0 : 1,
      },
    ]
    return (
      <Animated.View style={nextCardWrapperStyles}>
        <Animated.View style={nextCardInnerStyles}>{cardContent}</Animated.View>
      </Animated.View>
    )
  }
}

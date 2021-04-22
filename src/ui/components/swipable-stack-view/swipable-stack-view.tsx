import React, { ForwardedRef, forwardRef, Key, ReactElement, Ref, useImperativeHandle, useState } from 'react'
import { View } from 'react-native'

import { runOnJS, useSharedValue, withSpring } from 'react-native-reanimated'

import { hiddenTranslateX, springBaseConfig } from '@constants/animation'

import { StackViewFooter } from './stack-view-footer'
import { SwipableCard, RenderCardContent } from './swipable-card'
import { styles } from './swipable-stack-view.style'

export enum EvaluationType {
  like = 'like',
  dislike = 'dislike',
}

export type CardKeyExtractor<T> = (item: T, index: number) => Key

export type SwipableStackViewRefObj = {
  undoEvaluation: () => void
}

export type Props<T> = {
  data: T[]
  renderCardContent: RenderCardContent<T>
  keyExtractor: CardKeyExtractor<T>
  onEvaluateCard: (card: T, index: number, evaluationType: EvaluationType) => void
}

export const SwipableStackView = forwardRef(
  <T,>({ data, onEvaluateCard, renderCardContent, keyExtractor }: Props<T>, ref: Ref<SwipableStackViewRefObj>) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const cardTranslateX = useSharedValue(0)

    useImperativeHandle(ref, () => ({
      undoEvaluation: () => {
        if (currentIndex) {
          setCurrentIndex(currentIndex - 1)
        }
      },
    }))

    const _onEvaluateCard = (evaluationType: EvaluationType) => {
      cardTranslateX.value = withSpring(
        (evaluationType === EvaluationType.like ? 1 : -1) * hiddenTranslateX,
        springBaseConfig,
        () => {
          runOnJS(setCurrentIndex)(currentIndex + 1)
          runOnJS(onEvaluateCard)(data[currentIndex], currentIndex, evaluationType)
        },
      )
    }

    return (
      <View style={styles.root}>
        <View style={styles.cardsWrapper}>
          {data.map((card: T, index: number) => (
            <SwipableCard
              card={card}
              index={index}
              currentIndex={currentIndex}
              cardTranslateX={cardTranslateX}
              renderCardContent={renderCardContent}
              key={keyExtractor(card, index)}
              onEvaluateCard={_onEvaluateCard}
            />
          ))}
        </View>
        <View style={styles.footerWrapper}>
          <StackViewFooter
            cardTranslateX={cardTranslateX}
            currentIndex={currentIndex}
            onEvaluateCard={_onEvaluateCard}
          />
        </View>
      </View>
    )
  },
) as <T>(
  p: Props<T> & {
    ref?: ForwardedRef<SwipableStackViewRefObj>
  },
) => ReactElement

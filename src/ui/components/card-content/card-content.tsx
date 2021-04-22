import React, { FC, memo, useMemo } from 'react'
import { ImageBackground, ImageProps, Text, View } from 'react-native'

import { CardItem } from '@screens/choose-images'

import { styles } from './card-content.style'

type Props = {
  content: CardItem
}

export const CardContent: FC<Props> = memo(
  ({
    content: {
      camera: { full_name },
      img_src,
      earth_date,
    },
  }) => {
    const source = useMemo<ImageProps['source']>(() => ({ uri: img_src }), [img_src])

    return (
      <View style={styles.root}>
        <ImageBackground source={source} style={styles.imageBackground}>
          <View style={styles.infoWrapper}>
            <Text style={styles.nameText}>{full_name}</Text>
            <Text style={styles.dateText}>{earth_date}</Text>
          </View>
        </ImageBackground>
      </View>
    )
  },
)

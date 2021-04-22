import React, { Component } from 'react'
import { FlatList, Image, Text, View } from 'react-native'

import { RouteProp } from '@react-navigation/core'

import { NavScreenNameMain } from '@constants/navigation'

import { MainStackParamList } from '@navigation/typings'

import { CardItem } from '@screens/choose-images'

import { styles } from './favourite-images.style'

type FavouriteImagesScreenRouteProp = RouteProp<MainStackParamList, NavScreenNameMain.FavouriteImages>

interface Props {
  route: FavouriteImagesScreenRouteProp
}
interface State {}

export class FavouriteImagesScreen extends Component<Props, State> {
  public render() {
    const { likedData } = this.props.route.params
    return (
      <View style={styles.root}>
        <FlatList
          style={styles.flatList}
          contentContainerStyle={styles.flatListContentContainerStyle}
          data={likedData}
          keyExtractor={(_, index) => `liked_card_${index}`}
          renderItem={({ item }: { item: CardItem }) => (
            <View style={styles.listItemWrapper}>
              <View style={styles.imageWrapper}>
                <Image style={styles.image} source={{ uri: item.img_src }} />
              </View>
              <View style={styles.infoWrapper}>
                <Text style={styles.nameText}>{item.camera.full_name}</Text>
                <Text style={styles.dateText}>{item.earth_date}</Text>
              </View>
            </View>
          )}
        />
      </View>
    )
  }
}

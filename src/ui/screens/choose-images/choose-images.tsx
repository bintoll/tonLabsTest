import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { NavigationProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NasaApi } from 'src/api/nasa'

import { NavScreenNameMain } from '@constants/navigation'

import { MainStackParamList } from '@navigation/typings'

import { CardContent } from '@components/card-content'
import { EvaluationType, SwipableStackView, SwipableStackViewRefObj } from '@components/swipable-stack-view'

import { styles } from './choose-images.style'

type ChooseImagesScreenNavigationProp = StackNavigationProp<MainStackParamList, NavScreenNameMain.ChooseImages>

export interface CardItem {
  id: number
  camera: {
    id: number
    name: string
    full_name: string
  }
  img_src: string
  earth_date: string
}

interface Props {
  navigation: ChooseImagesScreenNavigationProp
}
interface State {
  data: CardItem[]
  likedData: CardItem[]
  cardsEvaluated: number
}

export class ChooseImagesScreen extends Component<Props, State> {
  private swipableStackView = React.createRef<SwipableStackViewRefObj>()
  public state = {
    data: [],
    likedData: [],
    cardsEvaluated: 0,
  }

  async componentDidMount() {
    try {
      const responce = await NasaApi.sharedInstance.requestCuriosityPhotos()
      this.setState({ data: responce.data.photos.slice(0, 30) })
    } catch (error) {
      console.log('cought error', error)
    }
  }

  public render() {
    const { likedData, cardsEvaluated } = this.state
    return (
      <View style={styles.root}>
        <View style={styles.stackViewWrapper}>
          <SwipableStackView<CardItem>
            ref={this.swipableStackView}
            data={this.state.data}
            onEvaluateCard={this.onEvaluateCard}
            renderCardContent={this.stackViewRenderCard}
            keyExtractor={this.stackViewKeyExtractor}
          />
        </View>
        <View style={styles.navBarWrapper}>
          <TouchableOpacity onPress={this.onPressUndo} disabled={!cardsEvaluated}>
            <Text style={styles.undoText}>Undo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressGoToLikedCards} disabled={!likedData.length}>
            <Text style={styles.likedText}>Liked</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  private stackViewKeyExtractor = (item: CardItem) => `stack_view_card_${item.id}`

  private stackViewRenderCard = ({ item }: { item: CardItem }) => <CardContent content={item} />

  private onEvaluateCard = (card: CardItem, index: number, evaluationType: EvaluationType) => {
    if (evaluationType === EvaluationType.like) {
      this.setState({ likedData: [...this.state.likedData, card] })
    }
    this.setState({ cardsEvaluated: this.state.cardsEvaluated + 1 })
  }

  private onPressUndo = () => {
    if (this.swipableStackView.current) {
      this.swipableStackView.current.undoEvaluation()
      this.setState({ cardsEvaluated: this.state.cardsEvaluated - 1 })
    }
  }

  private onPressGoToLikedCards = () => {
    const { navigation } = this.props
    navigation.navigate(NavScreenNameMain.FavouriteImages, { likedData: this.state.likedData })
  }
}

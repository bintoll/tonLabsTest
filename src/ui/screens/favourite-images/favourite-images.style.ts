import { StyleSheet } from 'react-native'

import { getRelativeWidth } from '@utils/dimensions'

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  flatListContentContainerStyle: {
    paddingVertical: getRelativeWidth(50),
  },
  listItemWrapper: {
    width: '100%',
    height: getRelativeWidth(80),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getRelativeWidth(20),
  },
  imageWrapper: {
    height: getRelativeWidth(50),
    width: getRelativeWidth(50),
  },
  image: {
    height: '100%',
    width: '100%',
  },
  infoWrapper: {
    marginLeft: getRelativeWidth(20),
  },
  nameText: {
    fontSize: getRelativeWidth(15),
  },
  dateText: {
    fontSize: getRelativeWidth(12),
  },
})

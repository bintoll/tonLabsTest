import { StyleSheet } from 'react-native'

import { getRelativeWidth } from '@utils/dimensions'

export const styles = StyleSheet.create({
  root: {
    elevation: 6,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    aspectRatio: 1,
    justifyContent: 'flex-end',
    borderRadius: 16,
    overflow: 'hidden',
    width: getRelativeWidth(350),
  },
  imageBackground: {
    flex: 1,
  },
  infoWrapper: {
    margin: 20,
  },
  nameText: {
    color: '#f7f7f7',
    fontSize: 30,
  },
  dateText: {
    color: '#f7f7f7',
    fontSize: 30,
  },
})

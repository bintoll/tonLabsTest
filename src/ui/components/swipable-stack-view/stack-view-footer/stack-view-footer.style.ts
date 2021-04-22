import { StyleSheet } from 'react-native'

import { getRelativeWidth } from '@utils/dimensions'

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    height: getRelativeWidth(60),
    width: getRelativeWidth(60),
    borderRadius: getRelativeWidth(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeButton: {
    backgroundColor: 'green',
  },
  dislikeButton: {
    backgroundColor: 'red',
  },
})

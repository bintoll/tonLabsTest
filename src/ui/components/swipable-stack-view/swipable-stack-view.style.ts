import { StyleSheet } from 'react-native'

import { getRelativeWidth } from '@utils/dimensions'

export const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  cardsWrapper: {
    height: getRelativeWidth(400),
    marginTop: 80,
    width: '100%',
    alignItems: 'center',
  },
  footerWrapper: {
    marginTop: getRelativeWidth(50),
  },
})

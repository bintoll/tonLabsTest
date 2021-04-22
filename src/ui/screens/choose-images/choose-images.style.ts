import { StyleSheet } from 'react-native'

import { getRelativeWidth } from '@utils/dimensions'

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  stackViewWrapper: {},
  navBarWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: getRelativeWidth(50),
    flexDirection: 'row',
    paddingHorizontal: getRelativeWidth(20),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'wheat',
  },
  undoText: {
    fontSize: getRelativeWidth(15),
    color: 'red',
  },
  likedText: {
    fontSize: getRelativeWidth(15),
    color: 'black',
  },
})

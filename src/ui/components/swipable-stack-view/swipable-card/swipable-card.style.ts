import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  nextCardWrapper: {
    position: 'absolute',
    left: 0,
    alignItems: 'center',
    width: '100%',
    top: '10%',
  },
  nextCardInner: {
    position: 'absolute',
    left: 0,
    alignItems: 'center',
    width: '100%',
  },
  currentCardWrapper: {
    zIndex: 1001,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    top: '10%',
  },
})

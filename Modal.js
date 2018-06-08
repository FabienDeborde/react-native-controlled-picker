import React from 'react'
import { Modal as ReactNativeModal, FlatList } from 'react-native'
import { TouchableOpacity, Dimensions, StatusBar } from 'react-native'

import Item from './Item'

const marginTop = (data, itemHeight = 32, listPadding = 20) => {
  const { height } = Dimensions.get('window')
  const count = data.length ? data.length : 0
  const itemsHeight = count * itemHeight
  const statusHeight = StatusBar.currentHeight || 0
  const marginCalc = (height / 2) - (itemsHeight / 2) - listPadding - statusHeight
  // For long list the margin calculation returns a negative number, resulting of part of the list being unaccessible
  // Added a quick check to default the margin to 0 in these cases
  return (marginCalc > 0) ? marginTop : 0
}

const Modal = ({ open, data, style, listStyle, itemStyle, onClose }) => (
  <ReactNativeModal
    visible={open}
    animationType="slide"
    onRequestClose={onClose}
    transparent={true}
  >
    <TouchableOpacity
      onPress={onClose}
      style={[{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
      }, style]}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => <Item {...item} style={itemStyle} />}
        contentContainerStyle={[{
          backgroundColor: 'white',
          alignSelf: 'center',
          marginTop: marginTop(data, itemStyle.height, listStyle.padding),
          padding: 20,
        }, listStyle]}
      />
    </TouchableOpacity>
  </ReactNativeModal>
)

export default Modal

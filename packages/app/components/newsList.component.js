import React from 'react'
import {StyleSheet, Image, View } from 'react-native'
import { List, Text } from '@ui-kitten/components'
import { NewsListItem } from './newsListItem.component'

export const NewsList = ({ news }) => {
  return (
    <>
     <Image
        source={require('../assets/girls.png')}
        style={{height: 200, width: '80%', alignContent:'center'}}
      />
      <Text
        category="h5"
        style={{position: 'absolute', right: 10, top: 60, width: 150}}>
        Nyheter från Skolan
      </Text>
      <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={news}
        renderItem={(info) => (
          <NewsListItem key={info.item.id} item={info.item} />
        )}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    padding: 10,
  },
})

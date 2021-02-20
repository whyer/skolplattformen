import React from 'react'
import {useNavigation} from '@react-navigation/native'
import {Card, Text} from '@ui-kitten/components'
import {StyleSheet, View} from 'react-native'
import {Image} from './image.component'
import {useChild} from './childContext.component'
import {DateTime} from 'luxon'
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler'

const displayDate = (date) =>
  DateTime.fromISO(date).toRelative({locale: 'sv', style: 'long'})

export const NewsListItem = ({item}) => {
  const navigation = useNavigation()
  const child = useChild()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('NewsItem', {newsItem: item, child})}>
      <View style={styles.card}>
        <Image src={item.fullImageUrl} style={styles.image} />
        <View style={styles.text}>
          <View>
            <Text category="h5" style={styles.header}>{item.header}</Text>

            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              category="s2"
              style={styles.intro}>
              {item.intro}
            </Text>
          </View>
          <Text category="c1">
              {displayDate(item.published || item.modified)}
            </Text>
          <Text category="c1">Av: {item.author}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 2,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 2,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    padding: 20,
    marginVertical: 5,
  },
  text: {
    justifyContent: 'space-between',
  },
  header: {
    flexWrap: 'wrap',
    width: 240,
  },
  intro: {
    flexShrink: 1,
    width: 230,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
})

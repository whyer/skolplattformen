import React from 'react'
import {StyleSheet, View, Linking} from 'react-native'
import {
  Divider,
  List,
  ListItem,
  Icon,
  Text,
  Card,
  Button,
} from '@ui-kitten/components'
import {ContactMenu} from './contactMenu.component'
import {useAsyncStorage} from 'use-async-storage'

const body = `Till er som tröttnat på Stockholms stads Skolplattform skickar jag här vidare ett tips om en ny app: Öppna Skolplattformen. Den har samma innehåll men är betydligt smidigare. 

Här är info från dem: 

Vi föräldrar, Erik Hellman, Christian Landgren och Johan Öbrink, som byggt appen är utvecklare med gedigen erfarenhet av att behandla personuppgifter. Alla tre har flera år i rad utnämnda till Sveriges bästa utvecklare enligt IDG.

Vi har också haft många andra föräldrar till vår hjälp! Det tackar vi för!

Man kan känna sig helt trygg med att använda appen. Den är helt laglig och helt säker. 

Gör såhär

1)    Sök på Appstore eller Google Play efter Öppna Skolplattformen (läs gärna recensionerna!). Appen kostar 12 kr som engångskostnad.
2)    Logga in som vanligt med ditt Bank-ID. 

Informationen hämtas via gamla skolplattformen och visas bara för dig. Ingenting lagras eller skickas vidare. Här står mer om integritetspolicyn: https://skolplattformen.org/integritet

Stockholms stad har skickat ut ett meddelande att de inte är ansvariga för denna app. Underliggande tonen kan kännas lite surmulen, men det stämmer ju bra att det inte är de står bakom (tack och lov om man får kontra?).`

export const Classmates = ({classmates}) => {
  const [selected, setSelected] = React.useState()
  const [showMarketing, setMarketing] = useAsyncStorage('@showMarketing', true)

  const BulbIcon = (props) => <Icon {...props} name="bulb-outline" />
  const PeopleIcon = (props) => <Icon {...props} name="people-outline" />
  const EmailIcon = (props) => <Icon {...props} name="email-outline" />
  const CloseIcon = (props) => <Icon {...props} name="close-outline" />

  const renderItem = ({item}) => (
    <ListItem
      title={`${item.firstname} ${item.lastname}`}
      onPress={() => setSelected(item)}
      description={item.guardians
        .map((guardian) => `${guardian.firstname} ${guardian.lastname}`)
        .join(', ')}
      accessoryLeft={PeopleIcon}
      accessoryRight={(props) =>
        ContactMenu({
          ...props,
          contact: item,
          selected: item === selected,
          setSelected,
        })
      }
    />
  )

  const emails = classmates
    .map((classmate) => classmate.guardians.map((g) => g.email).join(','))
    .join(',')

  const Footer = (props) => (
    <View {...props} style={styles.footer}>
      <BulbIcon fill="#000" style={styles.icon} />
      <Text style={styles.marketing}>
        Eftersom skolan inte kan tipsa om vår app så behöver vi din hjälp. Det
        skulle betyda mycket (om du gillar appen :) om du ville tipsa de andra
        föräldrarna om att också ladda ner den?
      </Text>
      <View style={styles.footerContainer}>
        <Button
          style={styles.footerControl}
          accessoryLeft={EmailIcon}
          onPress={(e) =>
            Linking.openURL(
              `mailTo:${emails}?subject=Tips! Installera Öppna Skolplattformen&body=${body}`,
            )
          }>
          Bjud in
        </Button>
        <Button
          style={styles.footerControl}
          accessoryLeft={CloseIcon}
          onPress={() => setMarketing(false)}
          status="info">
          Nej tack
        </Button>
      </View>
    </View>
  )

  return (
    <List
      style={styles.container}
      data={classmates}
      ItemSeparatorComponent={Divider}
      ListHeaderComponent={
        <Card>
          <Text category="h5" style={styles.listHeader}>
            {classmates?.length
              ? 'Klass ' + classmates[0].className
              : 'Information saknas'}
          </Text>
          <Text>
            Här visas information som är godkänd för publicering. Om det saknas
            information, be vårdnadshavare kontrollera sina uppgifter på
            Skolplattformen.
          </Text>
        </Card>
      }
      ListFooterComponent={showMarketing ? Footer : null}
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  listHeader: {
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  marketing: {
    flex: 1,
  },
  footer: {
    margin: 20,
  },
  footerContainer: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  footerControl: {
    marginTop: 5,
    marginRight: 5,
  },
  icon: {
    width: 64,
    height: 64,
    marginVertical: 5,
  },
})

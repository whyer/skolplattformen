import React from 'react'
import { render } from '../../utils/testHelpers'
import { Notification } from '../notification.component.js'
import MockDate from 'mockdate'

const defaultItem = {
  sender: 'Planering',
  category: 'Bedömning',
  dateCreated: '2021-02-15T09:13:28.484Z',
}

const setup = (customProps = {}) => {
  const props = {
    item: defaultItem,
    ...customProps,
  }

  return render(<Notification {...props} />)
}

beforeEach(() => {
  MockDate.set('2021-02-15T09:30:28.484Z')
})

test('renders subtitle with date', () => {
  const screen = setup()

  expect(screen.getByText('Bedömning • för 17 minuter sedan')).toBeTruthy()
})

test('renders subtitle without date', () => {
  const itemWithoutDate = {
    ...defaultItem,
    dateCreated: undefined,
  }

  const screen = setup({ item: itemWithoutDate })

  expect(screen.getByText('Bedömning')).toBeTruthy()
})

test('renders subtitle without category', () => {
  const itemWithoutCategory = {
    ...defaultItem,
    category: undefined,
  }

  const screen = setup({ item: itemWithoutCategory })

  expect(screen.getByText('för 17 minuter sedan')).toBeTruthy()
})

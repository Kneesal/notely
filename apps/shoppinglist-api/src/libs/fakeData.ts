export const user = [
  {
    id: 'userId',
    email: 'email@example.com'
  },
  {
    id: 'userId2',
    email: 'email2@example.com'
  }
]

export const list = [
  {
    id: 'listId',
    owner: 'userid',
    editors: ['userId', 'userId2'],
    listItems: [
      {
        id: 'listItemId',
        title: 'bread',
        done: false
      },
      {
        id: 'listItemId1',
        title: 'sausages',
        done: false
      },
      {
        id: 'listItemId2',
        title: 'tomato',
        done: false
      }
    ]
  }
]

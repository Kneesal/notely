import { NextApiResponse, NextApiRequest } from 'next'

const fakeData = [
  {
    userid: 'IInDJDUojYfYcdYLHNjZcgW4L3j1',
    shoppingList: [
      {
        title: 'soap',
        done: false
      }
    ]
  }
]

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = fakeData.filter((userData) => {
    return req.body.userId === userData.userid
  })

  console.log(data)
  res.json({ data })
}

export default handler

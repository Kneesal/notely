import { unsetAuthCookies } from 'next-firebase-auth'
import initAuth from '../../src/libs/firebaseInitAuth/firebaseInitAuth'
import { NextApiResponse, NextApiRequest } from 'next'

initAuth()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await unsetAuthCookies(req, res)
  } catch (e) {
    console.log('logout handler failed with error: ', e)
    return res.status(500).json({ error: 'Unexpected error.' })
  }
  return res.status(200).json({ success: true })
}

export default handler

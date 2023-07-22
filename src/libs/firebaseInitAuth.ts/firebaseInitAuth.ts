import { init } from 'next-firebase-auth'

const initAuth = () => {
  init({
    authPageURL: '/user/signin',
    appPageURL: '/',
    loginAPIEndpoint: '/api/login',
    logoutAPIEndpoint: '/api/logout',
    onLoginRequestError: (err: Error) => {
      console.error(err)
    },
    onLogoutRequestError: (err: Error) => {
      console.error(err)
    },
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID ?? '',
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL ?? '',
        // The private key must not be accessible on the client side.
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY ?? ''
      },
      databaseURL: ''
    },
    firebaseClientInitConfig: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
      databaseURL: 'https://my-example-app.firebaseio.com',
      projectId: 'my-example-app-id'
    },

    cookies: {
      name: 'OurShoppingList',
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true, // set this to false in local (non-HTTPS) development
      signed: true
    },
    onVerifyTokenError: (err: Error) => {
      console.error(err)
    },
    onTokenRefreshError: (err: Error) => {
      console.error(err)
    }
  })
}

export default initAuth

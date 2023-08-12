import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { ReactElement, useState, useEffect } from 'react'
import { StyledFirebaseAuth } from '../../libs/StyledFirebaseAuth'
import { getApp } from 'firebase/app'
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    },
    {
      provider: GoogleAuthProvider.PROVIDER_ID
    }
  ],
  callbacks: {
    signInSuccessWithAuthResult: () =>
      // Don't automatically redirect. We handle redirects using
      // `next-firebase-auth`.
      //see pages/user/signin.tsx for example of our redirection
      false
  }
}

export function SignIn(): ReactElement {
  const [renderAuth, setRenderAuth] = useState<boolean>(false)

  useEffect(() => {
    //do not render firebaseAuth during SSR, it will not work.
    //setRenderAuth runs after client side hydration
    if (typeof window !== 'undefined') {
      setRenderAuth(true)
    }
  }, [])

  return (
    <>
      {renderAuth && (
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>

          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={getAuth(getApp())}
          />
        </Box>
      )}
    </>
  )
}

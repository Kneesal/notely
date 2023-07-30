import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { ReactElement, useState, useEffect } from 'react'
import { StyledFirebaseAuth } from '@/libs/StyledFirebaseAuth'
import { getAuth } from 'firebase/auth'
import { getApp } from 'firebase/app'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export function SignIn(): ReactElement {
  const [renderAuth, setRenderAuth] = useState<boolean>(false)

  useEffect(() => {
    //do not render firebaseAuth during SSR, it will not work.
    //setRenderAuth runs after clietn side hydration
    setRenderAuth(true)
  }, [])

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () =>
        // Don't automatically redirect. We handle redirects using
        // `next-firebase-auth`.
        //see pages/user/signin.tsx for example of our redirection
        false
    }
  }
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

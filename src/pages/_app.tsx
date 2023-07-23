import { AuthProvider } from '@/libs/AuthProvider/AuthProvider'
import initAuth from '@/libs/firebaseInitAuth/firebaseInitAuth'
import { theme } from '@/theme'
import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'

initAuth()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )
}

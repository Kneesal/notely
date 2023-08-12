import initAuth from '../src/libs/firebaseInitAuth/firebaseInitAuth'
import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import { theme } from '../src/theme'

initAuth()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

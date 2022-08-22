<<<<<<< HEAD
import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/system'
import { lightTheme } from "../../themes"
import { CssBaseline } from '@mui/material'
=======
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes'
>>>>>>> c2d10bd4e5d765190082ae9505a06d35757b6ba6

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

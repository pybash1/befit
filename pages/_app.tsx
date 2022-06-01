import '../styles/globals.css'
import type { AppProps } from 'next/app'

function BeFit({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default BeFit

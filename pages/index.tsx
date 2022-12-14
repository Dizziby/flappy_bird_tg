import Head from 'next/head'
import {Game} from '../src/components/Game'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Image generation</title>
        <meta name="description" content="Image generation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Game />
      </main>
    </div>
  )
}

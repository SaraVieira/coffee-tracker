import { default as HeadContainer } from 'next/head'

const Head = () => {
  return (
    <HeadContainer>
      <title>Coffee Tracker</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </HeadContainer>
  )
}

export default Head

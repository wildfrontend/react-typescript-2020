import React from 'react'
import useTestRenderCount from 'hooks/useTestRenderCount'
// redux
import { useSelector, useDispatch } from 'react-redux'
import {
  increment,
  decrement,
  selectCount,
  incrementByTime,
} from 'store/reducers/count'
// baseui
import { ButtonGroup } from 'baseui/button-group'
import { Button } from 'baseui/button'
import { Block } from 'baseui/block'
import { Heading, HeadingLevel } from 'baseui/heading'

const Home: React.FC<{}> = () => {
  useTestRenderCount({ page: 'home' })
  const couter = useSelector(selectCount)
  const dispatch = useDispatch()

  const increCouter = () => dispatch(increment(1))
  const decreCouter = () => dispatch(decrement(2))
  const increByTimeCounter = () => dispatch(incrementByTime(10))
  return (
    <Block>
      <HeadingLevel>
        <Heading styleLevel={1}>Home Page</Heading>
        <Heading styleLevel={4}>Redux Couter</Heading>
      </HeadingLevel>

      <Block height={['200px']}>Couter:{couter.value}</Block>
      <ButtonGroup>
        <Button onClick={increCouter}>+</Button>
        <Button onClick={decreCouter}>-</Button>
        <Button onClick={increByTimeCounter}>time</Button>
      </ButtonGroup>
    </Block>
  )
}

export default Home

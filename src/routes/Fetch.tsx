import React, { useEffect, useState, useCallback } from 'react'
// axios
import { axiosInstance } from 'api/interceptor'
// baseui
import { useStyletron } from 'baseui'
import { Block } from 'baseui/block'
import { HeadingLevel, Heading } from 'baseui/heading'
// inersection-observer
import { useInView } from 'react-intersection-observer'

const InViewBlock: React.FC<{ handleCallback?: Function }> = ({
  handleCallback,
}) => {
  const [ref, inView] = useInView({
    threshold: [0.5],
    delay: 500,
  })
  const [css, theme] = useStyletron()
  useEffect(() => {
    if (inView && handleCallback) {
      handleCallback()
    }
  }, [handleCallback, inView])
  return (
    <div
      ref={ref}
      className={css({
        backgroundColor: theme.colors.black,
        width: '100%',
        height: '3rem',
        color: 'white',
      })}
    >
      <h2>{`Header inside viewport ${inView}.`}</h2>
    </div>
  )
}

const useFetchComments = () => {
  const [comments, setComments] = useState([] as any[])
  const rowsLimit = 20
  const [page, setPage] = useState(1)
  const [totalData, setTotalData] = useState(0)

  const handleNextPage = useCallback(() => {
    if (comments.length < totalData) {
      setPage((state) => state + 1)
    }
  }, [comments.length, totalData])

  const fetchComments = useCallback(async () => {
    const res = await axiosInstance.get('https://jsonplaceholder.typicode.com/comments', {
      params: {
        _page: page,
        _limit: rowsLimit,
      },
    })
    const totalNumber = Number(res.headers?.['x-total-count'])
    setTotalData(totalNumber)
    setComments((state) => [...state, ...res.data])
  }, [page])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])
  return {
    comments,
    handleNextPage,
  }
}
const Fetch: React.FC = () => {
  const [css, theme] = useStyletron()
  const { comments, handleNextPage } = useFetchComments()
  return (
    <Block marginTop="1rem">
      <HeadingLevel>
        <Heading styleLevel={1}>Fetch API</Heading>
      </HeadingLevel>

      <pre
        className={css({
          backgroundColor: theme.colors.accent200,
        })}
      >
        {JSON.stringify(comments, null, 4)}
      </pre>
      <InViewBlock handleCallback={handleNextPage} />
    </Block>
  )
}

export default Fetch

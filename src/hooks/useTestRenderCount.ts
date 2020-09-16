import { useEffect } from 'react'

type TestRenderCountProps = {
  page?: string
}

const useTestRenderCount = ({ page }: TestRenderCountProps) => {
  useEffect(() => {
    console.group('render:', page)
    console.count('執行次數')
    console.info('pathname:', window.location.pathname)
    console.groupEnd()
    return () => {
      console.group('ummount', page)
      console.info('pathname:', window.location.pathname)
      console.groupEnd()
    }
  }, [page])
}

export default useTestRenderCount

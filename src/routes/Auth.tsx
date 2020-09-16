import React, { useEffect, useState } from 'react'
// api
import { axiosInstance } from 'api/interceptor'
// baseui
import { Block } from 'baseui/block'
import { HeadingLevel, Heading } from 'baseui/heading'
// i18n
import { useTranslation } from 'react-i18next'
import { Button } from 'baseui/button'

const Auth: React.FC = () => {
  const { t } = useTranslation()
  const [products, setProducts] = useState([])
  const fetchProducts = () => {
    axiosInstance.get('http://localhost:8000/products').then((res) => {
      setProducts(res.data)
    })
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <Block marginTop="1rem">
      <HeadingLevel>
        <Heading styleLevel={1}>Auth</Heading>
        <p>{t('title')}</p>
      </HeadingLevel>
      <Button onClick={fetchProducts}>Reload</Button>
      <pre>{JSON.stringify(products, null, 4)}</pre>
    </Block>
  )
}

export default Auth

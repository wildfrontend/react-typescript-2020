import React from 'react'
// baseui
import { Block } from 'baseui/block'
import { HeadingLevel, Heading } from 'baseui/heading'
import { useTranslation } from 'react-i18next'
import { ButtonGroup } from 'baseui/button-group'
import { Button } from 'baseui/button'

const Locales: React.FC = () => {
  const { t, i18n } = useTranslation()
  const changeLangTW = () => i18n.changeLanguage('tw')
  const changeLangEN = () => i18n.changeLanguage('en')
  return (
    <Block marginTop="1rem">
      <HeadingLevel>
        <Heading styleLevel={1}>翻譯頁面</Heading>
        <p>{t('title')}</p>
      </HeadingLevel>
      <ButtonGroup>
        <Button onClick={changeLangEN}>EN</Button>

        <Button onClick={changeLangTW}>TW</Button>
      </ButtonGroup>
    </Block>
  )
}

export default Locales

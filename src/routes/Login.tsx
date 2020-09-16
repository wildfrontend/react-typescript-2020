import React from 'react'
// routes
import { useHistory, useLocation } from 'react-router-dom'
import { ROOT_ROUTES } from './index'
// baseui
import { Block } from 'baseui/block'
import { Input } from 'baseui/input'
import { HeadingLevel, Heading } from 'baseui/heading'
// i18n
import { useTranslation } from 'react-i18next'
// form
import { useForm, Controller } from 'react-hook-form'
import { Button } from 'baseui/button'
// api
import { axiosInstance } from 'api/interceptor'
// redux
import { useDispatch } from 'react-redux'
import { loginAuth } from 'store/reducers/auth'

const Login: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { from }: any = location.state || {
    from: { pathname: ROOT_ROUTES.home },
  }
  const redirectFromLocation = () => history.replace(from)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { handleSubmit, control, watch } = useForm({})
  console.log(watch())

  const loginApi = handleSubmit((data) => {
    alert(JSON.stringify(data, null, 4))
    axiosInstance
      .post('http://localhost:8000/auth/login', data, {})
      .then((res) => {
        console.log(res)
        dispatch(loginAuth(res.data.access_token))
        redirectFromLocation()
      })

      .catch((err) => {
        console.error(err)
      })
  })

  return (
    <Block marginTop="1rem">
      <HeadingLevel>
        <Heading styleLevel={1}>Login</Heading>
        <p>{t('title')}</p>
      </HeadingLevel>
      <form onSubmit={loginApi}>
        <Controller
          as={<Input required placeholder="信箱" />}
          control={control}
          name="email"
        />
        <Controller
          as={<Input required placeholder="密碼" />}
          control={control}
          name="password"
        />
        <Button type="submit">登入</Button>
      </form>
    </Block>
  )
}

export default Login

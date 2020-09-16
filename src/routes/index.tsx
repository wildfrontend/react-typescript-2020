import React from 'react'
//router
import { Route, Switch, Link, Redirect, RouteProps } from 'react-router-dom'
// ui
import { useStyletron } from 'baseui'
import { Block } from 'baseui/block'
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid'
import {
  HeaderNavigation,
  StyledNavigationItem,
  StyledNavigationList,
} from 'baseui/header-navigation'

// pages
import Home from './Home'
import Nest from './Nest'
import NotFound from './Notfound'
import Locales from './Locales'
import Fetch from './Fetch'
import { useSelector } from 'react-redux'
import { selectAuth } from 'store/reducers/auth'
import Auth from './Auth'
import Login from './Login'

export const ROOT_ROUTES = {
  home: '/',
  nest: '/nest',
  notFound: '*',
  locales: '/locales',
  login: '/login',
  auth: '/auth',
  fetch: '/fetch',
}

const Outer: React.FC = ({ children }: any) => {
  const [css, theme] = useStyletron()
  return (
    <div
      className={css({
        height: '100vh',
        width: '100vw',
        background: theme.colors.background,
      })}
    >
      <nav>{children[0]}</nav>
      <Grid behavior={BEHAVIOR.fluid}>
        <Cell span={12}>
          <Block height={['100%']}>{children[1]}</Block>
        </Cell>
      </Grid>
    </div>
  )
}

const AuthRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  const auth = useSelector(selectAuth)

  return (
    <Route
      {...props}
      render={({ location }) => {
        return auth.isAuth ? (
          children
        ) : (
          <Redirect
            to={{ pathname: ROOT_ROUTES.login, state: { from: location } }}
          />
        )
      }}
    />
  )
}
const Routes: React.FC = () => {
  console.count('routes')
  return (
    <Outer>
      <HeaderNavigation>
        <StyledNavigationList>
          <StyledNavigationItem>
            <Link to={ROOT_ROUTES.home}>Home</Link>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <Link to={ROOT_ROUTES.nest}>Nest</Link>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <Link to={ROOT_ROUTES.locales}>Locales</Link>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <Link to={ROOT_ROUTES.fetch}>Fetch</Link>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <Link to={ROOT_ROUTES.login}>Login</Link>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <Link to={ROOT_ROUTES.auth}>Auth</Link>
          </StyledNavigationItem>
        </StyledNavigationList>
      </HeaderNavigation>

      <Switch>
        <Route exact path={ROOT_ROUTES.home}>
          <Home />
        </Route>
        <Route path={ROOT_ROUTES.nest}>
          <Nest />
        </Route>
        <Route path={ROOT_ROUTES.locales}>
          <Locales />
        </Route>
        <Route path={ROOT_ROUTES.fetch}>
          <Fetch />
        </Route>
        <Route path={ROOT_ROUTES.login}>
          <Login />
        </Route>
        <AuthRoute path={ROOT_ROUTES.auth}>
          <Auth />
        </AuthRoute>
        <Route path={ROOT_ROUTES.notFound}>
          <NotFound />
        </Route>
      </Switch>
    </Outer>
  )
}
export default Routes

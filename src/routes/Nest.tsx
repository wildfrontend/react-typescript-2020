import React from 'react'

import {
  Route,
  Switch,
  useRouteMatch,
  Link,
  useLocation,
  useParams,
  useHistory,
} from 'react-router-dom'
import { Location } from 'history'

import useTestRenderCount from 'hooks/useTestRenderCount'

import {
  HeaderNavigation,
  StyledNavigationItem,
  StyledNavigationList,
} from 'baseui/header-navigation'

const NestIdContent: React.FC<{ nestId: string }> = ({ nestId }) => {
  return <h1>nestId:{nestId}</h1>
}

const NestIdModal: React.FC = () => {
  const history = useHistory()
  const { nestId } = useParams()
  useTestRenderCount({ page: `nest-${nestId}-modal` })
  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation()
    history.goBack()
  }
  return (
    <div className="page--fixed">
      <div className="content" onClick={closeModal}>
        <NestIdContent nestId={nestId} />
      </div>
    </div>
  )
}

const NestId: React.FC<{}> = () => {
  const { nestId } = useParams()
  useTestRenderCount({ page: `nest${nestId}` })
  return (
    <div>
      <NestIdContent nestId={nestId} />
    </div>
  )
}

const NestDefault: React.FC<{}> = () => {
  const { url } = useRouteMatch()
  const location = useLocation()
  useTestRenderCount({ page: 'nest' })
  return (
    <div>
      <h1>Nest</h1>
      <ul>
        <li>
          <Link
            to={{
              pathname: `${url}/test1`,
              state: { nestId: location },
            }}
          >
            Nest Test 1
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: `${url}/test2`,
              state: { nestId: location },
            }}
          >
            Nest Test 2
          </Link>
        </li>
      </ul>
    </div>
  )
}

const Nest: React.FC = () => {
  const { path, url } = useRouteMatch()
  const location = useLocation<{ nestId?: Location<any> }>()

  const nestLocation = location?.state?.nestId
  console.log(nestLocation)
  useTestRenderCount({ page: 'NestRoute' })
  return (
    <div>
      <div>
        <HeaderNavigation>
          <StyledNavigationList>
            <StyledNavigationItem>
              <Link to={`${url}`}>Nest</Link>
            </StyledNavigationItem>
            <StyledNavigationItem>
              <Link to={`${url}/test1`}>Nest Test1</Link>
            </StyledNavigationItem>
            <StyledNavigationItem>
              <Link to={`${url}/test2`}>Nest Test2</Link>
            </StyledNavigationItem>
          </StyledNavigationList>
        </HeaderNavigation>
      </div>
      <Switch location={nestLocation || location}>
        <Route children={<NestDefault />} exact path={path} />
        <Route children={<NestId />} path={`${path}/:nestId`} />
      </Switch>
      {nestLocation && (
        <Route children={<NestIdModal />} path={`${path}/:nestId`} />
      )}
    </div>
  )
}

export default Nest

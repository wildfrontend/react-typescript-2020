import React, { Suspense, useEffect, useCallback } from 'react'
// helmet
import { Helmet } from 'react-helmet'
// axios
import { axiosInterceptor } from 'api/interceptor'
// i18n
import './i18n'
// router
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
// redux
import {
  Provider as ReduxProvider,
  useSelector,
  useDispatch,
} from 'react-redux'
import store from './store/configureStore'
import { selectModal, closeModal } from 'store/reducers/modal'
// baseweb ui
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'
import { Modal, ModalHeader, ModalBody } from 'baseui/modal'
// // components
// import Modal from 'components/Modal'
// css
import './styles/index.css'
// import { selectPage } from 'store/reducers/page'

const engine = new Styletron()

// const Providers: React.FC<any> = ({ children }) => {
//   const providers = [
//     ReduxProvider,
//     { store },
//     StyletronProvider,
//     { value: engine },
//     BaseProvider,
//     { theme: LightTheme },
//   ]

//   return (
//     providers.reduceRight((children, [Provider, props]) => {
//       return <Provider {...props}>{children}</Provider>
//     }),
//     children
//   )
// }
const Providers: React.FC = ({ children }) => {
  const appStore = store()
  useEffect(() => {
    axiosInterceptor(appStore)
  }, [appStore])
  return (
    <ReduxProvider store={appStore}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>{children}</BaseProvider>
      </StyletronProvider>
    </ReduxProvider>
  )
}

const RequestWarning: React.FC = () => {
  const dispatch = useDispatch()
  const modal = useSelector(selectModal)
  const handleCloseModal = useCallback(() => dispatch(closeModal()), [dispatch])
  useEffect(() => {
    if (modal.isOpen) {
      setTimeout(() => {
        handleCloseModal()
      }, 2000)
    }
  }, [handleCloseModal, modal.isOpen])
  return (
    <Modal isOpen={modal.isOpen}>
      <ModalHeader>API Error</ModalHeader>
      <ModalBody>{modal.message}</ModalBody>
    </Modal>
  )
}
const PageConfig: React.FC = () => {
  return (
    <React.Fragment>
      <Helmet>
        <html lang="tw" />
        <meta charSet="utf-8" />
      </Helmet>
      <RequestWarning />
    </React.Fragment>
  )
}
const App: React.FC<any> = () => {
  return (
    <Providers>
      <Suspense fallback={<div>...loading</div>}>
        <React.Fragment>
          <PageConfig />
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </React.Fragment>
      </Suspense>
    </Providers>
  )
}

export default App

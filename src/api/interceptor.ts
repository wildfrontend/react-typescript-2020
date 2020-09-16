import Axios, { AxiosResponse, AxiosError } from 'axios'
import { Store } from '@reduxjs/toolkit'
import { getRequestStatus } from 'store/reducers/request'
import { HttpStatusCode } from './HttpStatusCode'
import { openModal } from 'store/reducers/modal'
import { RootState } from 'store/rootReducer'

// const baseURL = 'https://jsonplaceholder.typicode.com'
// const baseURL = 'http://localhost:8000'
export type InterceptorErrorRes = {
  status?: HttpStatusCode,
  data: {
    status: number,
    message: string
  }
}

export const axiosInstance = Axios.create({
  // baseURL,
  timeout: 5000,
  timeoutErrorMessage: 'axios,5000毫秒過了',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

export const axiosInterceptor = (store?: Store<RootState>) => {
  axiosInstance.interceptors.request.use(
    (config): any => {
      console.log('intercepterRequest', config)
      const accessToken = store?.getState().auth.accessToken
      config.headers.Authorization = accessToken
      return config

    },
    (error) => {
      console.error('intercepterRequest', error)
      return Promise.reject(error);
    }
  )
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse): any => {
      console.log('intercepterResponse', response)
      return response
    },
    (error: AxiosError) => {
      console.error('intercepterResponse', error)
      const errorRes: InterceptorErrorRes = {
        status: error.response?.status,
        data: error.response?.data
      }
      store?.dispatch(getRequestStatus(errorRes))
      store?.dispatch(openModal({ message: errorRes.data.message }))
      return Promise.resolve(error.response);
    }
  )
}

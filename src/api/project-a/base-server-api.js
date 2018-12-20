import { BASE_API_URL } from '@Constants/project-a'

let baseServerApi = ''
switch (process.env.REACT_APP_BUILD_ENV) {
  case 'development':
    baseServerApi = BASE_API_URL.dev
    break
  case 'test-production':
    baseServerApi = BASE_API_URL.test
    break
  case 'production':
    baseServerApi = BASE_API_URL.pro
    break
  default:
    break
}

export { baseServerApi }

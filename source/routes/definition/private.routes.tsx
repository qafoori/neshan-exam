import { RoutesObject } from '../../core/types/routes.object.type'

import { HomePage } from '../../pages/home/index.page'

export const privateRoutes: RoutesObject = {
  sign_in: {
    get: '/',
    return: <HomePage />,
    title: 'Sign In',
  },
}

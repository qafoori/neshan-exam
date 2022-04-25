import { RoutesObject } from '../../core/types/routes.object.type'

import { HomePage } from '../../pages/home/index.page'

/**
 *
 *
 * will be here to define all private routes
 * the private routes will be defined in the app using `react-router-dom`,
 *   only if user has been authenticated and has access to these routes
 * this the concept of high level routing in the SPA (SinglePageApplications)
 */
export const privateRoutes: RoutesObject = {
  sign_in: {
    get: '/',
    return: <HomePage />,
    title: 'Sign In',
  },
}

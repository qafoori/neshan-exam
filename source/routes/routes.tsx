import { privateRoutes } from './definition/private.routes'
import { publicRoutes } from './definition/public.routes'

export const routes = {
  public: publicRoutes,
  private: privateRoutes,
}

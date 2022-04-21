import { FC, Suspense } from 'react'
import { store } from './core/store'
import { Provider as ReduxProvider } from 'react-redux'
import { RouteSwitcher } from './routes'
import { BrowserRouter } from 'react-router-dom'

export const App: FC = () => {
  return (
    <Suspense fallback={'loading...'}>
      <BrowserRouter>
        <ReduxProvider store={store}>
          <RouteSwitcher />
        </ReduxProvider>
      </BrowserRouter>
    </Suspense>
  )
}

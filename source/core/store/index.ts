import { rootReducers } from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'

const composeEnhancers = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export type RootState = ReturnType<typeof rootReducers>

export const store = createStore(rootReducers, composeEnhancers(applyMiddleware()))


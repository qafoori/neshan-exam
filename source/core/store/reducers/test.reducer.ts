import { actionTypes } from '../../constants'
import { ReducerPayload } from '../../types/reducer-payload.type'

const initialState = {
  test: 0,
}

export const testReducer = (states = initialState, { type, payload }: ReducerPayload): typeof initialState => {
  switch (type) {
    case actionTypes.TEST: {
      return {
        ...states,
        test: states.test + 1,
      }
    }

    default: {
      return states
    }
  }
}

type StoreType = {
  x: number
  pipes: any[]
}

const initialState = {
  x: 300,
  pipes: [],
}

export const pipeReducer = (state: StoreType = initialState, {type}: any = {}) => {
  switch (type) {
    case 'RUNNING':
      if (!state.pipes.length) {
        return state
      }

      return {...state, x: state.x - 10}
    case 'GENERATE':
      const topHeight = Math.round(Math.random() * 200) + 40

      return {...state, pipes: [...state.pipes, {topHeight}]}
    case 'GAME_OVER':
      return initialState
    default:
      return state
  }
}

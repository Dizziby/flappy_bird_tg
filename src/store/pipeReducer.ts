type StoreType = {
  x: number
  pipes: any[]
}

const initialState = {
  x: 390,
  pipes: [],
}

export const pipeReducer = (state: StoreType = initialState, action: any) => {
  switch (action.type) {
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
    case 'CHANGE_X':
      return {...state, x: action.x}
    default:
      return state
  }
}

export const changeWidthScreenAC = (width: number) => ({
  type: 'CHANGE_X',
  x: width,
})

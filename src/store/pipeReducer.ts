type StoreType = {
  x: number
  pipes: any[]
  heightScreen: number
}

const initialState = {
  x: 390,
  pipes: [],
  heightScreen: 512,
}

export const pipeReducer = (state: StoreType = initialState, action: any): StoreType => {
  switch (action.type) {
    case 'RUNNING':
      if (!state.pipes.length) {
        return state
      }
      return {...state, x: state.x - 10}
    case 'GENERATE':
      let topHeight = Math.round((Math.random() * state.heightScreen) / 1.5) + 40
      if (topHeight > state.heightScreen) {
        topHeight = state.heightScreen - 200
      }
      return {...state, pipes: [...state.pipes, {topHeight}]}
    case 'GAME_OVER':
      return initialState
    case 'SET_WIDTH_SCREEN':
      return {...state, x: action.widthScreen}
    case 'SET_HEIGHT_SCREEN':
      return {...state, heightScreen: action.heightScreen}
    default:
      return state
  }
}

export const setWidthScreenAC = (widthScreen: number) => ({
  type: 'SET_WIDTH_SCREEN',
  widthScreen: widthScreen,
})

export const setHeightScreenAC = (heightScreen: number) => ({
  type: 'SET_HEIGHT_SCREEN',
  heightScreen: heightScreen,
})

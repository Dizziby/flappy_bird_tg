import {useEffect, useRef} from 'react'
import {useAppSelector} from '../hooks/useAppSelector'
import {Foreground} from './Foreground'
import {useAppDispatch} from '../hooks/useAppDispatch'
import {Bird} from './Bird'
import {Pipe} from './Pipe'
import styles from './Game.module.css'
import {changeWidthScreenAC} from '../store/pipeReducer'
import flappyBird from '../../public/image/flappyBird.png'
import gameOver from '../../public/image/gameOver.png'
import play from '../../public/image/play.png'
import Image from 'next/image'

let gameLoop
let pipeGenerator

export const Game = () => {
  const status = useAppSelector((state) => state.game.status)
  const birdY = useAppSelector((state) => state.bird.y)
  const pipes = useAppSelector((state) => state.pipe.pipes)
  const x = useAppSelector((state) => state.pipe.x)

  const dispatch = useAppDispatch()

  if (status === 'game-over') {
    clearInterval(gameLoop)
    clearInterval(pipeGenerator)
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode === 32 && status === 'playing') {
        fly()
      }
    }
    const handleClick = (e) => {
      if( status === 'playing') {
        fly()
      }
    }

    document.addEventListener('keypress', handleKeyPress)
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('keypress', handleKeyPress)
      document.removeEventListener('click', handleClick)
    }
  }, [status])

  const handleStartGame = () => {
    if (status !== 'playing') {
      start(status)
    }
  }

  const birdYRef = useRef(null)
  const xRef = useRef(null)
  const pipesRef = useRef(null)

  useEffect(() => {
    birdYRef.current = birdY
  }, [birdY])

  useEffect(() => {
    xRef.current = x
  }, [x])

  useEffect(() => {
    pipesRef.current = pipes
  }, [pipes])

  useEffect(() => {
    const screenWidth = window ? window.screen.width : 390
    dispatch(changeWidthScreenAC(screenWidth))
  }, [])

  const start = (status) => {
    if (status !== 'playing') {
      gameLoop = setInterval(() => {
        dispatch({type: 'FALL'})
        dispatch({type: 'RUNNING'})

        check(birdYRef.current, xRef.current, pipesRef.current)
      }, 200)

      pipeGenerator = setInterval(() => {
        dispatch({type: 'GENERATE'})
      }, 3000)

      dispatch({type: 'START'})
    }
  }

  const fly = () => {
    dispatch({type: 'FLY'})
  }

  const check = (birdY, x, pipes) => {
    const challenge = pipes
      .map(({topHeight}, i) => {
        return {
          x1: x + i * 200,
          y1: topHeight,
          x2: x + i * 200,
          y2: topHeight + 100,
        }
      })
      .filter(({x1}) => {
        if (x1 > 0 && x1 < 288) {
          return true
        }
      })

    if (birdY > 512 - 134 || birdY < 0) {
      dispatch({type: 'GAME_OVER'})
    }

    if (challenge.length) {
      const {x1, y1, x2, y2} = challenge[0]

      console.log(x1, y1, x2, y2)

      if ((x1 < 120 && 120 < x1 + 52 && birdY < y1 ) || (x2 < 120 && 120 < x2 + 52 && birdY > y2 - 36)) {
        dispatch({type: 'GAME_OVER'})
      }
    }
  }

  return (
    <div className={styles.game}>
      {status === 'playing' ? (
        <Bird />
      ) : status === 'game-over' ? (
        <>
          <div className={styles.title}>
            <Image src={gameOver} width={250} height={50} alt={'Flappy bird'} />
            <button onClick={handleStartGame} style={{position: 'relative', left: '75px', top: '50px', background: "none", border: "0"}}>
              <Image
                  src={play}
                  width={100}
                  height={50}
                  alt={'Play'}
              />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.title}>
            <Image src={flappyBird} width={250} height={50} alt={'Game over'} />
            <button onClick={handleStartGame} style={{position: 'relative', left: '75px', top: '50px', background: "none", border: "0"}}>
              <Image
                  src={play}
                  width={100}
                  height={50}
                  alt={'Play'}
              />
            </button>
          </div>
        </>
      )}
      <Pipe />
      <Foreground />
    </div>
  )
}

import React from 'react'
import {useAppSelector} from '../hooks/useAppSelector'
import styles from './Pipe.module.css'

export const Pipe = () => {
  const x = useAppSelector((state) => state.pipe.x)
  const pipes = useAppSelector((state) => state.pipe.pipes)
  const heightScreen = useAppSelector((state) => state.pipe.heightScreen)

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      {pipes.map(({topHeight}, i) => (
        <div
          key={`pipe-${i}`}
          style={{
            position: 'relative',
          }}
        >
          <div
            className={styles.pipeOne}
            style={{
              position: 'absolute',
              top: 0,
              left: x + (i * heightScreen) / 2.5,
              width: 52,
              height: topHeight,
              // background: `url(${TopPipeImage})`,
              backgroundPosition: 'bottom',
              transition: 'left 300ms',
            }}
          />
          <div
            className={styles.pipeTwo}
            style={{
              position: 'absolute',
              top: topHeight + 100,
              left: x + (i * heightScreen) / 2.5,
              width: 52,
              height: heightScreen - topHeight - 100,
              // background: `url(${BottomPipeImage})`,
              transition: 'left 300ms',
            }}
          />
        </div>
      ))}
    </div>
  )
}

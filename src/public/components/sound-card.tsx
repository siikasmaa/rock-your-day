import React, { useContext } from 'react'
import classNames from 'classnames/bind'

import { AppContext } from '../app-context'
import { Sound } from '../types'
import styles from '../styles.scss'

const css = classNames.bind(styles)

export const SoundCard = ({ sound }: { sound: Sound }) => {
  const [playing, setIsPlaying] = React.useState(false)
  const { isSSR } = useContext(AppContext)

  const playSound = () => {
    const audio = new Audio(sound.src)
    setIsPlaying(true)
    audio.onended = () => setIsPlaying(false)
    audio.play()
  }

  return (
    <div
      className={css('card', 'text-center', {
        'bg-warning': playing,
        'bg-dark': !playing
      })}
      onMouseDown={playSound}
    >
      <h1
        className={css('my-auto', {
          'text-dark': playing,
          'text-white': !playing
        })}
      >
        {sound.title}
      </h1>
      {isSSR && <audio src={sound.src} controls />}
    </div>
  )
}

import React from 'react'
import classNames from 'classnames/bind'
import { Sound } from '../types'
import styles from '../styles.scss'

import { SoundCard } from './sound-card'

const css = classNames.bind(styles)

export const Board = ({ sounds }: { sounds: Sound[] }) => {
  return (
    <div className={css('container-fluid', 'soundboard')}>
      {sounds.map((sound, i) => (
        <SoundCard key={i} sound={sound} />
      ))}
    </div>
  )
}

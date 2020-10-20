import React from 'react'
import classNames from 'classnames/bind'
import { Board } from './components/board'

import styles from './styles.scss'
import { ContextProvider } from './app-context'

const css = classNames.bind(styles)

export const Page = ({ isSSR = false }) => {
  const sounds = [
    {
      title: 'Rock your day!',
      src:
        'https://storage.googleapis.com/sounds-storage/immonen/rock%20your%20day.mp3'
    },
    {
      title: 'Crazy things',
      src:
        'https://storage.googleapis.com/sounds-storage/immonen/crazy%20things.mp3'
    },
    {
      title: 'But remember',
      src:
        'https://storage.googleapis.com/sounds-storage/immonen/but%20remember.mp3'
    },
    {
      title: 'Good',
      src: 'https://storage.googleapis.com/sounds-storage/immonen/good.mp3'
    },
    {
      title: 'Peepol',
      src: 'https://storage.googleapis.com/sounds-storage/immonen/peepol.mp3'
    },
    {
      title: 'You need to protec yourself',
      src: 'https://storage.googleapis.com/sounds-storage/immonen/protec.mp3'
    },
    {
      title: 'Push yourself',
      src:
        'https://storage.googleapis.com/sounds-storage/immonen/push%20yurself.mp3'
    },
    {
      title: 'You need to',
      src:
        'https://storage.googleapis.com/sounds-storage/immonen/you%20need%20to.mp3'
    },
    {
      title: 'Tädää',
      src: 'https://storage.googleapis.com/sounds-storage/immonen/tadaa.mp3'
    },
    {
      title: 'This is your day',
      src:
        'https://storage.googleapis.com/sounds-storage/immonen/this%20is%20your%20day.mp3'
    },
    {
      title: 'Remember',
      src: 'https://storage.googleapis.com/sounds-storage/immonen/remember.mp3'
    },
    {
      title: 'Attitude',
      src: 'https://storage.googleapis.com/sounds-storage/immonen/attitude.mp3'
    }
  ]

  return (
    <ContextProvider value={{ isSSR }}>
      <div className={css('container-fluid')}>
        <h1 className={css('text-center', 'py-3', 'text-white', 'display-3')}>
          Rock Your Day!!!!
          <small className={css('text-muted')}> Soundboard</small>
        </h1>
        <div className={css('jumbotron-fluid')}>
          <Board sounds={sounds} />
        </div>
        <div className={css('image-container', 'text-center')}></div>
      </div>
    </ContextProvider>
  )
}

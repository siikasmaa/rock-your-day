addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}

const html = `<!DOCTYPE html>
<html>
  <head>
    <title>Rock your day! Soundboard</title>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=UA-92892902-1"
    ></script>
    <script>
      window.dataLayer = window.dataLayer || []
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag('js', new Date())

      gtag('config', 'UA-92892902-1')
    </script>
    <script
      src="https://unpkg.com/react@16/umd/react.production.min.js"
      crossorigin
    ></script>
    <script
      src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"
      crossorigin
    ></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <style>
      body {
        background-color: #1a1a2a;
        background-size: auto;
        background-position: center;
        z-index: 0;
        background-image: radial-gradient(circle, transparent 0%, #0a0b13 75%),
          url(https://storage.googleapis.com/sounds-storage/immonen/noise.png);
        background-repeat: repeat;
        background-size: auto;
        background-position: center;
        color: white;
      }

      .card {
        user-select: none;
        height: 20vh;
        opacity: 0.9;
      }

      .soundboard {
        display: grid;
        grid-template-columns: 33% 33% 33%;
        grid-column-gap: 5px;
        grid-row-gap: 5px;
      }

      .image-container {
        margin-top: 227px;
      }

      .image {
        transform: rotateZ(-15deg);
        position: fixed;
        bottom: -297px;
      }

      @media only screen and (max-width: 600px) {
        .soundboard {
          display: grid;
          grid-template-columns: 50% 50%;
        }
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script type="text/babel">
    const Board = ({ sounds }) => {
      return (
        <div className="container-fluid soundboard">
          {sounds.map((sound, i) => (
            <Sound key={i} sound={sound} />
          ))}
        </div>
      )
    }

    const Sound = ({ sound }) => {
      const [playing, setIsPlaying] = React.useState(false)

      const playSound = () => {
        const { audio } = sound
        setIsPlaying(true)
        audio.onended = () => setIsPlaying(false)
        audio.play()
      }

      return (
        <div
          className={'card text-center ' + (playing ? 'bg-warning' : 'bg-dark')}
          onClick={playSound}
        >
          <h1 className={'my-auto ' + (playing ? 'text-dark' : 'text-white')}>
            {sound.title}
          </h1>
        </div>
      )
    }

    const App = () => {
      const sounds = [
        {
          title: 'Rock your day!!!!',
          audio: new Audio(
            'https://storage.googleapis.com/sounds-storage/immonen/rock%20your%20day.mp3',
          ),
        },
        {
          title: 'Crazy things',
          audio: new Audio(
            'https://storage.googleapis.com/sounds-storage/immonen/crazy%20things.mp3',
          ),
        },
        {
          title: 'But remember',
          audio: new Audio(
            'https://storage.googleapis.com/sounds-storage/immonen/but%20remember.mp3',
          ),
        },
        {
          title: 'Good',
          audio: new Audio(
            'https://storage.googleapis.com/sounds-storage/immonen/good.mp3',
          ),
        },
        {
          title: 'Peepol',
          audio: new Audio(
            'https://storage.googleapis.com/sounds-storage/immonen/peepol.mp3',
          ),
        },
        {
          title: 'You need to protec yourself',
          audio: new Audio(
            'https://storage.googleapis.com/sounds-storage/immonen/protec.mp3',
          ),
        },
        {
          title: 'Push yourself',
          audio: new Audio(
            'https://storage.googleapis.com/sounds-storage/immonen/push%20yurself.mp3',
          ),
        },
        {
          title: 'You need to',
          audio: new Audio(
            'https://storage.googleapis.com/sounds-storage/immonen/you%20need%20to.mp3',
          ),
        },
      ]

      return (
        <div className="container-fluid">
          <h1 className="text-center py-3 text-white display-3">
            Rock Your Day!!!!<small class="text-muted"> Soundboard</small>
          </h1>
          <div className="jumbotron-fluid">
            <Board sounds={sounds} />
          </div>
          <div className="image-container text-center">
            <img
              className="image"
              onClick={() => sounds[0].audio.play()}
              src="https://storage.googleapis.com/sounds-storage/immonen/janne_immonen.png"
              alt="Janne Immonen"
            />
          </div>
        </div>
      )
    }

    ReactDOM.render(<App />, document.getElementById('root'))
  </script>
</html>
`

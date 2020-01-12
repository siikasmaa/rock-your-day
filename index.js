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
      src="https://unpkg.com/react@16/umd/react.production.min.js"
      crossorigin
    ></script>
    <script
      src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"
      crossorigin
    ></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <style>
      .card {
        user-select: none;
        height: 95px;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script type="text/babel">
    const Board = ({ sounds }) => {
      const playSound = url => {
        const snd = new Audio(url)
        snd.play()
      }

      return (
        <div className="container">
          {sounds.map((soundsRow, j) => (
            <div className="row no-gutters" key={j}>
              {soundsRow.map((sound, i) => (
                <div className="col">
                  <Sound key={'' + j + i} sound={sound} playSound={playSound} />
                </div>
              ))}
            </div>
          ))}
        </div>
      )
    }

    const Sound = ({ playSound, sound }) => (
      <div className="card text-center" onClick={() => playSound(sound.url)}>
        <div className="card-body">
          <h5 className="card-title">{sound.title}</h5>
        </div>
      </div>
    )

    const App = () => {
      const sounds = [
        [
          {
            title: 'Crazy things',
            url:
              'https://storage.googleapis.com/sounds-storage/immonen/crazy%20things.mp3',
          },
          {
            title: 'But remember',
            url:
              'https://storage.googleapis.com/sounds-storage/immonen/but%20remember.mp3',
          },
          {
            title: 'Good',
            url:
              'https://storage.googleapis.com/sounds-storage/immonen/good.mp3',
          },
        ],
        [
          {
            title: 'Peepol',
            url:
              'https://storage.googleapis.com/sounds-storage/immonen/peepol.mp3',
          },
          {
            title: 'You need to protec yourself',
            url:
              'https://storage.googleapis.com/sounds-storage/immonen/protec.mp3',
          },
          {
            title: 'Push yourself',
            url:
              'https://storage.googleapis.com/sounds-storage/immonen/push%20yurself.mp3',
          },
        ],
        [
          {
            title: 'Rock your day!',
            url:
              'https://storage.googleapis.com/sounds-storage/immonen/rock%20your%20day.mp3',
          },
          {
            title: 'You need to',
            url:
              'https://storage.googleapis.com/sounds-storage/immonen/you%20need%20to.mp3',
          },
        ],
      ]

      return (
        <div className="container-fluid">
          <h1 className="text-center py-3">Rock your day! Soundboard</h1>
          <div className="jumbotron-fluid">
            <Board sounds={sounds} />
          </div>
        </div>
      )
    }

    ReactDOM.render(<App />, document.getElementById('root'))
  </script>
</html>

`

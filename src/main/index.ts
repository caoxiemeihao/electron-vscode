import { app, BrowserWindow } from 'electron'

let win: BrowserWindow = null

function createApp() {
  win = new BrowserWindow({
    width: 1280,
    height: 768,
  })

  if (process.env.NODE_ENV === 'development') {
    win.loadURL(`http://localhost:${process.env.PORT}`)
  } else {

  }
}

app.on('window-all-closed', () => {
  win = null
})

app.whenReady().then(createApp)

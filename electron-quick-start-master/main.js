// Modules to control application life and create native browser window
const {app, BrowserWindow, session, dialog, Menu, MenuItem, Tray} = require('electron')
const path = require('path')

let menuTemplate  =[
  {
    label: "menu1",
    click() {console.log('menu1')},
    submenu: [ 
      {
        label: "menu11",
        accelerator: "CommandOrControl+T",
        click() {console.log('menu11')}
      }
    ]
  },
  {
    label: "menu2",
      submenu: [
      {
        label: "quit",
        role: "quit"
      }
    ]
  }
]

let menu = Menu.buildFromTemplate(menuTemplate)

let tray = null

function createWindow () {
  // Create the browser window.
  // Las sesiones por fromPartition no son persistentes
  // let sesMain = session.fromPartition('mainWindow')
  // Para volverlas persistentes
  // let sesMain = session.fromPartition('persist : mainWindow')

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 300,
    minWidth:500,
    maxWidth:1000,
    maxHeight:800,
    show: false,  //No carga la pantalla hasta que se carguen los estilos
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      //session: sesMain
    }
  })

  Menu.setApplicationMenu(menu)

  mainWindow.webContents.on('context-menu',(e,args)=>{
    menu.popup(mainWindow)
  })

  tray = new Tray('pip.jpg')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1'},
    {label: 'Item2'},
    {label: 'Item1', checked: true},
    {label: 'Item4'}
  ])

  tray.setToolTip('Mi aplicacion')
  tray.setContextMenu(contextMenu)
  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  //Cuando está todo cargado, lo muestra
  mainWindow.on('ready-to-show', ()=>{
    mainWindow.show()
  })

  
/* 
  let file = dialog.showOpenDialog(mainWindow, {}, (file)=>{
    console.log(file)
})
  console.log('Hola') */

 /*  secondWindow = new BrowserWindow({
    width: 500,
    height: 400,
    parent: mainWindow, //la ventana main es padre
    modal: true
  })
  
  secondWindow.loadURL(`file://${__dirname}/index2.html`)  */

  // Open the DevTools.
   //mainWindow.webContents.openDevTools()
   //secondWindow.webContents.openDevTools()

  /* mainWindow.webContents.on('new-window',(e,url)=>{
    console.log(url)
    e.preventDefault()
    let modalWindow = new BrowserWindow({
      width: 600,
      height:400,
      parent: mainWindow,
      modal: true
    })
    modalWindow.loadURL(url)
  })

  mainWindow.webContents.on('context-menu',(e,args)=>{
    console.log(args)
  })

  } */

  /* mainWindow.on('enter-full-screen',()=>{
    setTimeout(()=>{
      mainWindow.setFullScreen(false)
    },1000)
  })
  
  
  mainWindow.on('leave-full-screen',()=>{
    setTimeout(()=>{
      mainWindow.setFullScreen(true)
    },1000)
  })
  mainWindow.setFullScreen(true) */
}
  

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
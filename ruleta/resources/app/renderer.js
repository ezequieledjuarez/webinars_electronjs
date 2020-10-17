// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
setInterval(()=>{
    let number = Math.floor(Math.random() * 36) //numero random del 0 al 36

    document.getElementById("numero").innerHTML = number
}, 2000)
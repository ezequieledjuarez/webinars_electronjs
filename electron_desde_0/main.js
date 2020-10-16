setInterval(()=>{
    let number = Math.floor(Math.random() * 36) //numero random del 0 al 36

    document.getElementById("numero").innerHTML = number
}, 2000)
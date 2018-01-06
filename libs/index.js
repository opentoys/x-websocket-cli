const cmd = require("commander")
const package = require("../package.json")
const Client = require("./client")

cmd
    .version(package.version)
    .option("-H,--host [value]","指定连接的socket服务端")
    .option("-p,--port [value]","指定监听本地的端口")
    .parse(process.argv);


const socket = require('socket.io-client')(cmd.host)

const client = new Client(cmd.port)

socket.on("connect",(data)=>{
    console.log("连接成功",data)
    socket.send("iamhost")
})

socket.on("url",(url)=>{
    console.log(url)
    client.getUrl(url,(buf)=>{
        console.log(buf)
        socket.emit("urldata",url,buf)
    })    
})

socket.on("error",(err)=>{
    console.log("服务器连接失败",err)
})

socket.on("disconnect",(data)=>{
    console.log("服务器已关闭",data)
})

module.exports=cmd

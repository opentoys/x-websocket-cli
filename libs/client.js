const http = require("http")
const url = require('url')

const Eventer = require('events')

class BufferDataEventer extends Eventer {}


class Client {
    constructor(port){
        this.port=port
        this.origin=`http://localhost:${port}`
    }

    getUrl(uri,cb){
        // 解析请求url
        let ops = url.parse(this.origin+uri)

        // 自定义事件,用于获取buffer对象
        let bufferDataEventer = new BufferDataEventer()
        // 原生http发起请求,并根据自定义事件传入数据
        http.request(ops,res=>{
            res.on('data',chunk=>{
                console.log(chunk)
                bufferDataEventer.emit('data',chunk)
            })
            res.on('end',()=>{
                bufferDataEventer.emit('end')
            })
            
        }).end()
        // 定义接收buffer对象的数组
        let bufArr = []
        // 接收对象
        bufferDataEventer.on('data',chunk=>{
            bufArr.push(chunk)
        })
        // 组合对象,并放在回调函数中带回
        bufferDataEventer.on('end',()=>{
            cb(Buffer.concat(bufArr))
        })

    }    

}

module.exports=Client
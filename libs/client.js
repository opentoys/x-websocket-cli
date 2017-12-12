const request = require("request")

class Client {
    constructor(port){
        this.port=port
        this.origin=`http://localhost:${port}`
    }

    getUrl(uri,cb){
        let url = this.origin+uri
        request(url,cb)
    }    

}

module.exports=Client
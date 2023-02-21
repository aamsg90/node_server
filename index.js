// import your http
const http = require("http")

// creat server with HTTP
const server = http.createServer((req, res)=> {
    console.log("server is created")
})

// initiate port
const PORT = 4000

// lisiten to server
server.listen(PORT, ()=> console.log(`server is runing on port ${PORT}`))
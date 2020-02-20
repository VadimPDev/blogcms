const env = 'dev'

if(env === 'dev') {
    module.exports = {url:"http://localhost:5000/"}
}else{
    module.exports = {url:"http://localhost/"}
}
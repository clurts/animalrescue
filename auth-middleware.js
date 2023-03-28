module.exports = function(request, response, next) {
    
    if(!request.headers.authorization) {
        return response.status(401).end()
    }

    if(request.headers.authorization != `Bearer ${process.env.TOKEN}`) {
        return response.status(403).send("Invalid token!")
    }

    next()
}
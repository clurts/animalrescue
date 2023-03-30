const express = require("express")
const router = express.Router()
const Animal = require("../models/animals.model")
const auth = require("../auth-middleware")


// get all animals
/*router.get("/animals", async function(request, response, next) {
    try {
        let result = await Animal.find();
        return response.status(200).json(result)
    } catch (error) {
        return next(error);
    }
})*/

/* 
response: 
{
    count: 1234,
    next: "http://localhost:4000/api/v1/animals?offset=25&limit=5",
    previous: http://localhost:4000/api/v1/animals?offset=15&limit=5,
    results: [],
    url: http://localhost:4000/api/v1/animals?offset=0&limit=5
}
*/

// http://localhost:4000/api/v1/animals?offset=20&limit=5
router.get("/animals", async function(request, response, next) {

    let offset = parseInt(request.query.offset) || 0;
    let limit = parseInt(request.query.limit) || 5;

    try {
        let count = (await Animal.find()).length;
        let results = await Animal.find().skip(offset).limit(limit);

        let queryStringNext = `?offset=${offset+limit}&limit=${limit}`
        let queryStringPrev = null;

        if( offset >= limit) {
            queryStringPrev = 
                `?offset=${offset-limit}&limit=${limit}`
        }

        let apiUrl = `${request.protocol}://${request.hostname}${request.hostname==='localhost' ? ":4000" : '' }`
        let apiPath = `${request.baseUrl}${request.path}`

        
        let output = {
            count,
            next: (offset + limit < count) ? apiUrl + apiPath + queryStringNext : null,
            previous: offset > 0 ? apiUrl + apiPath + queryStringPrev : null,
            results,
            url: apiUrl + request.originalUrl  
        }


        return response.status(200).json(output)
    } catch (error) {
        return next(error);
    }
})

// get single animal by id
router.get("/animals/:id", async function(request, response, next){
    try {
        let result = await Animal.findById(request.params.id)
        return response.status(200).json(result)
    } catch (error) {
        return next(error)
    }
})

// add an animal
router.post("/animals", auth, async function(request, response, next) {
    try {
        let animal = await Animal.create(request.body)
        return response.status(201).json(animal)

    } catch (error) {
        return next(error)
    }
})

// update an animal by id
router.patch("/animals/:id", auth, async function(request, response, next) {
    try {
        let updatedAnimal = await Animal.findByIdAndUpdate(request.params.id, request.body, { new: true})
        return response.status(200).json(updatedAnimal)
    } catch (error) {
        return next(error)
    }
})

// delete an animal by id
router.delete("/animals/:id", auth, async function(request, response, next) {
    try {
        await Animal.findByIdAndDelete(request.params.id)

        return response.status(204).end()

    } catch (error) {
        return next(error)
    }
})

module.exports = router;
const express = require('express')
const axios = require('axios');

require('dotenv').config({ path: './config/config.env' })

const app = express()

app.get('/', (req, res) => {
    res.send('<h1><a href="https://github.com/Organiczny/distanceAPI" target="_blank">Documentation</a></h1>')
})

app.get('/api', async (req, res) => {
    if (check(req, res)) return
    let loc1 = { name: req.query.loc_1 }
    let loc2 = { name: req.query.loc_2 }

    loc1.cords = await getLoc(loc1.name)
    loc2.cords = await getLoc(loc2.name)

    let data = await getDistanceAndTime(loc1.cords, loc2.cords)
    let json = {
        loc1: loc1,
        loc2: loc2,
        distance: data.distance,
        time: data.time
    }

    console.log('JSON= ' + JSON.stringify(json))
    res.json(json)
})

function check(req, res) {
    console.log(`loc1="${req.query.loc_1}"   loc2="${req.query.loc_2}"`)
    if (req.query.loc_1 == undefined || req.query.loc_2 == undefined) {
        res.json({ error: 'Bad params' })
        return true
    }
    return false
}

async function getDistanceAndTime(cords1, cords2) {
    let res = await axios.get(`http://router.project-osrm.org/route/v1/driving/${cords1.lon},${cords1.lat};${cords2.lon},${cords2.lat}?annotations=distance`)

    let distance = res.data.routes[0].distance / 1000
    let time = res.data.routes[0].duration / 3600

    return {
        distance: distance,
        time: time
    }
}

async function getLoc(name) {
    let res = await axios.get(`https://nominatim.openstreetmap.org/search/${name}?format=json&`)

    let data
    if (Array.isArray(res.data)) { data = res.data[0] }
    else { data = res.data }

    return {
        lat: data.lat,
        lon: data.lon
    }
}

app.listen(process.env.PORT, () => { console.log(`Sever starts on ${process.env.PORT}`) })
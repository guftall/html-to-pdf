
const express = require('express')
const getPdf = require('./index').getPdf
const app = express()
const port = 3000
app.use(express.static('assets'))

app.get('/', (req, res) => {
    (async() => {

        res.end(await getPdf())
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

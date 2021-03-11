
const express = require('express')
const getPdf = require('./index').default
const app = express()
const port = 3000
app.use(express.static('assets'))

app.get('/', (req, res) => {
    res.send(getPdf())
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

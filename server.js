const express = require('express')
const fs = require('fs')
require('./index')
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.use('/public', express.static('public'))

app.get('/commutes/:work/:home?', (req, res) => {
  const {work, home} = req.params
  try {
    const paths = fs.readdirSync('./data', 'utf8')
    let commutes = paths.map((path) => {
      return JSON.parse(fs.readFileSync(`./data/${path}`, 'utf8'))
        .filter((c) => c.work === work && c.home === home) 
    })
    commutes = [].concat.apply([], commutes)
    res.render('index', {traffic: commutes, date: null})
  } catch (e) {
    console.log(e)
    res.sendStatus(404)
  }
})

app.get('/:date/:work?', (req, res) => {
  const { date, work } = req.params
  try {
    const path = `./data/${date}.json`
    const data = JSON.parse(fs.readFileSync(path, 'utf8')).filter(d => d.work === work)
    res.render(`index`, {traffic: data, date})
  } catch (e) {
    console.log(e)
    res.sendStatus(404)
  }
})

const fetchCommutes = (numDays) => {
  let results = []
  let date = new Date()
  for (i = numDays; i > 0; i--) {
    try {
      const path = `./data/${getFormattedDate(date)}.json`
      const data = JSON.parse(fs.readFileSync(path, 'utf8'))
      results = results.concat(data)
    } catch (e) {
      console.log(e)
    }
  }
  return results
}

const getFormattedDate = (date) => {
  return `${date.getMonth() + 1}-${date.getDate()}`
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
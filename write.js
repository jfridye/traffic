const fs = require('fs')

function updateFile (results, date) {

  const filename = `./data/${date.getMonth() + 1}-${date.getDate()}.json`

  if (!fs.existsSync(filename)) {
    fs.writeFileSync(filename, '[]')
  }

  try {
    let data = fs.readFileSync(filename, 'utf8')
    data = JSON.parse(data).concat(results)
    fs.writeFileSync(filename, JSON.stringify(data))
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  updateFile,
}
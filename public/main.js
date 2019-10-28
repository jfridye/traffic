function ready(fn) { document.addEventListener('DOMContentLoaded', fn) }

ready(() => {

  const commutes = window.trafficData
  const chartEl = document.getElementById('chart')

  const colors = [
    '#edc951', '#eb6841', '#cc2a36', '#4f372d', '#00a0b0', '#008744',
    '#0057e7', '#d62d20', '#ffa700'
  ]

  const datasets = commutes.reduce((prev, next) => {
    const data = {x: next.timeOfDay, y: next.commuteTime}
    if (prev[next.home]) {
      prev[next.home].push(data)
    } else {
      prev[next.home] = [data]
    }
    return prev
  }, {})

  const data = Object.keys(datasets).map((k, idx) => {
    return {
      label: k,
      data: datasets[k],
      fill: false,
      borderWidth: 3,
      borderColor: colors[idx % 9],
    }
  }).sort((a, b) => {
    if (a.label > b.label) { return 1 }
    else if (a.label < b.label) { return -1 }
    return 0
  })

  new Chart(chartEl, {
    type: 'line',
    data: {datasets: data},
    options: {
      scales: {
        yAxes: [{ticks: {beginAtZero: true}}],
        xAxes: [{type: 'time', time: {unit: 'minute', displayFormats: {minute: 'h:mm'}}}],
      },
      legend: {
        position: 'right',
      }
    }
  })

})
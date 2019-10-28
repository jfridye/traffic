const puppeteer = require('puppeteer')
const CronJob = require('cron').CronJob
const locs = require('./locations')
const { updateFile } = require('./write')

const scrape = async (locs) => {

    const timeOfDay = Date.now()
    const browser = await puppeteer.launch()

    const requests = locs.map(async (loc) => {
        
        let page, el, timeHandle, time
       
        try {
            page = await browser.newPage()
            await page.goto(loc.url)
            el = await page.waitForSelector('#pane > div > div.widget-pane-content.scrollable-y > div > div > div.section-trip-summary.noprint > div.section-trip-summary-header > h1 > span:nth-child(1) > span')
            timeHandle = await el.getProperty('textContent')        
            time = await timeHandle.jsonValue()
        } catch (e) {
            console.log(`error for ${loc.url}`)
        }

        return { 
            home: loc.home, 
            work: loc.work, 
            timeOfDay: timeOfDay, 
            commuteTime: Number.parseInt(time),
        }
    })

    return Promise.all(requests).then(async (results) => {
        await browser.close()
        return results
    })

}

const run = async () => {
    const now = new Date()
    const isAfternoon = now.getHours() >= 12
    const urls = isAfternoon ? locs.PM : locs.AM
    try {
        const rawResults = await scrape(urls)
        const results = [].concat.apply([], rawResults)
        updateFile(results, now)
        console.log('done')
    } catch (e) {
        console.log(e)
    }
}

new CronJob({
    cronTime: '*/15 * * * *', 
    onTick: () => {
        console.log('fetching commutes')
        run()
    },
    runOnInit: true,
}).start()

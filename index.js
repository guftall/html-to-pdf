const http = require('http');
const puppeteer = require('puppeteer')
const fs = require('fs');

http.createServer((req, res) => {
    (async () => {
        // launch a new chrome instance
        const browser = await puppeteer.launch({
            headless: true
        })

        // create a new page
        const page = await browser.newPage()

        // set your html as the pages content
        const html = fs.readFileSync(`${__dirname}/template.html`, 'utf8')
        await page.setContent(html, {
            waitUntil: 'domcontentloaded'
        })

        // create a pdf buffer
        const pdfBuffer = await page.pdf({
            format: 'A4'
        })

        res.end(pdfBuffer)
        // or a .pdf file
        await page.pdf({
            format: 'A4',
            path: `${__dirname}/my-fance-invoice.pdf`
        })

        // close the browser
        await browser.close()
    })()
}).listen(1337, '0.0.0.0');


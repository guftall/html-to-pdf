const puppeteer = require('puppeteer')
const fs = require('fs');

export default async function getPdf() {
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

    // close the browser
    await browser.close()

    return pdfBuffer
}


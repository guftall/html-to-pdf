const puppeteer = require('puppeteer')
const fs = require('fs');

exports.getPdf = async function getPdf() {
    const browser = await puppeteer.launch({
        headless: true
    })

    // create a new page
    const page = await browser.newPage()

    let file = `${__dirname}/template.html`
    // set your html as the pages content
    const html = fs.readFileSync(file, 'utf8')
    await fs.writeFile(file, html, { encoding: 'utf8' })
    await page.goto(`file://${file}`, { waitUntil: 'networkidle0' })

    // create a pdf buffer
    const pdfBuffer = await page.pdf({
        format: 'A4'
    })

    // close the browser
    await browser.close()

    return pdfBuffer
}


import { launch } from 'puppeteer'
import * as fs from "fs";
import { URL } from 'url';

const __dirname = new URL('.', import.meta.url).pathname;

(async () => {
  // launch a new chrome instance
  const browser = await launch({
    headless: "new"
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

  // or a .pdf file
  await page.pdf({
    format: 'A4',
    path: `${__dirname}/my-fance-invoice.pdf`
  })

  // close the browser
  await browser.close()
})()
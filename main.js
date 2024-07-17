import { argv } from 'node:process'
import { crawlPage } from './crawl.js'
import { printReport } from './report.js'

async function main() {
  const args = argv.slice(2)

  if (args.length < 1) {
    console.log('Not enough arguments passed')
    return 1
  }

  if (args.length > 1) {
    console.log('Too many arguments passed')
    return 1
  }

  const baseURL = args[0]
  console.log(`Crawling: ${baseURL}`)
  const pages = await crawlPage(baseURL)
  printReport(pages)
}

main()

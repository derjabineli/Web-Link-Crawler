import { JSDOM } from 'jsdom'

function normalizeUrl(url) {
  const urlObj = new URL(url)
  let normalized = urlObj.host + urlObj.pathname
  if (normalized.slice(-1) === '/') {
    normalized = normalized.slice(0, -1)
  }
  return normalized
}

function getURLsFromHTML(html, url) {
  const dom = new JSDOM(html)
  const aTags = dom.window.document.querySelectorAll('a')
  const urls = []
  aTags.forEach((tag) => {
    if (tag.hasAttribute('href')) {
      let href = tag.getAttribute('href')

      try {
        href = new URL(href, url).href
        urls.push(href)
      } catch (err) {
        console.log(`${err.message}: ${href}`)
      }
    }
  })
  return urls
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  const currentURLObj = new URL(currentURL)
  const baseURLObj = new URL(baseURL)
  if (currentURLObj.hostname !== baseURLObj.hostname) {
    return pages
  }

  const normalizedURL = normalizeUrl(currentURL)
  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++
    return pages
  }
  pages[normalizedURL] = 1

  let res
  try {
    res = await fetch(currentURL)
  } catch (err) {
    console.log(err.message)
  }
  if (res.status >= 400) {
    console.log(`HTTP Error: ${res.status} ${res.statusText}`)
    return
  }

  const contentType = res.headers.get('Content-Type')
  if (!contentType || !contentType.includes('text/html')) {
    console.log(`${currentURL} did not provide text/html`)
    return
  }
  const html = await res.text()
  const urls = getURLsFromHTML(html, baseURL)
  urls.forEach((url) => {
    crawlPage(baseURL, url, pages)
  })

  return pages
}

crawlPage('https://wagslane.dev')

export { normalizeUrl, getURLsFromHTML, crawlPage }

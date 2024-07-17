import { test, expect } from '@jest/globals'
import { normalizeUrl, getURLsFromHTML } from './crawl'

test('normalize url', () => {
  const input = 'https://blog.boot.dev/path'
  const actual = normalizeUrl(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toBe(expected)
})

test('normalize url with slash', () => {
  const input = 'https://blog.boot.dev/path/'
  const actual = normalizeUrl(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toBe(expected)
})

test('normalize url capitals', () => {
  const input = 'https://BLOG.boot.dev/path'
  const actual = normalizeUrl(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toBe(expected)
})

test('get urls from html', () => {
  const html = `<html>
  <body>
      <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
      <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
  </body>
</html>`
  const baseUrl = 'https://blog.boot.dev'
  const aTags = getURLsFromHTML(html, baseUrl)
  expect(aTags).toStrictEqual([
    'https://blog.boot.dev/',
    'https://blog.boot.dev/',
  ])
})

test('get relative urls from html', () => {
  const html = `<html>
    <body>
        <a href="/home"><span>Go to Boot.dev</span></a>
        <a href="/test"><span>Go to Boot.dev</span></a>
    </body>
  </html>`
  const baseUrl = 'https://blog.boot.dev'
  const aTags = getURLsFromHTML(html, baseUrl)
  expect(aTags).toStrictEqual([
    'https://blog.boot.dev/home',
    'https://blog.boot.dev/test',
  ])
})

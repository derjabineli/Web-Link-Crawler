function printReport(pages) {
  console.log('Report is starting!')
  console.log('___________________ \n')
  const sortedKeys = sortReport(pages)
  sortedKeys.forEach((key) => {
    console.log(`Found ${pages[key]} internal links to ${key}`)
  })
}

function sortReport(obj) {
  const sortedKeys = Object.keys(obj).sort(function (a, b) {
    return obj[b] - obj[a]
  })
  return sortedKeys
}

export { printReport }

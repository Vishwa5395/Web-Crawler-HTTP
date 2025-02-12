const{normalizeURL,getURLsfromHTML}=require('./crawl.js')
const{test,expect}=require('@jest/globals')


test('normalizeURL strip protocol',()=>{
    const input='https://boot.dev/path'
    const actual=normalizeURL(input)
    const expected='boot.dev/path'
    expect(actual).toEqual(expected)
})


test('normalizeURL strip trailing slash',()=>{
    const input='https://boot.dev/path/'
    const actual=normalizeURL(input)
    const expected='boot.dev/path'
    expect(actual).toEqual(expected)
})


test('normalizeURL capitals',()=>{
    const input='https://BOOT.dev/path/'
    const actual=normalizeURL(input)
    const expected='boot.dev/path'
    expect(actual).toEqual(expected)
})



test('normalizeURL strip http',()=>{
    const input='https://boot.dev/path/'
    const actual=normalizeURL(input)
    const expected='boot.dev/path'
    expect(actual).toEqual(expected)
})



test('getURLsfromHTML absolute URL',()=>{
    const inputHTML=`
    <html>
        <body>
            <a href="https://boot.dev/">Boot.dev</a>
            <a href="https://boot.dev/path">Boot.dev with path</a>
        </body>
    </html>
    `
    const inputURL ="https://boot.dev"
    const actual=getURLsfromHTML(inputHTML,inputURL)
    const expected=['https://boot.dev/','https://boot.dev/path']
    expect(actual).toEqual(expected)
})





test('getURLsfromHTML relative URL',()=>{
    const inputHTML=`
    <html>
        <body>
            <a href="/">Boot.dev</a>
            <a href="/path/">Boot.dev with path</a>
        </body>
    </html>
    `
    const inputURL ="https://boot.dev"
    const actual=getURLsfromHTML(inputHTML,inputURL)
    const expected=['https://boot.dev/','https://boot.dev/path/']
    expect(actual).toEqual(expected)
})



test('getURLsfromHTML both',()=>{
    const inputHTML=`
    <html>
        <body>
            <a href="/">Boot.dev</a>
            <a href="https://boot.dev/path">Boot.dev with path</a>
        </body>
    </html>
    `
    const inputURL ="https://boot.dev"
    const actual=getURLsfromHTML(inputHTML,inputURL)
    const expected=['https://boot.dev/','https://boot.dev/path']
    expect(actual).toEqual(expected)
})



test('getURLsfromHTML invalid URL',()=>{
    const inputHTML=`
    <html>
        <body>
            <a href="invalid">Invalid URL</a>
        </body>
    </html>
    `
    const inputURL ="https://boot.dev"
    const actual=getURLsfromHTML(inputHTML,inputURL)
    const expected=[]
    expect(actual).toEqual(expected)
})








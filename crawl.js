const {JSDOM} = require('jsdom')


async function crawlPage(baseURL,currentURL,pages){
    
    const baseURLobj=new URL(baseURL)
    const currentURLobj=new URL(currentURL)
    if(baseURLobj.hostname!==currentURLobj.hostname){
        return pages
    }

    const normalizeCurrentURLs = normalizeURL(currentURL)
    if(pages[normalizeCurrentURLs]>0){
        pages[normalizeCurrentURLs]++
        return pages
    }

    pages[normalizeCurrentURLs]=1



    console.log(`Actively Crawling: ${currentURL}`)
    try{
        const response=await fetch(currentURL)

        if(response.status>399){
            console.log(`error in fetch with status : ${response.status} on the crawling page: ${currentURL}`)
            return pages
        }
        const contentType=response.headers.get("Content-type")
        if(!contentType.includes("text/html")){
            console.log(`non html response, content type: ${contentType} on the crawling page: ${currentURL}`)
            return pages
        }

        const htmlBody=await response.text()
        
        const nextUrl=getURLsfromHTML(htmlBody,baseURL)

        for(const nexturl of nextUrl){
            pages=await crawlPage(baseURL,nexturl,pages)
        }


    }catch(err){
        console.log(`error in fetch: ${err.message}, on current crawling page ${currentURL}`)
    }

    return pages
}





function getURLsfromHTML(htmlBody,baseURL){
    const urls=[]
    const dom=new JSDOM(htmlBody)
    const links= dom.window.document.querySelectorAll('a')
    for(const link of links){
        if(link.href.slice(0,1)==='/'){
            // relative URL
            try{
                const urlobj=new URL(`${baseURL}${link.href}`)
                urls.push(urlobj.href)
            }catch(err){
                console.log(`Error parsing relative URL: ${err.message}`)
            }
            
        }else{
            try{
                const urlobj=new URL(link.href)
                urls.push(urlobj.href)
            }catch(err){
                console.log(`Error parsing relative URL: ${err.message}`)
            }
        }   
    }
    return urls
}

function normalizeURL(urlString){
    const urlobj=new URL(urlString);
    const hostpath= `${urlobj.hostname}${urlobj.pathname}`;
    if(hostpath.length>0 && hostpath.slice(-1)==='/'){
        return hostpath.slice(0,-1)
    }
    return hostpath
}

module.exports ={
    normalizeURL,
    getURLsfromHTML,
    crawlPage
}
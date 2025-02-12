const {JSDOM} = require('jsdom')


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
    getURLsfromHTML
}
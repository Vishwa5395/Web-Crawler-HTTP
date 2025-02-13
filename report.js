function printReport(pages){
    console.log("------------")
    console.log("FINAL REPORT")
    console.log("------------")
    const sortPages=sortpages(pages)
    for(const sortpage of sortPages){
        const url=sortpage[0]
        const hits=sortpage[1]
        console.log(`URL: ${url} , Hits: ${hits}`)
    }
    console.log("------------")
    console.log("REPORT ENDS")
    console.log("------------")
}



function sortpages(pages){
    const pagesArr=Object.entries(pages)
    pagesArr.sort((a,b) => {
        aHits=a[1],
        bHits=b[1]
        return b[1]-a[1]
    })
    return pagesArr
}


module.exports={
    sortpages,
    printReport
}
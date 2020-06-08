export function textSearch ({filteredData}) {
    let mwQueryUrl = '/mediawiki2017/api.php?action=query&list=search&format=json&srwhat=text&srlimit=200&srsearch=' + props.textfilter
    let itempagearray = []
    async function fetchSearchResults() {
        const response = await fetch(mwQueryUrl);
        // console.log(response)
        let json = await response.json()
        boxicate(json)
    }
    function boxicate(sresults) {
        // takes mediawiki pagename, parses it and converts from base64, pushes it into itempagearray 
        let b64converter = sresults.map(srrr => {
            const btitle = srrr.title.split('.')
            // always starts with a . so btitle[0] is always ""
            const aitem = atob(btitle[1])
            const apage = parseInt(atob(btitle[2]))
            // using == instead of === because type is different / gotta parseInt apage tho because indexOf can't ignore type (see line 29)
            const matchitem = itempages.find(ip => ip.id == aitem)
            console.log(matchitem.pages)
            // if the page isn't in the array of pages for that item, it's not added
            if (matchitem !== undefined && matchitem.pages.indexOf(apage) > -1) {
                if (itempagearray.find(ipa => ipa.item === aitem) === undefined ){
                    itempagearray.push({item: aitem, pages: [{page: apage, snippet: srrr.snippet}]})
                } else {
                    itempagearray.find(ip => ip.item === aitem).pages.push({page: apage, snippet: srrr.snippet})
                }
            }
        })
        const textFilteredData = filteredData.filter((i => itempagearray.find(ipa => ipa.item == i.id)) !== undefined)
        return textFilteredData
    }
}

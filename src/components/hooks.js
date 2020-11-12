import  { useState, useEffect } from "react";

export function useFetch(url, sort) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    async function fetchUrl() {
        let json;
        if (url === '/transcription/mms-transcribe/api/items/'){
            const responseOne = await fetch(url)
            const urlTwo = url + '?page=2'
            const responseTwo = await fetch(urlTwo)
            let jsonOne = await responseOne.json()
            let jsonTwo = await responseTwo.json()
            Array.prototype.push.apply(jsonOne,jsonTwo)
            json = jsonOne
        } else {
            const response = await fetch(url)
            json = await response.json()
        }
        // json = sort ? json.sort(function(x, y) {
        //     let xdp, ydp;
        //     x.element_texts.map(et => {
        //         if (et.element.name === 'Coverage') {
        //             xdp = et.text
        //         }
        //     })
        //     y.element_texts.map(et => {
        //         if (et.element.name === 'Coverage') {
        //             ydp = et.text
        //         }
        //     })
        //   console.log(x.id + ': daily percent: ' + xdp)
        //     return parseInt(xdp) > parseInt(ydp) ? 1 : -1
        // }) : json
        setData(json);
        setLoading(false);
    }
    useEffect(() => {
        fetchUrl();
    }, []);
    return [data, loading];
}

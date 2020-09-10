import  { useState, useEffect } from "react";

export function useFetch(url, sort) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    async function fetchUrl() {
        const response = await fetch(url);
        let json = await response.json()
        json = sort ? json.sort(function(x, y) {
            let xdp, ydp;
            x.element_texts.map(et => {
                if (et.element.name === 'Coverage') {
                    xdp = et.text
                }
            })
            y.element_texts.map(et => {
                if (et.element.name === 'Coverage') {
                    ydp = et.text
                }
            })
          console.log(x.id + ': daily percent: ' + xdp)
            return parseInt(xdp) > parseInt(ydp) ? 1 : -1
        }) : json
        setData(json);
        setLoading(false);
    }
    useEffect(() => {
        fetchUrl();
    }, []);
    return [data, loading];
}

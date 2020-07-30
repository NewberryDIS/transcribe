import  { useState, useEffect } from "react";

export function useFetch(url, sort) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    async function fetchUrl() {
        const response = await fetch(url);
        // console.log(response)
        let json = await response.json()
        json = sort ? json.sort(function(a, b) {
          let aweight, bweight
          a.element_texts.map(et => {
            if(et.element.name === 'Percent Completed'){
              aweight = et.text
            }
          })
          b.element_texts.map(et => {
            if(et.element.name === 'Percent Completed'){
              bweight = et.text
            }
          })
          return aweight - bweight
        }).sort(function(x, y) {
          return (x.featured === y.featured) ? 0 : x ? -1 : 1;
        }) : json
        setData(json);
        setLoading(false);
    }
    useEffect(() => {
        fetchUrl();
    }, []);
    return [data, loading];
}

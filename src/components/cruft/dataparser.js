import React from 'react'

const data = require('../data/items.json');

let itemObj = {}
let subjectObj = {}
let dateObj = {
    decades: [],
    years: []
}
function DataParser() {
    data.map((item) => {
        let id = item.id
        let name = ''
        let longDateString = ''
        let dates = []
        let dateRange = ''
        let decades = []
        let subjects = []
        let desc = ''
        let image = ''
        item.element_texts.map((et) => {
            if (et.element.name === 'Title') {
                name = et.text
                longDateString = name.slice(name.lastIndexOf(',')+2).trim()
                dateRange = longDateString.match(/[0-9]{4}-[0-9]{4}/)
                if ( dateRange != null ){
                    dates.push(parseInt(dateRange.slice(0,4)), parseInt(dateRange.slice(5,9)))
                } else if (longDateString.match(/[0-9]{4}/) != null) {
                    dates.push(parseInt(longDateString.match(/[0-9]{4}/)))
                } 
            } else if (et.element.name === 'Subject'){
                subjects.push(et.text)
            } else if (et.element.name === 'Relation') {
                desc = et.text
            } else if (et.element.name === 'Source' && et.text.indexOf('http' === 0)) {
                image = et.text
            }
        })
        decades = dates.map((d) => {
            return ((Math.floor(d / 10)) * 10)
        })
        itemObj[id] = {
            name: name,
            dates: dates,
            decades: decades,
            desc: desc,
            image: image
        }
        subjects.map((s) => {
            subjectObj[s] ? subjectObj[s].push(id) : subjectObj[s] = [id]
        })
        dates.map((d) => {
            dateObj.years[d] ? dateObj.years[d].push(id) : dateObj.years[d] = [id]
            let decade = Math.floor(d / 10) * 10
            dateObj.decades[decade] ? dateObj.decades[decade].push(id) : dateObj.decades[decade] = [id]
        })
    })
    console.log(itemObj)
    console.log(subjectObj)
    console.log(dateObj)
}


// let Menus = [
//     {
//         name: 'Subjects',
//         items: subjectlist
//     },{
//         name: 'Decades',
//         items: datelist
//     }

// ]
// const Menucontent = () => {
//     data.map((item) => {
//         item.element_texts.map((et)=>{
//             let name = ''
//             if (et.element.name === 'Title') {
//                 name = et.text.trim()
//                 let date = name.slice(name.length -4)
//                 if (!isNaN(date)) {
//                     let decade = Math.floor(date/10) * 10
//                     datelist[decade] ? datelist[decade][date] ? datelist[decade][date].push(name) : datelist[decade][date] = [name] : datelist[decade] = {date: name}
//                 }}
//             if (et.element.name === 'Subject') {
//                 if (name = '') {console.log('dont do it, its gonna go wrong')} else {
//                     let subj = et.text
//                     subjectlist[subj] ? subjectlist[subj].push(name) : subjectlist[subj] = [name]
//                 }
//             }
//             return true
//         })
//         return true
//     })
//     let sidebarlist= Menus.map((l) => 
//         <dl>
//             <dt>{l.name}</dt>
//             {Object.keys(l.items).map((i) => <dd>{i}</dd> )}
//         </dl>
//     )
//     return (
//         <div>
//             {sidebarlist}
//         </div>
//     )
// }

export default DataParser
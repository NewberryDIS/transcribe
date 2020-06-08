import { useState, useEffect } from 'react'
/** @jsx jsx */
import { jsx, css  } from '@emotion/core'


export const bgarray = [
    ['nby_0BH40','1'],
    ['nby_1BH1504','1'],
    ['nby_1BH1507','1'],
    ['nby_1BH1574','1'],
    ['nby_1BH2115','1'],
    ['nby_1BH2128','1'],
    ['nby_1BH2450','1'],
    ['nby_1BH2469','1'],
    ['nby_2B268','1'],
    ['nby_2BH695','1'],
    ['nby_3B344','1'],
    // ['nby_3BH803','1'],
    ['nby_4BH27','1'],
    ['nby_4BH454','1'],
    ['nby_4BH789','1'],
    ['nby_BB28','1'],
    ['nby_VO184','1'],
    ['nby_LL10651','0'],
    ['nby_LL10834','0'],
    ['nby_LL10839','0'],
    ['nby_LL11503','0'],
    ['nby_LL12011','0'],
    ['nby_LL13424','0'],
    ['nby_LL9161','0'],
    ['nby_VO1422','0']
]

const Bgpage = () => {
    const imgs = bgarray.map(i => <img src={'//iiif.archivelab.org/iiif/' + i[0] + `$` + i[1] + '/full/400,/0/default.jpg'} className="imm" />)
    return (
        <div css={css`
            .imm {
                width: 400px;
                height: 400px;
                margin: 20px;
            }
        `}>
            {imgs}
        </div>
    )
}

export default Bgpage
import React from 'react'
import styled from '@emotion/styled'
import { colors, fonts } from './styles'

const Textcss = styled.div`
    background: rgba(${colors.bg}, 1);
    color: rgba(${colors.fg}, 1);
`

const Aboutcontent = () => (
    <div>
        <h2>About this project</h2>
        <p>Newberry Transcribe lets you contribute to historical scholarship, while learning about the everyday lives of individuals from a wide variety of backgrounds in the 19th and early 20th centuries. By transcribing handwritten letters, diaries, and other materials from the Newberry's <a href="//www.newberry.org/modern-manuscripts-and-archives">Modern Manuscript Collections</a>, you're helping to preserve these voices from the past -- making their stories easier to find, search, and read.</p>
        <h3>FAQs</h3>
        <h4>Why transcribe?</h4>
        <p>
            Crowdsourced transcription projects like Newberry Transcribe give participants the chance to engage with manuscripts in new and exciting ways while also contributing to scholarship and expanding public access to previously hard-to-access documents. By allowing users to transcribe these documents, transcription projects make it possible to create searchable digitized texts for scholars to use in their research and members of the public to examine at their leisure. Though primary sources such as the items included in Newberry Transcribe are likely of great value to historians, sociologists, and other scholars, libraries lack the staff that would be needed to transcribe manuscript content on such a large scale. In order to make the collections searchable by researchers, the Newberry is turning to the public for help.
        </p>
        <h4>What manuscripts are available to transcribe?</h4>
        <p>
            Newberry Transcribe allows users to transcribe letters, diaries, journals, and other material from the Newberry’s <a href="//www.newberry.org/modern-manuscripts-and-archives">Modern Manuscript Collections</a>, a repository of American manuscripts from the mid-18th through the 20th centuries. The content of the more than 800 physical collections mirrors the library’s collecting strengths, including all aspects of the history and culture of Chicago and the Midwest, American Indians, American History and Culture, Printing and Book Arts, Music, Religion, Genealogy, and Maps, Travel and Exploration.
        </p>
        <p>
            Holdings are strongest for Chicago and the Midwest, with over 500 collections in these areas. Consequently, many of the items included on this site are drawn from our Midwest Manuscripts Collection and provide first-hand accounts of everyday life in the Midwest during the 19th century. However, the site also includes items not specific to a single region, including the collected papers of a multi-generational family, the Everetts, whose members crisscrossed the country, settling in South Carolina, Kansas, and beyond.
        </p>
        <h4>How can I get started?</h4>
        <p>
            To get started, visit our Guidelines page for an overview of the transcription process.
        </p>
        <h4>How can I view or search the transcriptions?</h4>
        <p>
            Completed transcriptions can be accessed using the search box at the left on the Newberry Transcribe home page. Additionally, they will be added periodically to digitized manuscripts at the <a href="//archive.org/details/newberry">Newberry's Internet Archive</a> library, where they can be searched and browsed. Finally, to encourage digital scholarship projects, we have made the transcriptions available as a <a href="https://raw.githubusercontent.com/NewberryDIS/transcribe/master/src/data/content.json">data set</a> <a href="//github.com/newberrydis/">at our GitHub site</a>.
        </p>
        <h4>What software does Transcribing Modern Manuscripts use?</h4>
        <p><em>Transcribing Modern Manuscripts</em> is powered by: <a href="https://scalar.me/anvc/scalar/">Scalar</a>, an open-source tool developed by the Alliance for Networking Visual Culture for scholarly publishing; and <a href="https://scripto.org/">Omeka+Scripto</a>, open-source tools developed by the Roy Rosenzweig Center for History and New Media to enable community transcriptions of document files.</p>
        <h3>Questions or comments?</h3>
        <p>Contact us on Twitter <a href="https://twitter.com/digitalnewberry">@DigitalNewberry</a> or email dis@newberry.org</p>
    </div>
)

const TextContent = props => {
    const something = ''
    return (
        <Textcss>
            <Aboutcontent />
        </Textcss>
    )
}
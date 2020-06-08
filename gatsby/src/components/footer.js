import React, { useState } from 'react'
import Masonry from 'react-masonry-css'
import { Gardacss, Contentcss, Closebutton, Modal, CoreBox } from './csscomponents'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import RecentItem from './recent'

const breakpointColumnsObj = {
    default: 2,
    900: 1
};

  
const Footer = () => {
    const [ gettingStarted, setgettingStarted ] = useState(false)
    const [ tips, settips ] = useState(false)
    const [ about, setabout ] = useState(false)
    return (
        <Gardacss >
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="masonry-grid"
                    columnClassName="masonry-grid_column">
                    <CoreBox className="footercontent contact">
                        <h3>Questions? Comments?</h3>
                        <p>Contact the Newberry’s Digital Initiatives and Services staff: <a href="https://twitter.com/digitalnewberry" target="_blank" rel="noopener noreferrer">@DigitalNewberry</a> or <a href="mailto:dis@newberry.org?Subject=Newberry%20Transcribe">dis@newberry.org</a></p>
                        <h3>About this project</h3>
                        <p>Newberry Transcribe lets you contribute to historical scholarship, while learning about the everyday lives of individuals from a wide variety of backgrounds in the 19th and early 20th centuries. </p>
                        <p>By transcribing handwritten letters, diaries, and other materials from the Newberry's Modern Manuscript Collections, you're helping to preserve these voices from the past -- making their stories easier to find, search, and read.  <span className="notlink" onClick={e => setabout(true)}>More information.</span></p>
                        {about ?  <Modal  onClick={() => setabout(false)}><About setabout={setabout}/> </Modal> : ''}
                    </CoreBox>
                    <CoreBox className="footercontent license">
                        <h3>Guidelines</h3>
                        <p>Unsure how to get started? <span className="notlink" onClick={e => setgettingStarted(true)}>Click here!</span></p>
                        <p>New to transcribing?  <span className="notlink" onClick={e => settips(true)}>Click here</span> for some tips that will help you transcribe more effectively. </p>
                        {gettingStarted ? <Modal onClick={() => setgettingStarted(false)}><GettingStarted setgettingStarted={setgettingStarted}/> </Modal> : ''}
                        {tips ? <Modal  onClick={() => settips(false)}><Tips settips={settips}/> </Modal> : ''}
                        <h3>License</h3>
                        <p>
                            Except where otherwise noted, contextual content on this site is made available under a <a href="https://creativecommons.org/share-your-work/public-domain/cc0/" target="_blank" rel="noopener noreferrer">Creative Commons Public Domain license</a>.  Digitized images and other media from the Newberry's collections are made available for any lawful purpose, commercial or non-commercial, without licensing or permission fees to the library, subject to the following terms and conditions: <a href="https://www.newberry.org/rights-and-reproductions" target="_blank" rel="noopener noreferrer">Newberry Rights and Reproductions Policy.</a>  The transcription data is available in json format <a href="https://publications.newberry.org/transcription/mms-transcribe/data/alltranscripts.json" target="_blank" rel="noopener noreferrer">here.</a> 
                        </p>
                    </CoreBox>
                    <CoreBox className="footercontent">
                        <a href="http://publications.newberry.org/postcard-sender/index.php?id=nby_LL12699&p=0" className="imagelink" target="_blank" rel="noopener noreferrer">
                            <img src={require(`../images/postcardsender.png`)} alt="" />
                        </a>
                        <a href="https://publications.newberry.org/postcard-sender/" target="_blank" rel="noopener noreferrer" ><h3>Send a postcard!</h3></a>
                        <p>Inspired after transcribing correspondence? Write a message to a friend with our Postcard Sender! </p>
                        <p><a href="http://publications.newberry.org/postcard-sender/" target="_blank" rel="noopener noreferrer">Choose from a selection</a> or browse 26,000+ items at the <a href="https://archive.org/details/newberrypostcards" target="_blank" rel="noopener noreferrer">Newberry Postcards digital collection</a> and click the Sender link below any image.</p>

                    </CoreBox>
                    <CoreBox className="footercontent timemachine">
                        <a href="https://publications.newberry.org/time-machine/" className="imagelink" target="_blank" rel="noopener noreferrer">
                            <img src={require(`../images/timemachine.png`)} alt="" />
                        </a>
                        <a href="https://publications.newberry.org/time-machine/" target="_blank" rel="noopener noreferrer"><h3>Midwest Time Machine</h3></a>
                        
                        <p>Travel to the past with highlights from our favorite letters and diaries -- transcribed by users like you!</p>
                    </CoreBox>
                    <CoreBox className="footercontent tweets">

                        <TwitterTimelineEmbed 
                            // sourceType="url"
                            // url="https://twitter.com/digitalnewberry/lists/crowdsourcing" 
                            sourceType="profile"
                            screenName="digitalnewberry"
                            options={{autoHeight: true, tweetLimit: 6}} 
                            />
                    </CoreBox>
                    <RecentItem />
                </Masonry>
        </Gardacss>
    )
}
const GettingStarted = ({ setgettingStarted }) => (
    <Contentcss onClick={e => e.stopPropagation()}>
        <Closebutton onClick={() => setgettingStarted(false)} />
        <h3>Getting Started</h3>
        <ul>
        <li>First, click on a manuscript that interests you.</li>
        <li>You will be taken to a display of the manuscript’s individual pages. Select a page labeled “Not Started.”</li>
        <li>The page image will appear in a viewer, with a text box below. You can use the tools in the upper left corner of the viewer to zoom in and out and to move the document page around. </li>
        <li>Below the viewer is a text box. Put your cursor into the box, and then simply begin typing what you see on the page.</li>
        <li>Make sure to save your work frequently.</li>
        <li>Keep in mind that any user can build upon another user’s work by adding to or editing an incomplete transcription. To do so, select a page labeled “Needs Review” and then follow the instructions above.</li>
        <li>Optional: Users are encouraged to create accounts, which will enable them to track their own progress and gather updates on recent revisions by other users. To create an account, navigate to a page image in any collection and click the </li>'Log <li>In (optional)' button above the image. You'll be redirected to a new page that will allow you to create an account by following some simple steps.</li>
        </ul>
    </Contentcss>
)
const About = ({setabout }) => (
    <Contentcss onClick={e => e.stopPropagation()}>
        <Closebutton onClick={() => setabout(false)} />

            <h3>About this project</h3>

            <p>Newberry Transcribe lets you contribute to historical scholarship, while learning about the everyday lives of individuals from a wide variety of backgrounds in the 19th and early 20th centuries. By transcribing handwritten letters, diaries, and other materials from the Newberry's Modern Manuscript Collections, you're helping to preserve these voices from the past -- making their stories easier to find, search, and read.</p>
            <h4>FAQs</h4>
            <dl>
                <dt>Why transcribe?</dt>
                <dd>Crowdsourced transcription projects like Newberry Transcribe give participants the chance to engage with manuscripts in new and exciting ways while also contributing to scholarship and expanding public access to previously hard-to-access documents. By allowing users to transcribe these documents, transcription projects make it possible to create searchable digitized texts for scholars to use in their research and members of the public to examine at their leisure. Though primary sources such as the items included in Newberry Transcribe are likely of great value to historians, sociologists, and other scholars, libraries lack the staff that would be needed to transcribe manuscript content on such a large scale. In order to make the collections searchable by researchers, the Newberry is turning to the public for help.</dd>
                <dt>What manuscripts are available to transcribe?</dt>
                <dd>Newberry Transcribe allows users to transcribe letters, diaries, journals, and other material from the Newberry’s Modern Manuscripts Collections, a repository of American manuscripts from the mid-18th through the 20th centuries. The content of the more than 800 physical collections mirrors the library’s collecting strengths, including all aspects of the history and culture of Chicago and the Midwest, American Indians, American History and Culture, Printing and Book Arts, Music, Religion, Genealogy, and Maps, Travel and Exploration.<br />
                Holdings are strongest for Chicago and the Midwest, with over 500 collections in these areas. Consequently, many of the items included on this site are drawn from our Midwest Manuscripts Collection and provide first-hand accounts of everyday life in the Midwest during the 19th century. However, the site also includes items not specific to a single region, including the collected papers of a multi-generational family, the Everetts, whose members crisscrossed the country, settling in South Carolina, Kansas, and beyond. </dd>
                <dt>How can I get started?</dt>
                <dd>To get started, visit our Guidelines page for an overview of the transcription process.</dd>
                <dt>How can I view or search the transcriptions?</dt>
                <dd>Completed transcriptions can be accessed using the search box at the left on the Newberry Transcribe home page. Additionally, they will be added periodically to digitized manuscripts at the Newberry's Internet Archive library, where they can be searched and browsed. Finally, to encourage digital scholarship projects, we have made the transcriptions available as a data set at our GitHub site. </dd>
                <dt>What software does Newberry Transcribe use?</dt>
                <dd>Newberry Transcribe is powered by Omeka with Scripto, open-source tools developed by the Roy Rosenzweig Center for History and New Media to enable community transcriptions of document files.  The front end is written in React JavaScript; <a href="https://github.com/newberrydis/transcribe"  target="_blank" rel="noopener noreferrer">our code repository can be found here</a> </dd>
            <dt>Questions or comments?</dt>
            <dd>Contact us on Twitter <a href="https://twitter.com/digitalnewberry" target="_blank" rel="noopener noreferrer">@DigitalNewberry</a> or email dis@newberry.org</dd>
        </dl>
    </Contentcss>
)
const Tips = ({ settips }) => (
    <Contentcss onClick={e => e.stopPropagation()}>
    <Closebutton onClick={() => settips(false)} />
        <h3>Transcription tips</h3>
        <dl>
            <dt>Save your work</dt>
            <dd>After completing any transcription, remember to hit the save button to ensure that your work is preserved.</dd>
            
            <dt>Transcribe what you see</dt>
            <dd>Simply type what you see on the page, preserving spelling errors, punctuation, and so on. Resist the urge to modernize spelling or to correct mistakes. Type words exactly as they are presented, including capitalization, abbreviations, names, and dates.</dd>
            
            <dt>Use complete words</dt>
            <dd>Often, a writer will break and hyphenate a word when moving from one line to the next. Don't preserve these breaks; just write the complete word. This will better enable researchers to run effective word searches.</dd>
            
            <dt>Use brackets to indicate that a word or phrase is unclear </dt>
            <dd>When you encounter words or phrases that you can't make out, just use double brackets to indicate this (i.e., "[[unclear]]"). If can propose a reasonable guess, place your guess in double brackets with a question mark following it (e.g., [[barn?]]).</dd>
            
            <dt>Indicate the presence of sketches or doodles with a note</dt>
            <dd>If you encounter a sketch or doodle on a manuscript page, indicate this by placing the word image in the double brackets (e.g. "[[image]]"). If you feel that you can make out what the image is, place your guess in the double brackets as well (e.g. "[[barn--image]]").</dd>
            
            <dt>Transcribe as much as you can on a page and then move on</dt>
            <dd>In general, you should try to finish page transcriptions if you can, but if you feel bored or confused by a particular page, just move on to a different one. Somebody else will take over where you left off.</dd>
            
            <dt>Don't attempt to format text</dt>
            <dd>No need to indicate line breaks, indents, underlining, etc. Remember, the goal is to make the digitized manuscript searchable; users will be able to view the page image itself, so describing the appearance of the text is unnecessary.</dd>
            
            <dt>Rely on context to decipher words</dt>
            <dd>Handwriting can be difficult to read. Look for similar words or letters in the document that may help you to decode the handwriting.</dd>
            
            <dt>View the collection guide or catalog record</dt>
            <dd>The item description includes a link for its archival collection guide when available; or catalog record when not available. These links provide more information about the larger collection that your item is drawn from, and may include names of places, people, subjects, and events that can provide clues in deciphering manuscript text.</dd>
            
            <dt>Remember: some access is better than none</dt>
            <dd>Don't worry if your work isn't perfect or if you're unable to complete a page; others can review your work and edit or add to your transcription later. Keep in mind that without your help, these handwritten pages are completely unsearchable - so any transcribed text you can provide is better than none.</dd>
    
        </dl>
    </Contentcss>
)
export default Footer
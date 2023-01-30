import React from "react";
import styled from '@emotion/styled'
// import InfiniteScroll from 'react-infinite-scroll-component';
import Box from '../components/newbox'
import Loading from '../components/loading'
import Sidebar from '../components/sidebar'
import { Gardacss, Contentcss, CoreBox,  colors, fonts } from '../components/csscomponents'

const bgs = [
    ['https://digital.newberry.org/transcribe/omeka/files/original/fc560f62aa62734255d888714f20208c.jpg','https://publications.newberry.org/transcribe/#/item/101/page/25226'],
    ['https://digital.newberry.org/transcribe/omeka/files/original/6a108543dd39664ca37cf34be8f09fb3.jpg','https://publications.newberry.org/transcribe/#/item/195/page/44616'],
    ['https://digital.newberry.org/transcribe/omeka/files/original/fce6a9ad08298a6bc91e85980e7a833d.jpg','https://publications.newberry.org/transcribe/#/item/215/page/48376'],
    ['https://digital.newberry.org/transcribe/omeka/files/original/4747692a07e9878ca5ad3dc66c379735.jpg','https://publications.newberry.org/transcribe/#/item/1219/page/95893']
]

const Guidelines = () => {
    return (
        <div>
            <GettingStarted />
            <Tips />
        </div>
    )
}


const GettingStarted = () => {
    return (
        
        <Contentcss >
        <h3>Getting Started</h3>
        <ul>
        <li>First, click on a manuscript that interests you.</li>
        <li>You will be taken to a display of the manuscript’s individual pages. Select a page labeled “Not Started.”</li>
        <li>The page image will appear in a viewer, with a text box below. You can use the tools in the upper left corner of the viewer to zoom in and out and to move the document page around. </li>
        <li>Below the viewer is a text box. Put your cursor into the box, and then simply begin typing what you see on the page.</li>
        <li>Make sure to save your work frequently.</li>
        <li>Keep in mind that any user can build upon another user’s work by adding to or editing an incomplete transcription. To do so, select a page labeled “Needs Review” and then follow the instructions above.</li>
        <li>Optional: Users are encouraged to create accounts, which will enable them to track their own progress and gather updates on recent revisions by other users. To create an account, navigate to a page image in any collection and click the 'Log In (optional)' button above the image. You'll be redirected to a new page that will allow you to create an account by following some simple steps.</li>
        </ul>
    </Contentcss>
        )
}

const Tips = ()=> {
return (
    <Contentcss >
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
}

export default Guidelines
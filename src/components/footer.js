import React from 'react'
import styled from '@emotion/styled'
import {colors, fonts } from './styles'
import TwitterContainer from './twittercontainer'
import json from './samplejson.json'
import { useState } from 'react'

const Footercss = styled.footer`
    display: flex;
    flex-basis: 70px;
    flex-shrink: 0;
    background-color: rgba(207,207,207,1);
    z-index: 0;
    color: rgba(37,37,37,1);
    justify-content: space-between;
    // box-shadow: inset 0 0 10px ;
    // box-shadow: inset 0px 5px 10px 0px rgba(37,37,37,1);
    .footersection {
        font-family: sans-serif;
        flex: 1;
        padding: 25px;
        text-align: center;
        &:first-of-type {
            text-align: left;
        }
        &:last-of-type {
            text-align: right;
        }
    }
`

const Gardacss = styled.footer`
    width: 100%;
    background-color: rgba(${colors.bg},1);
    padding: 15px;
    box-shadow: inset 0 0 10px rgba(${colors.fg},1);
    .footerwrapper {
        position: relative;
        width: 70%;
        margin: auto;
        z-index: 0;
        color: rgba(${colors.fg},1);
        display: grid;
        grid-template-rows: auto 1fr auto;
        grid-template-columns: 1fr;
        .account {
            grid-column: 1 / -1;
            text-align: center;
        }
        .textycontent {
            
            grid-column: 1 / 2;
            display: flex;
            flex-wrap: wrap;
            .about, .tweet, .guidelines, .contact {
                background-color: rgba(${colors.bg},1);
                transition: all 0.2s;
                border-bottom: 1px solid  rgba(${colors.fg},1);
                flex: 1;
                width: auto;
                position: relative;
                overflow: hidden;
                text-overflow: ellipsis;
                height: 200px;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                padding: 15px;
                &.big {
                    border-radius: 4px;
                    top: -50px;
                    z-index: 1000;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    height: auto;
                    overflow: auto;
                    flex: 2;
                    box-shadow: 0 0 10px rgba(${colors.fg},1);
                }
            }

            .tweet {
                height: 300px;
            }
            > div {
                &:first-of-type {
                    border-right: 1px solid rgba(${colors.fg},1);
                }
                &:last-of-type {
                    border-left: 1px solid rgba(${colors.fg},1);
                }
            }
        } 
    }
`
const Tweet = props => {
    return (
        <div className="tweet">
            {props.text}
        </div>
    )
}

const useFetch = (url, options) => {
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
  
    React.useEffect(() => {
        const FetchData = async () => {
            try {
            const res = await fetch(url, options);
            const json = await res.json();
                setResponse(json);
            } catch (error) {
                setError(error);
            }
        };
        FetchData();
    }, []);
    return { response, error };
};
const Footer = () => {
    const [big, setBig] = useState(false);
    const tweetcontent = ['tweet one', 'tweet two', 'tweet three']
    const tweets = tweetcontent.map(t => <Tweet text={t}/>)
    const embiggen = (e) => {
        big === e.target.id ? setBig(false) : setBig(e.target.id)
        console.log(big)
    }
    // const data = useFetch('https://cors-anywhere.herokuapp.com/https://publications.newberry.org/digital/mms-transcribe/rdf/node/guidelines?format=json')
    // const guidelines = data.response["https://publications.newberry.org/digital/mms-transcribe/guidelines.42"]["http://rdfs.org/sioc/ns#content"][0]
    const data = json
    const guidelines = data["https://publications.newberry.org/digital/mms-transcribe/guidelines.42"]["http://rdfs.org/sioc/ns#content"][0]["value"]
    return (
    <Gardacss big={big}>
        <div className="footerwrapper">
            <div className="account"><h3>login & create account etc info</h3></div>
            <div className="textycontent">
                {tweets}
            </div>
            <div className="textycontent">

                <div onClick={(e) => embiggen(e)} id="about" className={`about ${big === 'about' ? ' big' : ''}`}><h3>about</h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea ab hic, vitae mollitia a cupiditate reprehenderit nulla error fuga provident. Quisquam itaque voluptas dolorem qui obcaecati iste cupiditate excepturi modi.</div>
                <div id="guidelines" className={`guidelines ${big === 'guidelines' ? ' big' : ''}`} onClick={(e) => embiggen(e)} dangerouslySetInnerHTML={ {__html: guidelines} } />
                {/* <Guidelines embiggen={embiggen} big={big}/> */}
                <div onClick={(e) => embiggen(e)} id="contact" className={`contact ${big === 'contact' ? ' big' : ''}`}><h3>contact</h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil veniam corporis fugiat perferendis porro illum, maiores aliquam soluta similique id praesentium, non quidem doloremque sunt modi. Rem itaque dignissimos cupiditate.</div>
            </div>
            <div className="license"><h3>license</h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore libero eveniet qui cupiditate explicabo eos commodi minus reiciendis quibusdam sed praesentium, temporibus facere velit fuga. Officia, totam illo. Natus, deleniti?</div>
        </div>
    </Gardacss>
)}
const Old = () => (
    <Footercss>
        <div className="footersection">left footer section</div>
        <div className="footersection">center footer section</div>
        <div className="footersection">right footer section</div>
    </Footercss>
)

const Guidelines = props => <div id="guidelines" className={`guidelines ${props.big === 'guidelines' ? ' big' : ''}`} onClick={(e) => props.embiggen(e)}>
    <h3>Transcription guidelines</h3>
    <h4>Getting started</h4>
    <ul>
        <li>First, click on a manuscript that interests you.</li>
        <li>You will be taken to a display of the manuscript’s individual pages. Select a page labeled “Not Started.”</li>
        <li>The page image will appear in a viewer, with a text box below. You can use the tools in the upper left corner of the viewer to zoom in and out and to move the document page around. </li>
        <li>Below the viewer is a text box. Put your cursor into the box, and then simply begin typing what you see on the page.</li>
        <li>Make sure to save your work frequently.</li>
        <li>Keep in mind that any user can build upon another user’s work by adding to or editing an incomplete transcription. To do so, select a page labeled “Needs Review” and then follow the instructions above.</li>
        <li>Optional: Users are encouraged to create accounts, which will enable them to track their own progress and gather updates on recent revisions by other users. To create an account, navigate to a page image in any collection and click the 'Log In (optional)' button above the image. You'll be redirected to a new page that will allow you to create an account by following some simple steps.</li>
    </ul>
    <p>[coming soon: screen capture]</p>
    <h4>Transcription tips</h4>
    <dl>
        <dt>
            Save your work
        </dt>
        <dd>
            After completing any transcription, remember to hit the save button to ensure that your work is preserved.
        </dd>
        <dt>Transcribe what you see</dt>
        <dd>Simply type what you see on the page, preserving spelling errors, punctuation, and so on. Resist the urge to modernize spelling or to correct mistakes. Type words exactly as they are presented, including capitalization, abbreviations, names, and dates.</dd>
        <dt>Use complete words</dt>
        <dd>Often, a writer will break and hyphenate a word when moving from one line to the next. Don't preserve these breaks; just write the complete word. This will better enable researchers to run effective word searches.</dd>
        <dt>Use brackets to indicate that a word or phrase is unclear</dt>
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
    <h4>Questions or comments?</h4>
    <p>Contact us on Twitter @DigitalNewberry or email dis@newberry.org</p>
</div>

export default Footer
import React, { useState, useEffect, useRef } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'

// import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"
import IndexPage from './pages/indexpage'
import ListFormIndex from './pages/listFormIndex'
// import IndexPage from './pages/indexpage-refactoredTextSearch'
import ItemPage from './pages/itempage'
import PagePage from './pages/pagepage'
import TopBar from './components/topbar'
import Jumbo from './components/jumbo'
import Banner from './components/banner'
import Background from './components/background'
import Footer from './components/footer'

// import withTracker from './components/withTracker'


const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  // margin-top: 60vh;
  margin: 0 auto;
  // @media (min-width: 1500px){width: 80%;}
  // @media (max-width: 1500px) and (min-width: 1000px){width: 95%;}
  // @media (max-width: 900){width: 98%;}
  width: 95%;
`

const Anchor = styled.div`
    position: absolute;
    top: 50vh;
    width: 5px;
    height: 5px;
    background: black;
    opacity: 0;
`

function App() {
  // document.domain = 'newberry.org';
  const [ resultCount, setResultCount ] = useState(0)
  const [ showMenu, setShowMenu ] = useState(false)
  const [ image, setImage ] = useState('')
  const { pathname } = useLocation();
  const pageTop = useRef(null)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  return (
    <div>
      <Global styles={css`
        html, body {
          margin: 0;
          padding: 0;
          position: relative;
          z-index: 1;
        }
      `}/>
      <TopBar setShowMenu={setShowMenu} showMenu={showMenu} resultCount={resultCount}  />
      <Background image={image}/>
      <Jumbo />
      <Anchor ref={pageTop} />
      {/* <Banner /> */}
      <Body>
        <Switch>
          <Route path={`/item/:itemid/page/:pageid`}  component={() => <PagePage setImage={setImage} />} />
          <Route path={`/item/:itemid/search/:qtext`} component={() => <ItemPage setImage={setImage} />} />
          <Route path={`/item/:itemid`}               component={() => <ItemPage setImage={setImage} />} />
          {/* <Route path={`listFormIndex`}               component={() => <ListFormIndex showMenu={showMenu} resultCount={resultCount} setResultCount={setResultCount} />} /> */}
          <Route                                      component={() => <IndexPage showMenu={showMenu} resultCount={resultCount} setResultCount={setResultCount} />} />
        </Switch>
      </Body>
      {pathname.indexOf('page') > -1 ? '' : <Footer />}
    </div>
  );
}

export default App;
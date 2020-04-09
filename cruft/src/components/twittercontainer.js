import React, { useEffect } from "react";
import styled from "@emotion/styled";


const Tweetscss = styled.section`
    grid-column: 1 / 2;
    display: flex;
    flex-wrap: wrap;
    .tweet {
        flex: 1;
    }
`

const TwitterContainer = () => {
  useEffect(() => {
    const anchor = document.createElement("a");
    anchor.setAttribute("class", "twitter-timeline");
    anchor.setAttribute("data-tweet-limit", "3");
    anchor.setAttribute("data-chrome", "noheader nofooter transparent");
    anchor.setAttribute("href", "https://twitter.com/digitalnewberry");
    document.getElementsByClassName("twitter-embed")[0].appendChild(anchor);

    const script = document.createElement("script");
    script.setAttribute("src", "https://platform.twitter.com/widgets.js");
    document.getElementsByClassName("twitter-embed")[0].appendChild(script);
  }, []);

  return (
    <Tweetscss className="twitterContainer">
      <div className="tweet twitter-embed"></div>
    </Tweetscss>
  );
};

export default TwitterContainer;
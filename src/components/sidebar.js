import React from 'react'
import styled from "@emotion/styled"
import { colors } from "./misc"

const SidebarWrapper = styled.div`
    margin: 15px;
    padding: 0;
    background-color: ${colors.bg};
    color: ${colors.fg};
    border: 5px solid ${colors.fg};
    width: 200px;
    height: calc(100vh - 40px);
    flex-basis: 200px;
    display: inline-block;
    position: relative;
    overflow-y: auto;

`
const SidebarTop = styled.div`
background-color: ${colors.bg};
    position: sticky;
    height: 35px;
    line-height: 35px;
    padding: 0 5px;
    width: 100%;
    top: 0px;
    color: ${colors.fg};
    font-family:"News Cycle", sans-serif;
    .sidebarTitle {
        font-size: 0.9rem;
        margin: 0;
        text-transform: uppercase;
    }
    .sidebarSubtitle {
        font-size: 0.75rem;
        margin: 0;
        text-transform: uppercase;
    }
`
const SidebarBottom = styled.div`
    width: 100%;
    background-color: ${colors.bg};
`
const Sidebar = props => {
    return (
        <SidebarWrapper>
            <SidebarTop>
                <p className="sidebarTitle">Newberry Transcribe</p>

            </SidebarTop>
            <SidebarBottom>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </ul>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae quia perspiciatis, eaque animi similique, itaque sapiente eveniet, eligendi illo exercitationem tempore ipsa? Perspiciatis deleniti fugiat itaque expedita. Hic, aperiam corporis.
            </SidebarBottom>
        </SidebarWrapper>
    )
}

export default Sidebar
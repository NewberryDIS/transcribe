import React from 'react'
import styled from '@emotion/styled';
import { colors } from './pieces';

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            filterType: 'titleFilter',
        };
    }
    render(){
        return(
            <SidebarWrapper>
                <SidebarTop>
                    Newberry Transcribe
                </SidebarTop>
                <SidebarBottom>
                    Some Filters
                </SidebarBottom>
            </SidebarWrapper>
        )
    }
}
const SidebarWrapper = styled.div`
    background: ${colors.bg};
    color: ${colors.fg};
    border: 5px solid ${colors.fg};
    width: 150px;
    top: 10px;
    left: 10px;
    flex-basis: 150px;
`
const SidebarTop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
`
const SidebarBottom = styled.div`
    position: fixed;
    top: 0;
`

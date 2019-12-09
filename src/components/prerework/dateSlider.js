import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { colors } from './pieces'
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import styled from '@emotion/styled';

const Handle = Slider.Handle;

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
      
        <Handle value={value} {...restProps} />
    );
  };

const SliderWrapper = styled.div`
    border: 1px solid ${colors.light}; 
    margin: 5px auto;
    padding: 5px 10px;
    width: calc(100% - 10px);
    p {
        margin: 0;        
    }
`
const DateSlider = props => {
    const onSliderChange = (value) => {
        // console.log(value);
        props.storeDates(value)
        // props.setFilters(value,'dateFilter')
    }

    // onMinChange = (e) => {
    //     this.setState({
    //         min: +e.target.value || 0,
    //     });
    // }
    // onMaxChange = (e) => {
    //     this.setState({
    //        max: +e.target.value || 100,
    //     });
    // }
    return (
        <div>
            <SliderWrapper>
                <p>{props.dates[0]} - {props.dates[1]} </p>
                <Range min={1600} handle={handle} value={props.dates} onChange={onSliderChange} max={2000} step={10} pushable={true} defaultValue={props.dates} />
            </SliderWrapper>
        </div>
    )
}
export default DateSlider
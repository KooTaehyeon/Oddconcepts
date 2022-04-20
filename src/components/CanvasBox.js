import React from 'react';
import styled from 'styled-components';

const Itemdiv = styled.div`
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  width: ${(props) => props.w}px;
  height: ${(props) => props.h}px;
  background-color: rgba(0, 128, 0, 0.3);
  position: absolute;
  padding-left: 5px;
  display: flex;
`;

function CanvasBox(props) {
  console.log(props);
  return (
    <>
      <Itemdiv x={props.x} y={props.y} w={props.w} h={props.h}>
        {props.name}
      </Itemdiv>
    </>
  );
}
export default CanvasBox;

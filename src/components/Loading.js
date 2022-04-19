import React from "react";
import styled from "styled-components";

const Loading = () => {
  const LodingModal = styled.div`
    //로딩용 모달 div
    position: absolute;
    top: 0px;
    left: 0px;
    opacity: 50%;
    z-index: 10;
    background: black;
    width: 100vw;
    height: 100vw;
    overflow: hidden;
  `;

  const Lodings = styled.div`
    position: fixed;
    left: 50%;
    top: 35%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 10px solid black;
    border-top: 10px solid #fff;
    border-radius: 50em;
    transition: all 0.2s;
    animation-name: spinCircle;
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    @keyframes spinCircle {
      from {
        transform: translate(-50%, -50%) rotate(0);
      }
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
  `;

  return (
    <>
      <LodingModal>
        <Lodings />
      </LodingModal>
    </>
  );
};

export default Loading;

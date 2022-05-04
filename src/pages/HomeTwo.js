import React, { createRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import img from '../assets/can.jpg';
import CanvasBox from '../components/CanvasBox';
import { setItems } from '../util/LocalStorage';
import { getItems } from '../util/LocalStorage';
const HomeTwo = () => {
  // Box생성 데이터
  const [dataSet, setDataSet] = useState([]);
  // 캔버스
  let canvasRef = createRef();
  // // 영역 설정
  const [ctx, setCtx] = useState();

  // 캔버스 시작
  useEffect(() => {
    const canvas = canvasRef.current;
    setCtx(canvas.getContext('2d'));
    // 로컬
    const data = getItems('item');
    if (data) {
      setDataSet(data);
    }
  }, []);
  const date = new Date();

  const [pos, setPos] = useState({});
  const [isDraw, setIsDraw] = useState(false);

  // 드래그 이벤트 시작
  function drawStart(e) {
    setIsDraw(true);
    setPos([
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop,
    ]);
  }
  // 사각형 그려주기
  function drawSquare(e) {
    if (!isDraw) return;
    ctx.strokeStyle = 'red';
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    let currentX = e.clientX - canvasRef.current.offsetLeft;
    let currentY = e.clientY - canvasRef.current.offsetTop;
    ctx.strokeRect(pos[0], pos[1], currentX - pos[0], currentY - pos[1]);
  }
  // 드래그 이벤트 종료
  function drawEnd(e) {
    setIsDraw(false);
    let confirmText = prompt('영역의 이름은 무엇인가요?');
    if (confirmText === null) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      return;
    }
    let endXY = [e.clientX, e.clientY];

    const produce = [
      ...dataSet,
      {
        id: date,
        x: pos[0],
        y: pos[1],
        width: endXY[0] - pos[0],
        height: endXY[1] - pos[1],
        text: confirmText,
      },
    ];

    setDataSet(produce);
    setItems(produce);
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }
  // 지우기
  const onRemove = (id) => {
    const deleted = dataSet.filter((item) => item.id !== id);
    setDataSet(deleted);
    setItems(deleted);
  };
  // 영역 수정
  const textEdit = (id) => {
    let confirmTexts = prompt('영역의 이름을 수정해주세요');
    if (confirmTexts === null) return;
    const updata = [...dataSet];
    const edit = updata.map((item) => {
      if (item.id === id) {
        item.text = confirmTexts;
        return item;
      }
      return item;
    });
    setDataSet(edit);
    setItems(edit);
  };

  return (
    <Section>
      {dataSet.map((element, index) => (
        <div onClick={() => textEdit(element.id)} key={index}>
          <CanvasBox
            x={element.x}
            y={element.y}
            w={element.width}
            h={element.height}
            name={element.text}
          />
        </div>
      ))}
      <Canvas
        ref={canvasRef}
        width={680}
        height={760}
        onMouseDown={drawStart}
        onMouseMove={drawSquare}
        onMouseUp={drawEnd}
      />
      <SelectorName>
        {dataSet.map((element, index) => (
          <p key={index}>
            {' '}
            {element.text}
            <span onClick={() => onRemove(element.id)}> X </span>
          </p>
        ))}
      </SelectorName>
    </Section>
  );
};
const Section = styled.div``;
const Canvas = styled.canvas`
  width: 680px;
  height: 760px;
  background-size: 680px 760px;
  background-image: url(${img});
  margin: auto;
  @media screen and (max-width: 700px) {
    width: 600px;
    height: 760px;
    background-size: 600px 760px;
  }
  @media screen and (max-width: 600px) {
    width: 510px;
    height: 760px;
    background-size: 510px 760px;
  }
`;
const SelectorName = styled.div`
  position: absolute;
  top: 10px;
  left:1vw;
  text-align: center;
  color: #000000;
  background-color: #fff;
  width :100px;
  height auto;

  span{
    margin 0px 10px;
    cursor:pointer;
    :hover {
     color : red;
    }
  }

`;

export default HomeTwo;

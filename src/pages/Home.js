import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const Home = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <SubTitle>
        <span>오드 컨셉</span> 사전과제
      </SubTitle>
      <button onClick={() => navigate('/One')}>one</button>
      <button onClick={() => navigate('/Two')}>Two</button>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;

  button {
    margin: 0 100px;
    width: 25%;
    height: 70px;
    border: 0;
    background: #d3d3d3;
    font-size: large;
    :hover {
      background: #fff;
      transition: 0.4s;
      border: 1px solid #fff;
    }
  }
`;

const SubTitle = styled.h2`
  font: normal 30px/1.5 'inherit';
  text-align: center;
  color: #444;
  margin-top: 70px;
  margin-bottom: 100px;
  span {
    font-weight: bold;
  }
`;

export default Home;

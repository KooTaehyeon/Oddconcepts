import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = () => {
  return (
    <Container>
      <h1>
        <Link to='/One'>
          <Logo
            src={
              'https://sun-learning-ff8.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc0b49070-f848-4e56-98fc-7ff9d972a855%2Flogo_pxl_b.png?table=block&id=6c4f04e7-8ed8-4c5a-9ef1-57d3d3e17ba8&spaceId=06605955-0fd9-4614-ba9a-0812be412dbe&width=470&userId=&cache=v2'
            }
            alt='로고 이미지'
          />
        </Link>
      </h1>
    </Container>
  );
};

const Container = styled.nav`
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
`;

const Logo = styled.img`
  width: 70px;
`;

export default Nav;

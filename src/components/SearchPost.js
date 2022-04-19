import React from 'react';
import styled from 'styled-components';
const SearchPost = ({ post, setLoading }) => {
  const { image_url, name, price } = post;
  const number = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (
    <MainContainer>
      <Link href={image_url} target='_blank'>
        <ProductImage
          src={image_url}
          alt='제품 이미지'
          onLoad={() => setLoading(false)}
        />
        <ProductName>{name}</ProductName>
        <ProductPrice>{`₩ ${number}`}</ProductPrice>
      </Link>
    </MainContainer>
  );
};
const MainContainer = styled.div`
  width: 19vh;
  height: 33vh;
  border: 1px solid #efefef;
  box-shadow: 5px 5px 7px 0px rgba(217, 217, 217, 1);
  margin: 1vh;
  transition: 0.3s;

  :hover {
    cursor: pointer;
    transform: translateY(-10px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 25vh;
`;

const ProductName = styled.p`
  font-size: 0.9em;
  margin: 0.6em;
`;

const ProductPrice = styled.p`
  font-size: 1em;
  float: right;
  color: #8a39e1;
  margin-right: 0.5em;
  margin-top: 0em;
`;

const Link = styled.a`
  text-decoration: none;
  color: black;

  :visited {
    color: black;
  }
`;

export default SearchPost;

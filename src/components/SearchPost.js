import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { textState } from '../atom';
const SearchPost = ({ post, setLoading }) => {
  const { image_url, name, price } = post;
  const number = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // 글자 강조
  const texts = useRecoilValue(textState);

  const escapeRegExp = (str = '') =>
    str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');

  const Highlight = ({ search = '', children = '' }) => {
    const patt = new RegExp(`(${escapeRegExp(search)})`, 'i');
    const parts = String(children).split(patt);

    if (search) {
      return parts.map((part, index) =>
        patt.test(part) ? (
          <HighlightText key={index}>{part}</HighlightText>
        ) : (
          part
        )
      );
    } else {
      return children;
    }
  };

  return (
    <MainContainer>
      <Link href={image_url} target='_blank'>
        <ProductImage
          src={image_url}
          alt='제품 이미지'
          onLoad={() => setLoading(false)}
        />
        <ProductName>
          <Highlight search={texts}>{name}</Highlight>
        </ProductName>
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
  overflow: hidden;
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
const title = keyframes`
0% {
  color: #000000;
}

10% {
  color: #8a39e1;
  font-weight: bold;

}
20%{
  color: #000000;
}

30% {
  color: #8a39e1;
  font-weight: bold;
}
40% {
  color: #000000;
}
50% {
  color: #8a39e1;
  font-weight: bold;

}
60%{
  color: #000000;
}

70% {
  color: #8a39e1;
  font-weight: bold;
}
80% {
  color: #000000;
}
90% {
  color: #8a39e1;
  font-weight: bold;
}
100% {
  color: #000000;
}
`;
const HighlightText = styled.span`
  color: #8a39e1;

  animation: ${title} 7s infinite;
`;

export default SearchPost;

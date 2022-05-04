import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';
import styled from 'styled-components';
import useInput from '../hook/useInput';
import { useRecoilState } from 'recoil';
import { regionData, productData, counterState, textState } from '../atom';
import { useNavigate } from 'react-router-dom';

const HomeOne = () => {
  const navigate = useNavigate();

  // 전역 데이터
  const [postParsist, setPostParsist] = useRecoilState(counterState);
  // code 데이터
  const [regionDatas, setRegionDatas] = useRecoilState(regionData);
  // product 데이터
  const [productDatas, setProductDatas] = useRecoilState(productData);
  const [texts, setTexts] = useRecoilState(textState);
  // input value
  const searchInput = useInput('');
  // 검색
  const search = () => {
    const value = searchInput.value;

    const korCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const isKor = korCheck.test(value) ? true : false;
    console.log(isKor, '한글');
    if (value === '') {
      console.log('오긴해?');
      alert('검색어를 입력해주세요.');
      return;
    }

    //키워드 검색 (검색어가 한글일 경우)
    if (isKor === true) {
      const foundResults = productDatas.filter(
        (item) => item.name.split('_')[0] === value
      );
      if (foundResults.length === 0) {
        alert('검색 결과가 없습니다.');
        console.error('No data found.');
        return;
      }
      foundResults.sort(
        (a, b) =>
          Number(a.name.match(/(\d+)/g)) - Number(b.name.match(/(\d+)/g))
      );
      setTexts(value);
      setPostParsist(foundResults);

      navigate(`/search?=keyword=${value}`);
    } else {
      //image_url 검색
      if (value.includes('https')) {
        //검색어와 일치하는 아이템
        const matchedResult = regionDatas.filter(
          (item) => item.image_url === value
        );
        if (matchedResult.length === 0) {
          alert('검색 결과가 없습니다.');
          console.error('No data found.');
          return;
        }
        //검색어와 같은 카테고리의 아이템 목록
        const similarResults = productDatas.filter(
          (item) =>
            item.category_names[0] === matchedResult[0].category_names[0] &&
            item.category_names[1] === matchedResult[0].category_names[1] &&
            item.category_names[2] === matchedResult[0].category_names[2]
        );

        setTexts(value);
        setPostParsist([...matchedResult, { similarResults }]);
        navigate(`/search?=image_url=${value}`);
      }
      //product_code 검색
      else if (!isNaN(value)) {
        //검색어와 일치하는 아이템
        const matchedResult = regionDatas.filter(
          (item) => item.product_code == value
        );
        if (matchedResult.length === 0) {
          alert('검색 결과가 없습니다.');
          console.error('No data found.');
          return;
        }
        //검색어와 같은 카테고리의 아이템 목록
        const similarResults = productDatas.filter(
          (item) =>
            item.category_names[0] === matchedResult[0].category_names[0] &&
            item.category_names[1] === matchedResult[0].category_names[1] &&
            item.category_names[2] === matchedResult[0].category_names[2]
        );
        setTexts(value);
        setPostParsist([...matchedResult, { similarResults }]);
        navigate(`/search?=product_code=${value}`);
      }
    }
  };
  // api
  useEffect(() => {
    callData();
  }, []);
  const callData = () => {
    const product = 'https://static.pxl.ai/problem/data/products.json';
    const region = 'https://static.pxl.ai/problem/data/regions.json';

    const requestProduct = axios.get(product);
    const requestRegion = axios.get(region);

    axios
      .all([requestProduct, requestRegion])
      .then(
        axios.spread((...responses) => {
          const productResults = [...responses][0].data;
          const regionResults = [...responses][1].data;

          setProductDatas(productResults);
          setRegionDatas(regionResults);
        })
      )
      .catch((err) => alert(`에러 ${err}`));
  };

  return (
    <Wrap>
      <Nav />
      <SubTitle>
        <Bold>Artificial Intelligence</Bold> <br />
        <GrayTxt>PXL</GrayTxt> <Bold>Fashion</Bold> <GrayTxt>Viewer</GrayTxt>
      </SubTitle>
      <Search>
        <SearchBar
          type='text'
          placeholder='IMAGE URL or KEYWORD'
          {...searchInput}
          onKeyPress={(e) => e.key === 'Enter' && search()}
        />
        <SearchBtn onClick={search}>검색</SearchBtn>
      </Search>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
`;
const SubTitle = styled.h2`
  font: normal 30px/1.5 'inherit';
  text-align: center;
  color: #444;
  margin-top: 70px;
  margin-bottom: 100px;
`;
const Bold = styled.span`
  font-weight: bold;
`;
const GrayTxt = styled.span`
  color: gray;
`;
const Search = styled.div`
  display: flex;
  width: 70vw;
  max-width: 700px;
  min-width: 350px;
  margin: 0 auto;

  @media screen and (max-width: 400px) {
    width: 90vw;
    min-width: auto;
    margin-right: 10px;
  }
`;

const SearchBar = styled.input`
  width: calc(100% - 80px - 20px);
  height: 35px;
  margin-right: 20px;
  border-radius: 20px;
  border: none;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.08);
  padding: 0px 20px;
  font-size: 12px;
  outline: none;

  ::placeholder {
    color: #999;
  }

  @media screen and (max-width: 400px) {
    margin-right: 10px;
  }
`;

const SearchBtn = styled.button`
  width: 80px;
  border: none;
  border-radius: 10px;
  color: #333;
  font: bold 16px/1 'inherit';
  cursor: pointer;
`;
export default HomeOne;

//데이터 호출
export const callData = () => {
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

        setProductData(productResults);
        setRegionData(regionResults);
      })
    )
    .catch((err) => alert(`에러 ${err}`));
};

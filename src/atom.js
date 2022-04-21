import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const posts = atom({
  key: 'posts',
  default: [],
});

export const postsSelector = selector({
  key: 'postsSelector',
  get: ({ get }) => {
    const getposts = get(posts);
    return getposts;
  },
});
// 검색어 강조 데이터
export const text = atom({
  key: 'text',
  default: '',
});
// api 데이터

export const regionData = atom({
  key: 'regionData',
  default: [],
});

export const productData = atom({
  key: 'productData',
  default: [],
});
// 캔버스
export const canvasData = atom({
  key: 'canvasData',
  default: [],
});
export const canvasSelector = selector({
  key: 'canvasSelector',
  get: ({ get }) => {
    const getcanvas = get(canvasData);
    return getcanvas;
  },
});

// 로컬 데이터
// 1번문제 로컬
export const counterState = atom({
  key: 'counterState',
  default: postsSelector,
  effects_UNSTABLE: [persistAtom],
});
export const textState = atom({
  key: 'textState',
  default: text,
  effects_UNSTABLE: [persistAtom],
});

// 2번 문제 로컬
export const canvasState = atom({
  key: 'canvasState',
  default: canvasSelector,
  effects_UNSTABLE: [persistAtom],
});

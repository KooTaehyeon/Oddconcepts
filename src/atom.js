import { atom, selector } from 'recoil';

export const posts = atom({
  key: 'posts',
  default: [],
});

export const postsSelector = selector({
  key: 'postsSelector',
  get: ({ get }) => {
    const user = get(posts);
    return user;
  },
  set: ({ set }) => {
    set(posts, (prevState) => ({
      ...prevState,
    }));
  },
});

import { useState, useCallback } from 'react';

const Sort = {
  Desc: 'Desc',
  Asc: 'Aasc',
};

function useFilter(url) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(Sort.Desc);
  const [word, setWord] = useState('');

  function toogleSort() {
    setSort((prevSort) => (prevSort === Sort.Desc ? Sort.Asc : Sort.Desc));
  }

  const fetchData = useCallback(() => {
    const fetchUrl = `${url}?page=${page}&sort=${sort}&word=${word}`;
    console.log('fetchUrl', fetchUrl);
    return fetch(fetchUrl, { method: 'Get' }).then((res) => res.json());
  }, [url, page, sort, word]);

  return {
    page,
    setPage,
    sort,
    setSort,
    toogleSort,
    word,
    setWord,
    fetchData,
  };
}

export default useFilter;

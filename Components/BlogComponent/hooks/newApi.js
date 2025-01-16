import axios from 'axios';

export async function newsApi({startIndex, setTotalCount}) {
  const newsApiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    
  const url = `https://content.guardianapis.com/search?api-key=${newsApiKey}`;
  const params = {
    country: 'us',
    pageSize: 10,
    startIndex: startIndex,
    query: "Saksham"
  };

  try {
    const res = await axios.get(url, { params });
    const articles = res.data?.response?.results;
      setTotalCount(res.data?.response?.total);
    return articles;
  } catch (error) {
    return {
      props: {
        articles: [],
      },
    };
  }
}
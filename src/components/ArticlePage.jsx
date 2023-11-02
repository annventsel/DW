import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const ARTICLE_QUERY = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
      id
      title
      summary
      imageUrl
      text
    }
  }
`;

const ArticlePage = () => {
  const { loading, error, data } = useQuery(ARTICLE_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>{data.article.title}</h1>
      <p>{data.article.summary}</p>
      <img src={data.article.image_url} alt="изображение статьи" />
      <p>{data.article.text}</p>
    
      <nav>
        <ul>
          <li><Link to="/s/home">Home</Link></li>
          <li><Link to="/config">Configuration</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default ArticlePage;
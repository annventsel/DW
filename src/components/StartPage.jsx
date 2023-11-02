import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const START_QUERY = gql`
  query GetStartPage {
    startPage {
      id
      title
      summary
      imageUrl
      text
      spaces {
        id
        components {
          id
          contentItems {
            id
            title
            summary
            imageUrl
          }
        }
      }
    }
  }
`;

const StartPage = () => {
  const { loading, error, data } = useQuery(START_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>{data.startPage.title}</h1>
      {data.startPage.spaces.map((space) => (
        <div key={space.id}>
          {space.components.map((component) => (
            <div key={component.id}>
              {component.contentItems.map((item) => (
                <Link key={item.id} to={`/a/${item.id}`}>
                  <h2>{item.title}</h2>
                  <p>{item.summary}</p>
                  <img src={item.imageUrl} alt={item.title} />
                </Link>
              ))}
            </div>
          ))}
        </div>
      ))}
      
      <nav>
        <ul>
          <li><Link to="/s/home">Home</Link></li>
          <li><Link to="/config">Configuration</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default StartPage;
import { useQuery, gql } from '@apollo/client';

const CONFIG_QUERY = gql`
  query GetConfig {
    config {
      languages {
        id
        name
      }
    }
  }
`;

const ConfigPage = () => {
  const { loading, error, data } = useQuery(CONFIG_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Congiguration</h1>
      <h2>Languages</h2>
      <ul>
        {data.config.languages.map((language) => (
          <li key={language.id}>{language.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ConfigPage;
import { graphqlRequest } from './src/services/graphql.js';
graphqlRequest('{ __schema { queryType { fields { name } } } }')
  .then(r => console.log(JSON.stringify(r.data.__schema.queryType.fields.map(f => f.name))))
  .catch(console.error);

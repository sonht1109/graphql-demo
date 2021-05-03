import {gql} from '@apollo/client'

export const AUTHORS_QUERY = gql`
  {
    authors{
      id
      name
    }
  }
`;
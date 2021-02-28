import { gql } from '@apollo/client';

export const GET_ALL_CHARACTERS = gql`
  query {
    characters {
      results {
        id, name, image
      }
    }
  }
`

export const GET_ALL_EPISODES = gql`
  query {
    episodes {
      results {
        id, name, air_date
      }
    }
  }
`
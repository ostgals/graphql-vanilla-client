import React, { Component } from 'react';
import axios from 'axios';

import Organization from './Organization';

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
});

const GET_ISSUES_OF_REPOSITORY = `
  query ($organization: String!, $repository: String!) {
    organization (login: $organization) {
      name
      url
      repository (name: $repository) {
        name
        url
        issues (last: 5) {
          edges {
            node {
              id
              title
              url
              reactions (last: 3) {
                edges {
                  node {
                    id
                    content
                  }
                }
              }
            }
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;

class App extends Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react',
    organization: null,
    errors: null,
  };

  componentDidMount() {
    this.fetchFromGitHub();
  }

  onChange = e => this.setState({ path: e.target.value });

  onSubmit = e => {
    this.fetchFromGitHub();
    e.preventDefault();
  };

  fetchFromGitHub = () => {
    const [organization, repository] = this.state.path.split('/');
    const query = GET_ISSUES_OF_REPOSITORY;
    const variables = { organization, repository };

    axiosGitHubGraphQL.post('', { query, variables }).then(result =>
      this.setState({
        organization: result.data.data.organization,
        errors: result.data.errors,
      }),
    );
  };

  fetchMoreIssues = () => {};

  render() {
    const { path, organization, errors } = this.state;

    return (
      <div className="App">
        <h1>React GraphQL GitHub Client</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">Show open issues for https://github.com/</label>
          <input
            type="text"
            id="url"
            value={path}
            onChange={this.onChange}
            style={{ width: 300 }}
          />
          <button>Search</button>
        </form>

        <hr />

        {organization ? (
          <Organization
            organization={organization}
            errors={errors}
            fetchMoreIssues={this.fetchMoreIssues}
          />
        ) : (
          <p>No information yet...</p>
        )}
      </div>
    );
  }
}

export default App;

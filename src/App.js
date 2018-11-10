import React, { Component } from 'react';
import axios from 'axios';

import Organization from './Organization';

import { GET_ISSUES_OF_REPOSITORY } from './graphql/queries';
import { ADD_STAR, REMOVE_STAR } from './graphql/mutations';

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
});

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

  resolveIssues = (result, cursor) => state => {
    const { data, errors } = result.data;

    if (!cursor) {
      return {
        organization: data.organization,
        errors,
      };
    }

    const concatenatedIssues = [
      ...state.organization.repository.issues.edges,
      ...data.organization.repository.issues.edges,
    ];

    return {
      organization: {
        ...data.organization,
        repository: {
          ...data.organization.repository,
          issues: {
            ...data.organization.repository.issues,
            edges: concatenatedIssues,
          },
        },
      },
      errors,
    };
  };

  resolveToggleStarMutation = result => state => {
    const { viewerHasStarred } = result.data.data.toggleStar.starrable;
    const { errors } = result.data;
    const { totalCount } = state.organization.repository.stargazers;

    if (errors) {
      console.log(errors);
      return { errors };
    }

    return {
      ...state,
      organization: {
        ...state.organization,
        repository: {
          ...state.organization.repository,
          viewerHasStarred,
          stargazers: {
            ...state.organization.repository.stargazers,
            totalCount: totalCount + (viewerHasStarred ? +1 : -1),
          },
        },
      },
    };
  };

  fetchFromGitHub = cursor => {
    const [organization, repository] = this.state.path.split('/');
    const query = GET_ISSUES_OF_REPOSITORY;
    const variables = { organization, repository, cursor };

    axiosGitHubGraphQL
      .post('', { query, variables })
      .then(result => this.setState(this.resolveIssues(result, cursor)));
  };

  fetchMoreIssues = () => {
    const { endCursor } = this.state.organization.repository.issues.pageInfo;
    console.log(endCursor);
    this.fetchFromGitHub(endCursor);
  };

  toggleStar = ({ id, viewerHasStarred }) => {
    axiosGitHubGraphQL
      .post('', {
        query: viewerHasStarred ? REMOVE_STAR : ADD_STAR,
        variables: { repositoryId: id },
      })
      .then(result => {
        this.setState(this.resolveToggleStarMutation(result));
      });
  };

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
            toggleStar={this.toggleStar}
          />
        ) : (
          <p>No information yet...</p>
        )}
      </div>
    );
  }
}

export default App;

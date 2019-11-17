import React, { Component } from "react";

import CompareList from "../../components/CompareList";
import { Container, Form } from "./styles";
import Logo from "../../assets/logo.png";
import api from "../../services/api";
import moment from "moment";

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: "",
    repositories: []
  };

  componentDidMount() {
    if (localStorage.getItem("repositories")) {
      this.setState({
        repositories: JSON.parse(localStorage.getItem("repositories"))
      });
    } else {
      localStorage.setItem("repositories", []);
    }
  }

  removeItem = id => {
    const result = this.state.repositories.filter(repository => {
      return repository.id !== id;
    });

    this.setState({
      repositories: result
    });

    localStorage.setItem("repositories", JSON.stringify(result));
  };

  updateItem = async repositoryFullName => {
    let indexRepository = null;

    const result = this.state.repositories.filter((repository, index) => {
      if (repository.full_name === repositoryFullName) {
        indexRepository = index;
        return false;
      } else {
        return true;
      }
    });

    const { data: repository } = await api.get(`repos/${repositoryFullName}`);

    repository.lastCommit = moment(repository.pushed_at).fromNow();

    result.splice(indexRepository, 0, repository);

    this.setState({
      repositories: result
    });

    localStorage.setItem("repositories", JSON.stringify(result));
  };

  handleAtRepository = async e => {
    e.preventDefault();

    this.setState({
      loading: true
    });

    await this.ApiCall();

    this.setState({
      loading: false
    });
  };

  ApiCall = async () => {
    try {
      const { data: repository } = await api.get(
        `repos/${this.state.repositoryInput}`
      );

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState(
        {
          repositoryError: false,
          repositoryInput: "",
          repositories: [...this.state.repositories, repository]
        },
        () => {
          localStorage.setItem(
            "repositories",
            JSON.stringify(this.state.repositories)
          );
        }
      );
    } catch (err) {
      this.setState({
        repositoryError: true
      });
    }
  };

  render() {
    return (
      <Container>
        <img src={Logo} alt="Logo" />

        <Form
          withError={this.state.repositoryError}
          onSubmit={this.handleAtRepository}
        >
          <input
            type="text"
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={e =>
              this.setState({
                repositoryInput: e.target.value
              })
            }
          />
          <button type="submit">
            {this.state.loading ? (
              <i className="fa fa-spinner fa-pulse"></i>
            ) : (
              "OK"
            )}
          </button>
        </Form>

        <CompareList
          repositories={this.state.repositories}
          removeItem={this.removeItem}
          updateItem={this.updateItem}
        />
      </Container>
    );
  }
}

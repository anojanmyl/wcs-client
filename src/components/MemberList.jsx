import React, { Component } from "react";
import axios from "axios";
import "../App.css";

export class MemberList extends Component {
  state = {
    allnames: [],
    name: "",
  };

  // GET NAMES
  getNames() {
    axios.get(`http://localhost:4000/list`).then((response) => {
      console.log("response", response);
      this.setState({ allnames: response.data });
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // POST NAMES
  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/list", {
        name: this.state.name,
      })
      .then((response) => {
        this.setState({
          allnames: [...this.state.allnames, this.state.name],
        });
        console.log("Created !", response);
      });
    this.getNames();
  };

  render() {
    console.log("test", this.state.name);
    console.log(">>>", this.state.allnames);
    return (
      <div>
        <main>
          <h2>Ajouter un(e) Argonaute</h2>
          <form onSubmit={this.handleSubmit} className="new-member-form">
            <label htmlFor="name">Nom de l'Argonaute</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Tapez le nom ici"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
            <button className="btn" type="submit">
              Envoyer
            </button>
          </form>

          <h2>Membres de l'équipage</h2>

          <section className="member-list">
            <ul className="list">
              {this.state.allnames.map((info) => {
                return (
                  <div>
                    <li key={info._id}>{info.name}</li>
                  </div>
                );
              })}
            </ul>
          </section>
        </main>
      </div>
    );
  }
}

export default MemberList;

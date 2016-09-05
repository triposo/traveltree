import React from 'react';

export default class WorldContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      countries: null
    }
  }

  componentDidMount() {
    fetch(`http://testing.triposo.com/api/v0/location.json?count=40&order_by=-score&fields=name,country_id,id,snippet,score,loctype`)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({countries: json.results})
      }).catch(rejected => {
        console.log("REJECTED: ", rejected)
      }).then(() => {
        console.log("Continue");
      })
  }

  render() {
    if (!this.state.countries) return <p>Loading</p>
    return (
      <div>
        {this.state.countries.map(country => <p key={country.id}>{country.name}</p>)}
      </div>
    )
  }
}

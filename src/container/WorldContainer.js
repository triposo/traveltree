import React from 'react';

import Loader from '../component/Loader';
import Tile from '../component/Tile';
import {calculateSize} from '../utils/design.js';

export default class WorldContainer extends React.Component {

  disposer = null

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      countries: null,
      selectedTileId: ""
    }
  }

  selectTile = (id) => {
    this.setState({selectedTileId: id});
    this.disposer = setTimeout(() => {
      this.context.router.push(id);
    }, 500)
  }

  componentWillUnmount() {
    if (this.disposer) clearTimeout(this.disposer)
  }

  componentDidMount() {
    fetch(`http://testing.triposo.com/api/v0/location.json?type=country&count=45&order_by=-score&fields=name,country_id,id,snippet,score`)
      .then(response => response.json())
      .then(json => {
        this.setState({countries: json.results})
      }).catch(rejected => {
        console.log("REJECTED: ", rejected)
      });
  }

  render() {
    return (
      <div>
        <Loader show={this.state.countries === null} />
        <div className="tile-list">
          {this.state.countries
            ? this.state.countries.map((country, rank) => <Tile key={country.id} title={country.name} id={country.id} rank={rank} selectedTileId={this.state.selectedTileId} selectAction={this.selectTile} scale={calculateSize(rank+1, this.state.countries.length)} />)
            : ""
          }
        </div>
      </div>
    )
  }
}

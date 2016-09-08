import React from 'react'
import Loader from '../component/Loader'
import Tile from '../component/Tile'
import TilesHeader from '../component/TilesHeader'
import {calculateSize} from '../utils/design.js'

export default class CountryContainer extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      country: null,
      cities: null,
      selectedTileId: ""
    }
  }

  selectTile = (id) => {
    this.setState({selectedTileId: id});
    setTimeout(() => {
      this.context.router.push(`/${this.props.params.countryId}/${id}`);
    }, 500)
  }

  componentDidMount() {
    fetch(`http://testing.triposo.com/api/v0/location.json?id=${this.props.params.countryId}&fields=name,country_id,id,snippet,score`)
      .then(response => response.json())
      .then(json => {
        this.setState({country: json.results[0]})
      }).catch(rejected => {
        console.log("REJECTED: ", rejected)
      });

    fetch(`http://testing.triposo.com/api/v0/location.json?type=city&count=45&order_by=-score&fields=name,country_id,id,snippet,score`)
      .then(response => response.json())
      .then(json => {
        this.setState({cities: json.results})
      }).catch(rejected => {
        console.log("REJECTED: ", rejected)
      });
  }

  render() {
    return (
      <div>
        <Loader show={this.state.cities === null || this.state.country === null} />
        {this.state.country
          ? <TilesHeader to="/" title={this.state.country.name} step={1} />
          : ""
        }
        <div className="tile-list">
          {this.state.cities
            ? this.state.cities.map((city, rank) => <Tile key={city.id} title={city.name} id={city.id} rank={rank} selectedTileId={this.state.selectedTileId} selectAction={this.selectTile} scale={calculateSize(rank+1, this.state.cities.length)} />)
            : ""
          }
        </div>
      </div>
    )
  }
}

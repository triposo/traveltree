import React from 'react'
import Loader from '../component/Loader'
import Tile from '../component/Tile'
import TilesHeader from '../component/TilesHeader'
import {calculateSize} from '../utils/design.js'

export default class CountryContainer extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  disposer = null

  constructor(props) {
    super(props)
    this.state = {
      country: null,
      city: null,
      activities: null,
      selectedTileId: ""
    }
  }

  selectTile = (id) => {
    this.setState({selectedTileId: id});
    this.disposer = setTimeout(() => {
      this.context.router.push(`/${this.props.params.countryId}/${this.props.params.cityId}/${id}`);
    }, 500)
  }

  componentWillUnmount() {
    if (this.disposer) clearTimeout(this.disposer)
  }

  componentDidMount() {
    fetch(`http://testing.triposo.com/api/v0/location.json?id=${this.props.params.countryId}&fields=name,country_id,id,snippet,score`)
      .then(response => response.json())
      .then(json => {
        this.setState({country: json.results[0]})
      }).catch(rejected => {
        console.log("REJECTED: ", rejected)
      });

    fetch(`http://testing.triposo.com/api/v0/location.json?id=${this.props.params.cityId}&fields=name,country_id,id,snippet,score`)
      .then(response => response.json())
      .then(json => {
        this.setState({city: json.results[0]})
      }).catch(rejected => {
        console.log("REJECTED: ", rejected)
      });

    fetch(`http://testing.triposo.com/api/v0/tag.json?&location_id=${this.props.params.cityId}&count=15&order_by=-score&fields=name,id,activity_id,snippet,score`)
      .then(response => response.json())
      .then(json => {
        this.setState({activities: json.results})
      }).catch(rejected => {
        console.log("REJECTED: ", rejected)
      });
  }

  render() {
    return (
      <div>
        <Loader show={this.state.cities === null || this.state.country === null || this.state.city === null} />
        {this.state.country
          ? <TilesHeader to="/" title={this.state.country.name} step={1}/>
          : ""
        }
        {this.state.city
          ? <TilesHeader to={`/${this.props.params.countryId}`} title={this.state.city.name} step={2} />
          : ""
        }
        <div className="tile-list">
          {this.state.activities
            ? this.state.activities.map((activity, rank) => <Tile key={activity.id} title={activity.name} id={activity.activity_id} rank={rank} selectedTileId={this.state.selectedTileId} selectAction={this.selectTile} scale={calculateSize(rank+1, this.state.activities.length)} />)
            : ""
          }
        </div>
      </div>
    )
  }
}

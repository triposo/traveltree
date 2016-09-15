import React from 'react'
import Loader from '../component/Loader'
import Tile from '../component/Tile'
import TilesHeader from '../component/TilesHeader'
import Portal from '../component/Portal'
import Poi from '../component/Poi'

import {calculateSize} from '../utils/design.js'

export default class ActivityContainer extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      country: null,
      city: null,
      activity: null,
      pois: null,
      selectedTileId: "",
      selectedPoiId: null
    }
  }

  selectTile = (id) => {
    this.context.router.push(`/${this.props.params.countryId}/${this.props.params.cityId}/${this.props.params.activityId}/${id}`);
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

    fetch(`http://testing.triposo.com/api/v0/tag.json?location_id=${this.props.params.cityId}&id=${this.props.params.activityId}&fields=name,id,snippet,score`)
      .then(response => response.json())
      .then(json => {
        this.setState({activity: json.results[0]})
      }).catch(rejected => {
        console.log("REJECTED: ", rejected)
      });

    fetch(`http://testing.triposo.com/api/v0/poi.json?&location_id=${this.props.params.cityId}&tags=${this.props.params.activityId}&count=45&order_by=-score&fields=name,id,snippet,score`)
      .then(response => response.json())
      .then(json => {
        this.setState({pois: json.results})
      }).catch(rejected => {
        console.log("REJECTED: ", rejected)
      });

    if (this.props.params.poiId) {
      this.showPoi(this.props.params.poiId);
    }
  }



  componentWillReceiveProps(nextProps) {
    if (nextProps.params.poiId) {
      this.showPoi(nextProps.params.poiId);
    }
  }

  showPoi(poiId) {
    this.setState({selectedPoiId: poiId})
  }

  onClosePoi() {
    this.setState({selectedPoiId: null})
    this.context.router.go(-1)
  }

  renderPoi() {
    return (
      <Poi poiId={this.state.selectedPoiId} />
    )
  }

  //TODO: should only render twice (before and after loading)
  render() {
    return (
      <div>
        <Loader show={this.state.pois === null || this.state.country === null || this.state.city === null || this.state.activity === null} />
        {this.state.country
          ? <TilesHeader to="/" title={this.state.country.name} step={1}/>
          : ""
        }
        {this.state.city
          ? <TilesHeader to={`/${this.props.params.countryId}`} title={this.state.city.name} step={2} />
          : ""
        }
        {this.state.activity
          ? <TilesHeader to={`/${this.props.params.countryId}/${this.props.params.cityId}`} title={this.state.activity.name} step={3} />
          : ""
        }
        <div className="tile-list">
          {this.state.pois
            ? this.state.pois.map((poi, rank) => <Tile key={poi.id} title={poi.name} id={poi.id} rank={rank} selectedTileId={this.state.selectedTileId} selectAction={this.selectTile} scale={calculateSize(rank+1, this.state.pois.length)} />)
            : ""
          }
        </div>

        {this.state.selectedPoiId
          ? <Portal render={this.renderPoi.bind(this)} onClose={this.onClosePoi.bind(this)} />
          : ""
        }
      </div>
    )
  }
}

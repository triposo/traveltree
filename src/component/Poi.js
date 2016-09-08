import React from 'react'

import Loader from '../component/Loader'
import Article from '../component/Article'

import '../style/poi.css'

export default class Poi extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      poi: null
    }
  }

  componentDidMount() {
    fetch(`http://testing.triposo.com/api/v0/poi.json?id=${this.props.poiId}&fields=name,id,article,score`)
      .then(response => response.json())
      .then(json => {
        this.setState({poi: json.results[0]})
      }).catch(rejected => {
        console.log("REJECTED: ", rejected)
      });
  }

  render() {
    return (
      <div>
        <Loader show={this.state.poi === null} />
        {this.state.poi
          ? <PoiBody poi={this.state.poi} />
          : ""
        }
      </div>
    )
  }
}

class PoiBody extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      shown: false
    }
  }

  componentDidMount() {
    this.setState({shown: true})
  }

  render() {
    const {poi} = this.props
    const json = JSON.parse(poi.article)



    return (
      <div className={this.state.shown ? "poi shown" : "poi"}>
        <h1>{poi.name}</h1>
        <Article json={json.suggestion_json.suggestions} />
      </div>
    )
  }
}

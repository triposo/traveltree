import React from 'react'
import {Link} from 'react-router'

export default class TilesHeader extends React.Component {

  render() {
    let classString = "tiles-header step-" + this.props.step;
    return (
      <Link to={this.props.to} className={classString}>
        {this.props.title}
        <svg fill="#000000" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </Link>
    )
  }
}

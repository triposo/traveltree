import React from 'react';
import {shadeColor} from '../utils/design';

const colorScale = ["#2eac6d", "#3fb97c", "#9dda52", "#dad852", "#daaf52", "#da8f52"];

export default class Tile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({show: true})
    }, this.props.rank * 60)
  }

  pickColor(scale) {
    const percent = 0 + scale.index * ((1/scale.total) / 2)
    return shadeColor(colorScale[scale.size-1], percent)
  }

  onClickAction = (e) => {
    e.preventDefault();
    this.props.selectAction(this.props.id);
  }

  render() {
    const {title, id, scale, selectedTileId} = this.props;
    const styleObj = {backgroundColor: this.pickColor(scale)}
    let classString = "tile size-" + scale.size

    if (this.state.show) classString += " show";

    if (selectedTileId) {
      if (selectedTileId === id) {
        classString += " selected";
      } else {
        classString += " unselected";
      }
    }

    return (
      <a href="#0" className={classString} style={styleObj} onClick={this.onClickAction}>
        <h2>{title}</h2>
      </a>
    )
  }
}

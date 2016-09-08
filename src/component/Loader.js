import React from 'react';

import '../style/loader.css';

export default class Loader extends React.Component {

  disposer = null

  constructor(props) {
    super(props)
    this.state = {
      show: null,
      disable: false
    }
  }

  componentDidMount() {
    this.disposer = setTimeout(() => {
      this.setState({show: this.props.show});
    }, 10);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show === this.props.show) return
    if (nextProps.show === false) {
      this.setState({show: false})
      this.disposer = setTimeout(() => {
        this.setState({disable: true})
      }, 3000)
    } else {
      this.setState({disable: false})
      this.disposer = setTimeout(() => {
        this.setState({show: true})
      }, 3000)
    }
  }

  componentWillUnmount() {
    if (this.disposer) clearInterval(this.disposer);
  }

  render() {
    let classString = "loader";
    if (this.state.show === true) {
      classString += " show"
    } else if (this.state.show === false) {
      classString += " hide"
    }

    let styleObj = {}
    if (this.state.disable === true) styleObj.display = "none"

    return (
      <div className={classString} style={styleObj}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }


}

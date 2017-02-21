import React, { Component, PropTypes } from 'react'
import Checkbox from 'material-ui/Checkbox'
import Visibility from 'material-ui/svg-icons/action/visibility'
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off'
import Perfs from 'mods/Perfs'

const style = {
  margin: 10,
  fontSize: 14,
}

export default class extends Component {

  constructor(props) {
    super(props)

    let { storageSyncName } = this.props

    this.state = {}

    Perfs.get(storageSyncName).then((showOrHide) => {
      this.setState({ isInputChecked: showOrHide })
    })
  }

  handleCheck(e, isInputChecked) {
    if (this.state.isInputChecked === isInputChecked) {
      return
    }

    let { storageSyncName } = this.props

    Perfs.set(storageSyncName, isInputChecked).then(() => {
      this.setState({ isInputChecked: isInputChecked })
    })
  }

  render() {
    if (typeof(this.state.isInputChecked) === 'undefined') {
      return (<div/>)
    }

    return (
      <Checkbox
        checked={this.state.isInputChecked}
        checkedIcon={<Visibility />}
        uncheckedIcon={<VisibilityOff />}
        label={this.props.label}
        style={style}
        onCheck={this.handleCheck.bind(this)}
      />
    )
  }
}

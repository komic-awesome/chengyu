import React, { Component, PropTypes } from 'react'
import { green400 } from 'material-ui/styles/colors'
import SectionTitle from './SectionTitle'

import VisibilityCheckbox from './VisibilityCheckbox'

let mainStyles = {
  maxWidth: 600,
  width: "calc(100% - 80px)",
  minWidth: "360px",
  backgroundColor: 'white',
  position: 'absolute',
  top: '134px',
  left: '0',
  right: '0',
  margin: '0 auto',
  padding: '0 40px 40px 40px',
  boxShadow: 'rgba(0, 0, 0, 0.247059) 0px 2px 5px 0px',
  borderRadius: '2px',
}

let titleStyles = {
  fontSize: 32,
  color: 'white',
  position: 'absolute',
  left: '0',
  top: '-80px',
  lineHeight: '80px',
  fontWeight: 'normal',
  margin: '0',
}

class OptionsPageContent extends Component {
  render() {
    return (
      <div style={mainStyles}>
        <h1 style={titleStyles}>Chrome 扩展配置</h1>
        <section>
          <SectionTitle>隐藏和显示配置</SectionTitle>
          <div>
            <VisibilityCheckbox
              storageSyncName="showOrHideInContextMenus"
              label="在右键菜单中隐藏模块" />
          </div>
        </section>
      </div>
    )
  }
}

export default OptionsPageContent

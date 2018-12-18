import React from 'react'
import { PropTypes } from 'prop-types'
import { ProviderHocContext } from '../provider-hoc'

// 旧版本的API
// 前一个参数是 props，后面一个参数是 Context
// const Slot = ({ name, children }, { addOnRenderers }) => {
//   const content = addOnRenderers[name]
//   return (
//     content || children || null
//   )
// }

// 新版本的API
const Slot = ({ name, children }) => {
  return (
    <ProviderHocContext.Consumer>
      {
        (context) => {
          const { addOnRenderers } = context
          const content = addOnRenderers[name]
          return (content || children || null)
        }
      }
    </ProviderHocContext.Consumer>
  )
}

Slot.displayName = 'Slot'
Slot.contextTypes = {
  addOnRenderers: PropTypes.object
}
Slot.propTypes = {
  name: PropTypes.string
}
Slot.defaultProps = {
  name: '$$default'
}

export default Slot

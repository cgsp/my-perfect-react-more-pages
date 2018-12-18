import React, { Component } from 'react'
// import { PropTypes } from 'prop-types'

function getDisplayName(component) {
  return component.displayName || component.name || 'component'
}

// 新版本的API是这么提供的
export const ProviderHocContext = React.createContext({
  addOnRenderers: {}
})

export default function ProviderHoc(Comp) {
  return class extends Component {
    static displayName = `SlotProvider(${getDisplayName(Comp)})`

    // 旧版本的API是这么提供的，16.4版本之后，采用新的API， 就不再需要这个了(但是，同时兼容旧版本的API)
    // static childContextTypes = {
    //   addOnRenderers: PropTypes.object,
    // }

    constructor(props) {
      super(props)
      // 用于缓存每个<AddOn />的内容
      this.addOnRenderers = {}
    }

    // 旧版本的API是这么提供的，16.4版本之后，采用新的API(但是，同时兼容旧版本的API)
    // getChildContext() {
    //   return {
    //     addOnRenderers: this.addOnRenderers
    //   }
    // }

    render() {
      const { children, ...restProps } = this.props
      if (children) {
        // 以k-v的形式，缓存<AddOn />的内容
        const arr = React.Children.toArray(children)
        const nameChecked = []
        this.addOnRenderers = {}
        console.log(arr)
        arr.forEach(item => {
          const itemType = item.type
          if (itemType.displayName === 'AddOn') {
            const slotName = item.props.slot || '$$default'
            // 确保内容的唯一性
            if (nameChecked.findIndex(item => item === slotName) !== -1) {
              throw new Error(`名称为${slotName}的插槽已经存在了`)
            }
            this.addOnRenderers[slotName] = item.props.children
            nameChecked.push(slotName)
          }
        })
      }
      return (
        // 新版本的API
        <ProviderHocContext.Provider
          value={{
            addOnRenderers: this.addOnRenderers
          }}
        >
          <Comp {...restProps} />
        </ProviderHocContext.Provider>
      )
    }
  }
}

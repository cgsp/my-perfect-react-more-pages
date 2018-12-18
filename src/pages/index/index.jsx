import React, { Component } from 'react'

class Index extends Component {
  render() {
    const fn = (a, ...rest) => {
      console.log(a)
      console.log(rest)
    }
    fn(1, { a: 12 }, { b: 13 }, 4)
    const obi = { a: 111 }
    return (
      <div>{`${obi}`}</div>
    )
  }
}
export default Index

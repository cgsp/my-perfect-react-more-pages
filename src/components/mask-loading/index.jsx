import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import style from './style'
import img0 from './loading0.gif'
import img1 from './loading1.gif'
import img2 from './loading2.gif'
import img3 from './loading3.gif'
import img4 from './loading4.gif'
import img5 from './loading5.gif'
import img6 from './loading6.gif'
import img7 from './loading7.gif'
import img8 from './loading8.gif'
import img9 from './loading9.gif'

export default class MaskLoading extends Component {
  static propTypes = {
    msg: PropTypes.string,
  }

  static defaultProps = {
    msg: '',
  }

  constructor(props) {
    super(props)
    let num = 0
    num = Math.floor(Math.random() * 10)
    this.state = {
      num
    }
  }

  render() {
    const { num } = this.state
    let imgsrc = null
    switch (num) {
      case 0:
        imgsrc = img0
        break
      case 1:
        imgsrc = img1
        break
      case 2:
        imgsrc = img2
        break
      case 3:
        imgsrc = img3
        break
      case 4:
        imgsrc = img4
        break
      case 5:
        imgsrc = img5
        break
      case 6:
        imgsrc = img6
        break
      case 7:
        imgsrc = img7
        break
      case 8:
        imgsrc = img8
        break
      case 9:
        imgsrc = img9
        break
      default:
        imgsrc = img8
        break
    }
    const content = (
      <div className={style['mask-loading']}>
        <div className={style.loading}>
          {
            num === 7 || num === 1 || num === 0 ?
              <img className={style.img} src={imgsrc} alt="" style={{ width: '50px', height: 'auto' }} /> :
              <img className={style.img} src={imgsrc} alt="" style={{ width: '150px', height: 'auto' }} />
          }
          {
            this.props.msg ?
              <p className={style.desc}>{this.props.msg}</p>
              : null
          }
        </div>
      </div>

    )
    return content
  }
}

// 控制时间插件的hoc高阶组件
import React, { Component } from 'react'
import moment from 'moment'

export default function TimeControlHoc(Comp) {
  return class extends Component {
    constructor() {
      super()
      this.state = {
        searchCreateTimeBegin: null,
        searchCreateTimeEnd: null,
        searchUpdateTimeBegin: null,
        searchUpdateTimeEnd: null
      }

      this.disabledCreateBeginDate = this.disabledCreateBeginDate.bind(this)
      this.disabledUpdateBeginDate = this.disabledUpdateBeginDate.bind(this)
      this.disabledCreateEndDate = this.disabledCreateEndDate.bind(this)
      this.disabledUpdateEndDate = this.disabledUpdateEndDate.bind(this)
      this.disabledCreateBeiginTime = this.disabledCreateBeiginTime.bind(this)
      this.disabledUpdateBeiginTime = this.disabledUpdateBeiginTime.bind(this)
      this.disabledCreateEndTime = this.disabledCreateEndTime.bind(this)
      this.disabledUpdateEndTime = this.disabledUpdateEndTime.bind(this)
      this.onDateAndTimeChange = this.onDateAndTimeChange.bind(this)
      this.onCreateBeginDateAndTimeChange = this.onCreateBeginDateAndTimeChange.bind(this)
      this.onUpdateBeginDateAndTimeChange = this.onUpdateBeginDateAndTimeChange.bind(this)
      this.onCreateEndDateAndTimeChange = this.onCreateEndDateAndTimeChange.bind(this)
      this.onUpdateEndDateAndTimeChange = this.onUpdateEndDateAndTimeChange.bind(this)
      this.clearAllTime = this.clearAllTime.bind(this)
      this.resetTime = this.resetTime.bind(this)
    }

    // 控制时间插件的函数
    disabledCreateBeginDate = (searchCreateTimeBegin) => {
      const searchCreateTimeEnd = this.state.searchCreateTimeEnd
      if (!searchCreateTimeBegin || !searchCreateTimeEnd) {
        return false
      }
      return searchCreateTimeBegin.valueOf() >= searchCreateTimeEnd.valueOf()
    }

    // 控制时间插件的函数
    disabledUpdateBeginDate = (searchUpdateTimeBegin) => {
      const searchUpdateTimeEnd = this.state.searchUpdateTimeEnd
      if (!searchUpdateTimeBegin || !searchUpdateTimeEnd) {
        return false
      }
      return searchUpdateTimeBegin.valueOf() >= searchUpdateTimeEnd.valueOf()
    }

    disabledCreateEndDate = (searchCreateTimeEnd) => {
      const searchCreateTimeBegin = this.state.searchCreateTimeBegin
      if (!searchCreateTimeEnd || !searchCreateTimeBegin) {
        return false
      }
      return searchCreateTimeEnd.valueOf() <= searchCreateTimeBegin.valueOf()
    }

    disabledUpdateEndDate = (searchUpdateTimeEnd) => {
      const searchUpdateTimeBegin = this.state.searchUpdateTimeBegin
      if (!searchUpdateTimeEnd || !searchUpdateTimeBegin) {
        return false
      }
      return searchUpdateTimeEnd.valueOf() <= searchUpdateTimeBegin.valueOf()
    }

    disabledCreateBeiginTime = (searchCreateTimeBegin) => {
      // console.log('点击了')
      const searchCreateTimeEnd = this.state.searchCreateTimeEnd
      if (!searchCreateTimeEnd) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }

      if (!searchCreateTimeBegin) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }
      if (searchCreateTimeBegin.year() < searchCreateTimeEnd.year()) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }
      if (searchCreateTimeBegin.year() === searchCreateTimeEnd.year() && searchCreateTimeBegin.month() < searchCreateTimeEnd.month()) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }
      if (searchCreateTimeBegin.year() === searchCreateTimeEnd.year() && searchCreateTimeBegin.month() === searchCreateTimeEnd.month() && searchCreateTimeBegin.date() < searchCreateTimeEnd.date()) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }


      const endhour = searchCreateTimeEnd.hour() - 0
      const endminute = searchCreateTimeEnd.minute() - 0
      const endseconds = searchCreateTimeEnd.seconds() - 0


      const beiginhour = searchCreateTimeBegin ? searchCreateTimeBegin.hour() - 0 : 0
      const beiginminute = searchCreateTimeBegin ? searchCreateTimeBegin.minute() - 0 : 0
      // const beiginseconds = searchCreateTimeBegin ? searchCreateTimeBegin.seconds() - 0 : 0

      let disabledHours = () => range(endhour + 1, 60)
      let disabledMinutes
      let disabledSeconds

      if (beiginhour < endhour) {
        disabledMinutes = () => []
        disabledSeconds = () => []
      } else {
        if (beiginminute < endminute) {
          disabledMinutes = () => range(endminute + 1, 60)
          disabledSeconds = () => []
        } else {
          disabledMinutes = () => range(endminute + 1, 60)
          disabledSeconds = () => range(endseconds + 1, 60)
        }
      }

      function range(start, end) {
        const result = []
        for (let i = start; i < end; i++) {
          result.push(i)
        }
        return result
      }

      return {
        disabledHours,
        disabledMinutes,
        disabledSeconds
      }
    }

    disabledUpdateBeiginTime = (searchUpdateTimeBegin) => {
      // console.log('点击了')
      const searchUpdateTimeEnd = this.state.searchUpdateTimeEnd
      if (!searchUpdateTimeEnd) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }

      if (!searchUpdateTimeBegin) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }
      if (searchUpdateTimeEnd.year() > searchUpdateTimeBegin.year()) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }
      if (searchUpdateTimeEnd.year() === searchUpdateTimeBegin.year() && searchUpdateTimeEnd.month() > searchUpdateTimeBegin.month()) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }
      if (searchUpdateTimeEnd.year() === searchUpdateTimeBegin.year() && searchUpdateTimeEnd.month() === searchUpdateTimeBegin.month() && searchUpdateTimeEnd.date() > searchUpdateTimeBegin.date()) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }

      const endhour = searchUpdateTimeEnd.hour() - 0
      const endminute = searchUpdateTimeEnd.minute() - 0
      const endseconds = searchUpdateTimeEnd.seconds() - 0


      const beiginhour = searchUpdateTimeBegin ? searchUpdateTimeBegin.hour() - 0 : 0
      const beiginminute = searchUpdateTimeBegin ? searchUpdateTimeBegin.minute() - 0 : 0
      // const beiginseconds = searchUpdateTimeBegin ? searchUpdateTimeBegin.seconds() - 0 : 0

      let disabledHours = () => range(endhour + 1, 60)
      let disabledMinutes
      let disabledSeconds

      if (beiginhour < endhour) {
        disabledMinutes = () => []
        disabledSeconds = () => []
      } else {
        if (beiginminute < endminute) {
          disabledMinutes = () => range(endminute + 1, 60)
          disabledSeconds = () => []
        } else {
          disabledMinutes = () => range(endminute + 1, 60)
          disabledSeconds = () => range(endseconds + 1, 60)
        }
      }

      function range(start, end) {
        const result = []
        for (let i = start; i < end; i++) {
          result.push(i)
        }
        return result
      }

      return {
        disabledHours,
        disabledMinutes,
        disabledSeconds
      }
    }

    disabledCreateEndTime = (searchCreateTimeEnd) => {
      // console.log('点击了')
      const searchCreateTimeBegin = this.state.searchCreateTimeBegin
      if (!searchCreateTimeBegin) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }
      if (!searchCreateTimeEnd) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }
      if (searchCreateTimeEnd.year() > searchCreateTimeBegin.year()) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }
      if (searchCreateTimeEnd.year() === searchCreateTimeBegin.year() && searchCreateTimeEnd.month() > searchCreateTimeBegin.month()) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }
      if (searchCreateTimeEnd.year() === searchCreateTimeBegin.year() && searchCreateTimeEnd.month() === searchCreateTimeBegin.month() && searchCreateTimeEnd.date() > searchCreateTimeBegin.date()) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }

      const endhour = searchCreateTimeEnd ? searchCreateTimeEnd.hour() - 0 : 0
      const endminute = searchCreateTimeEnd ? searchCreateTimeEnd.minute() - 0 : 0
      // const endseconds = searchCreateTimeEnd ? searchCreateTimeEnd.seconds() - 0 : 0


      const beiginhour = searchCreateTimeBegin.hour() - 0
      const beiginminute = searchCreateTimeBegin.minute() - 0
      const beiginseconds = searchCreateTimeBegin.seconds() - 0

      let disabledHours = () => range(0, beiginhour)
      let disabledMinutes
      let disabledSeconds

      if (endhour > beiginhour) {
        disabledMinutes = () => []
        disabledSeconds = () => []
      } else {
        if (endminute > beiginminute) {
          disabledMinutes = () => range(0, beiginminute)
          disabledSeconds = () => []
        } else {
          disabledMinutes = () => range(0, beiginminute)
          disabledSeconds = () => range(0, beiginseconds)
        }
      }

      function range(start, end) {
        const result = []
        for (let i = start; i < end; i++) {
          result.push(i)
        }
        return result
      }

      return {
        disabledHours,
        disabledMinutes,
        disabledSeconds
      }
    }

    disabledUpdateEndTime = (searchUpdateTimeEnd) => {
      // console.log('点击了')
      const searchUpdateTimeBegin = this.state.searchUpdateTimeBegin
      if (!searchUpdateTimeBegin) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }
      if (!searchUpdateTimeEnd) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }
      if (searchUpdateTimeEnd.year() > searchUpdateTimeBegin.year()) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }
      if (searchUpdateTimeEnd.year() === searchUpdateTimeBegin.year() && searchUpdateTimeEnd.month() > searchUpdateTimeBegin.month()) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }
      if (searchUpdateTimeEnd.year() === searchUpdateTimeBegin.year() && searchUpdateTimeEnd.month() === searchUpdateTimeBegin.month() && searchUpdateTimeEnd.date() > searchUpdateTimeBegin.date()) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => []
        }
      }
      // console.log(typeof searchUpdateTimeBegin.year())
      // console.log(typeof searchUpdateTimeBegin.month())
      // console.log(typeof searchUpdateTimeBegin.date())
      const endhour = searchUpdateTimeEnd ? searchUpdateTimeEnd.hour() - 0 : 0
      const endminute = searchUpdateTimeEnd ? searchUpdateTimeEnd.minute() - 0 : 0
      // const endseconds = searchUpdateTimeEnd ? searchUpdateTimeEnd.seconds() - 0 : 0


      const beiginhour = searchUpdateTimeBegin.hour() - 0
      const beiginminute = searchUpdateTimeBegin.minute() - 0
      const beiginseconds = searchUpdateTimeBegin.seconds() - 0

      let disabledHours = () => range(0, beiginhour)
      let disabledMinutes
      let disabledSeconds

      if (endhour > beiginhour) {
        disabledMinutes = () => []
        disabledSeconds = () => []
      } else {
        if (endminute > beiginminute) {
          disabledMinutes = () => range(0, beiginminute)
          disabledSeconds = () => []
        } else {
          disabledMinutes = () => range(0, beiginminute)
          disabledSeconds = () => range(0, beiginseconds)
        }
      }

      function range(start, end) {
        const result = []
        for (let i = start; i < end; i++) {
          result.push(i)
        }
        return result
      }

      return {
        disabledHours,
        disabledMinutes,
        disabledSeconds
      }
    }

    onDateAndTimeChange = (field, value) => {
      this.setState({
        [field]: value,
      })
    }

    onCreateBeginDateAndTimeChange = (value) => {
      // console.log(value)
      this.onDateAndTimeChange('searchCreateTimeBegin', value)
    }

    onUpdateBeginDateAndTimeChange = (value) => {
      // console.log(value)
      this.onDateAndTimeChange('searchUpdateTimeBegin', value)
    }

    onCreateEndDateAndTimeChange = (value) => {
      this.onDateAndTimeChange('searchCreateTimeEnd', value)
    }

    onUpdateEndDateAndTimeChange = (value) => {
      this.onDateAndTimeChange('searchUpdateTimeEnd', value)
    }

    // 清空所有的时间
    clearAllTime = () => {
      this.setState({
        searchCreateTimeBegin: null,
        searchCreateTimeEnd: null,
        searchUpdateTimeBegin: null,
        searchUpdateTimeEnd: null
      })
    }

    resetTime = (key, timeStamp) => {
      this.setState({
        [key]: moment(timeStamp)
      })
    }

    render() {
      return (
        <Comp
          state={this.state}
          {...this.props}
          disabledCreateBeginDate={this.disabledCreateBeginDate}
          disabledUpdateBeginDate={this.disabledUpdateBeginDate}
          disabledCreateEndDate={this.disabledCreateEndDate}
          disabledUpdateEndDate={this.disabledUpdateEndDate}
          disabledCreateBeiginTime={this.disabledCreateBeiginTime}
          disabledUpdateBeiginTime={this.disabledUpdateBeiginTime}
          disabledCreateEndTime={this.disabledCreateEndTime}
          disabledUpdateEndTime={this.disabledUpdateEndTime}
          onDateAndTimeChange={this.onDateAndTimeChange}
          onCreateBeginDateAndTimeChange={this.onCreateBeginDateAndTimeChange}
          onUpdateBeginDateAndTimeChange={this.onUpdateBeginDateAndTimeChange}
          onCreateEndDateAndTimeChange={this.onCreateEndDateAndTimeChange}
          onUpdateEndDateAndTimeChange={this.onUpdateEndDateAndTimeChange}
          clearAllTime={this.clearAllTime}
          resetTime={this.resetTime}
        />
      )
    }
  }
}

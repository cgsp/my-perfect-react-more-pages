import { observable, action } from 'mobx'

class Store {
  @observable appLoading = false
  @observable appDownPercentLoading = false
  @observable appDownPercentLoadingPercent = 0

  @action
  changeAppLoading(state) {
    this.appLoading = state
  }

  @action
  changeAppDownPercentLoading(state, percent) {
    this.appDownPercentLoading = state
    this.appDownPercentLoadingPercent = percent
  }
}

export default new Store()

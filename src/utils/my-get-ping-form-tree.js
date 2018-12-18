export const myGetPingFromTree = (treeArr) => {
  let pingArr = []
  treeArr.forEach(fistItem => {
    pingArr.push(fistItem)
    if (fistItem.childResources) {
      fistItem.childResources.forEach(secondeItem => {
        pingArr.push(secondeItem)
        if (secondeItem.childResources) {
          secondeItem.childResources.forEach(thirdItem => {
            pingArr.push(thirdItem)
            if (thirdItem.childResources) {
              thirdItem.childResources.forEach(fourItem => {
                pingArr.push(fourItem)
              })
            }
          })
        }
      })
    }
  })
  return pingArr
}

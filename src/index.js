var extractor = require('extractjs')()
var every = require('lodash.every')

var matcherTemplate = (template) => {
  return new RegExp(template.replace(/{\w+}/g, '(.*?)'))
}

module.exports = (template) => {
  var mTmpl = matcherTemplate(template)
  return (str) => {
    if (str.match(mTmpl)) {
      var ex = extractor(template, str)
      var truthies = Object.keys(ex).map(k => {
        var v = ex[k]
        if (v)
          return true
      })
      return every(truthies) ? ex : false
    }
    return false
  }
}

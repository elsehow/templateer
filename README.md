# extract-match-string

match and extract from template strings

## install

```
npm install extract-match-strings
```

## use

```javascript
var extractMatch = require('extract-match-strings')
var template = "hello my {adj}, {noun}"
var matcher = extractMatch(template)
matcher('hello fuzzy my friend')
// > false
matcher('hello my fuzzy, ')
// > false
matcher("hello my fuzzy, tree friends")
// { adj: 'fuzzy', noun: 'tree friends'}
```

if your template doesn't take arguments, this will still work for you.
in this case, matcher will just return `{}` (which is truthy)

```javascript
var matcher = extractMatch('/fall through the book')
matcher('/fall through the book')
// > {}
matcher('/fall through the book nice')
// > {}
matcher('/fall through the book ')
// > {}
```

## api

### var matcher = extractMatch('some cool {template}')

make a matcher for a template. 

see [extractjs](https://www.npmjs.com/package/extractjs) for more on the template string format.

### matcher('some cool string')

if there is  match to the template, returns an object of template parameters associated to corresponding values in the string. (see example)

returns `false` if there is no match to the template

if there is a match, but the template string takes no arguments, `matcher` will return `{}`

## license

BSD

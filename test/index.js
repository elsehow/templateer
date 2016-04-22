var test = require('tape')
var mod = require('..')

test('should match simple, single-word commands', t => {
  var template = "hello my {adj} {noun}"
  var matcher = mod(template)
  t.notOk(matcher('hello fuzzy my friend'))
  t.notOk(matcher('hello my fuzzy '))
  t.notOk(matcher('hello my fuzzy'))
  var m =  matcher("hello my fuzzy friends")
  t.ok(m)
  t.deepEqual(m.adj, 'fuzzy')
  t.deepEqual(m.noun, 'friends')
  t.end()
})

test(' should match multiword commands', t => {
  var template = "/{cmd}"
  var matcher = mod(template)
  t.notOk(matcher('gets up'))
  var m = matcher('/gets up')
  t.ok(m)
  t.deepEqual(m.cmd, 'gets up')
  t.end()
})

test('should return {} when we have a match, but no arguments', t => {
  var template = "/fall through the book"
  var matcher = mod(template)
  t.notOk(matcher('fall through the book'))
  t.deepEqual(matcher('/fall through the book nice'), {})
  t.deepEqual(matcher('/fall through the book '), {})
  t.deepEqual(matcher('/fall through the book'), {})
  t.end()
})


test('robust multiword commands', t => {
  var template = "/you can {command} to go to {place}"
  var matcher = mod(template)
  t.notOk(matcher("/you can fall through the book"))
  var m = matcher("/you can fall through the book to go to a quiet island dock")
  t.deepEqual(m.command, 'fall through the book')
  t.deepEqual(m.place, 'a quiet island dock')
  t.end()
})

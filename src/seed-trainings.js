export default [{
  text: 'hi my name is david',
  action: {
    type: 'hi',
    tags: { to: [ 4, 4 ] }
  }
}, {
  text: 'hi i am david',
  action: {
    type: 'hi',
    tags: { to: [ 3, 3 ] }
  }
}, {
  text: 'hi i\'m david',
  action: {
    type: 'hi',
    tags: { to: [ 3, 3 ] }
  }
}, {
  text: 'let\'s learn something',
  action: { type: 'learn' }
}, {
  text: 'I need some help',
  action: { type: 'help' }
}, {
  text: 'show me the help',
  action: { type: 'help' }
}, {
  text: 'can you hear me',
  action: {
    type: 'reply',
    reply: 'Loud and clear'
  }
}];

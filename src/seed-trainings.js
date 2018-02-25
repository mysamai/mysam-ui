export default [{
  text: 'hi',
  action: {
    type: 'hi'
  }
}, {
  text: 'hello',
  action: {
    type: 'hi'
  }
}, {
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
  text: 'hello my name is david',
  action: {
    type: 'hi',
    tags: { to: [ 4, 4 ] }
  }
}, {
  text: 'hello i am david',
  action: {
    type: 'hi',
    tags: { to: [ 3, 3 ] }
  }
}, {
  text: 'hello i\'m david',
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
}, {
  text: 'thank you',
  action: {
    type: 'reply',
    reply: 'You\'re welcome'
  }
}, {
  text: 'how are you',
  action: {
    type: 'help',
    reply: 'I am great! Here is what I can do:'
  }
}, {
  text: 'how\'re you',
  action: {
    type: 'help',
    reply: 'I am great! Here is what I can do:'
  }
}, {
  text: 'how is it going',
  action: {
    type: 'help',
    reply: 'I am great! Here is what I can do:'
  }
}, {
  text: 'what is happening',
  action: {
    type: 'help',
    reply: 'Not too much. Here is what I can do:'
  }
}, {
  text: 'what\'s up',
  action: {
    type: 'help',
    reply: 'Not too much. Here is what I can do:'
  }
}];

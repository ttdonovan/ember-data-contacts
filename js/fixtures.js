App.Store.reopen({
  adapter: 'DS.FixtureAdapter'
});

App.Contact.FIXTURES = [{
  id: 100,
  firstName: 'Peter',
  lastName: 'Paker',
  email: 'spiderman@example.com'
}, {
  id: 101,
  firstName: 'Tony',
  lastName: 'Stark',
  email: 'ironman@example.com'
}, {
  id: 102,
  firstName: 'Steve',
  lastName: 'Rogers',
  email: 'captain.america@example.com'
}];
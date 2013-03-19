App = Ember.Application.create();

// Routers
App.Router.map(function() {
  this.resource('contacts', function() {
    // this.resource('contact', { path: ':contact_id' }, function() {
    //   this.route('edit');
    // });
  });

  // should this be nested within the contacts resource?
  // however when nesting the contact/index and contact/edit do not render.
  this.resource('contact', { path: '/contacts/:contact_id' }, function() {
    this.route('edit');
  });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('contacts');
  }
});

App.ContactsRoute = Ember.Route.extend({
  model: function() {
    return App.Contact.find();
  }
});

App.ContactIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('contact');
  },

  setupController: function(controller, model) {
    var editController = this.controllerFor('contactEdit');
    editController.stopEditing();
    controller.set('content', model);
  }
});

App.ContactEditRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('contact');
  },

  setupController: function(controller, model) {
    controller.set('content', model);
    controller.startEditing();
  }
});

// Controllers
App.ContactsController = Ember.ArrayController.extend({
  sortProperties: ['lastName']
});

App.ContactEditController = Ember.ObjectController.extend({
  startEditing: function() {
    // var controller = this.get('content');
    // var transaction = controller.get('store').transaction();
    // transaction.add(controller.get('model'));
    // this.transaction = transaction;
  },

  stopEditing: function() {
    // var transaction = this.transaction;
    // if (transaction) {
    //   transaction.rollback();
    //   this.transaction = undefined;
    // }
  },

  save: function() {
    // var transaction = this.transaction;
    // if (transaction) {
    //   transaction.commit();
    //   this.transaction = undefined;
    //   this.transitionToRoute('contact', this.get('content'));
    // }
  },

  cancel: function() {
    // var transaction = this.transaction;
    // if (transaction) {
    //   this.stopEditing();
    //   this.transitionToRoute('contact', this.get('content'));
    // }
  }
});

// Views
App.ContactFormView = Ember.View.extend({
  templateName: 'contact/form',
  tagName: 'form',

  didInsertElement: function() {
    this.$('input:first').focus();
  },

  submit: function() {
    this.get('controller').send('save');
    return false;
  }
});

// Models
App.Store = DS.Store.extend({
  revision: 11
});

App.Contact = DS.Model.extend({
  firstName:  DS.attr('string'),
  lastName:   DS.attr('string'),
  email:      DS.attr('string')
});
//TO DO: Activate on button click --DONE!
//TO DO: Put inside nice textbox with modal --DONE!
//TO DO: Figure out clever way to remove first "undefined line" --DONE!
//TO DO: Fixed 'undefined' error --DONE.
//TO DO: Deploy to zendesk
//TO DO (later): Check box (ex. check here to extract ENTIRE ticket and not just Magoosh answers)

(function() {

  var RESPONSE_DIVIDER = "\n\n##_____________________________##\n\n";

  return {

    defaultState: 'button',

    events: {
      'app.activated'            : 'init',
      'click .theButton'         : 'getInfo',

      'relatedInfoSettings.done' : 'showInfo',
      'relatedInfoSettings.fail' : 'showError',

      'hidden .my_modal'         : 'showButton'
    },

    requests: {
      // Example tickets:
      // Complicated ticket:     55911
      // Straightforward ticket: 61418

      relatedInfoSettings: function(id) {
        return {
          url: '/api/v2/tickets/' + id + '/comments.json',
          type:'GET',
          dataType: 'json'
        };
      }
    },

    init: function(){
      // nothing to do
    },

    // show the widget with button
    showButton: function(){
      this.switchTo('button');
    },

    getInfo: function(){
      this.ajax('relatedInfoSettings', this.ticket().id());
    },

    showInfo: function(data) {

      // Extract bodies of agent comments.
      var agentBodies = _(data.comments).filter(function(comment){
        /*
         * There's no flag in the JSON for whether a comment is by an agent, so
         * we use the following criteria:
         *
         * 1. If comment.source.rel is null, then it's not the initial comment,
         *    so it's very likely an agent
         * 2. If a student replies by email, the comment.source.rel would be 
         *    null so we check the object.via.source.from.address and if it's
         *    blank, then it IS an agent. If it has a value it's a student.
         *
         * Good request for Zendesk: Add a flag in the API to specify if a reply
         * is an agent or not.
         */
        return (comment.via.source.rel == null) && !comment.via.source.from.address;
      }).map(function(comment){
        return comment.body;
      });

      // Set up context object so we can pass it into the modal
      var context = {theText: agentBodies.join(RESPONSE_DIVIDER)};

      // HACK: this workaround allows us to prepare and display a modal template
      // with dynamic content
      this.switchTo('modal', context);
      this.$('.my_modal').modal({
        backdrop: true,
        keyboard: false
      });

    },


    showError: function() {
      this.switchTo('error');
    }

  };

}());

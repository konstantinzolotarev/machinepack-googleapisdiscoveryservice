'use strict';

var _ = require('lodash');
var google = require('googleapis');


module.exports = {


  friendlyName: 'List',


  description: 'Retrieve the list of APIs supported at this endpoint.',


  cacheable: true,


  sync: false,


  idempotent: false,


  inputs: {
    name: {
      example: 'plusDomains',
      description: 'Only include APIs with the given name.'
    },

    preferred: {
      example: true,
      description: 'Return only the preferred version of an API. (boolean)'
    },

    fields: {
      example: 'discoveryVersion,items(description,discoveryLink,discoveryRestUrl,documentationLink,icons,kind,labels,name,preferred,title,version,id),kind',
      description: 'Selector specifying which fields to include in a partial response.'
    }
  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
    }

  },


  fn: function(inputs, exits) {
    var discovery = google.discovery('v1');
    var params = {};
    _.merge(params, inputs);
    discovery.apis.list(params, function(err, result) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(result);
    });

  }

};

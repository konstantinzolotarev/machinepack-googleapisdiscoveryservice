'use strict';

var _ = require('lodash');
var google = require('googleapis');

module.exports = {


  friendlyName: 'Get Rest',


  description: 'Retrieve the description of a particular version of an api.',


  cacheable: true,


  sync: false,


  idempotent: false,


  inputs: {
    api: {
      example: 'plusDomains',
      description: 'The name of the API',
      required: true
    },

    version: {
      example: 'v1',
      description: 'The version of the API',
      required: true
    },

    fields: {
      example: 'servicePath,labels,name,methods,description,basePath,ownerName,etag,icons,id,discoveryVersion,kind,resources,baseUrl,packagePath,documentationLink,auth,version,title,parameters,protocol,batchPath,rootUrl,ownerDomain,canonicalName,revision,schemas,features',
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
    discovery.apis.getRest(params, function(err, result) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(result);
    });
  }

};

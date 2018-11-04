'use strict';

module.exports = function(Client) {
  Client.validatesInclusionOf('role', {in: ['Admin', 'SuperAdmin']});
};

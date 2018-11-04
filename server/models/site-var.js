'use strict';

module.exports = function(Sitevar) {
  Sitevar.validatesInclusionOf('type', { in: ['text', 'textarea', 'rich', 'image'] });
};

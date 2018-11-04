'use strict';

module.exports = function(Tenantlead) {
  Tenantlead.validatesInclusionOf('status', { in: ['new', 'contacted', 'qualified'] });
};

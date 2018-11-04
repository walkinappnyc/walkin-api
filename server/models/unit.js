'use strict';

module.exports = function(Unit) {
  Unit.validatesInclusionOf('type', { in: ['residential_rentals', 'commercial_office', 'commercial_retail'] });
  Unit.validatesInclusionOf('status', { in: ['available', 'unavailable', 'occupied'] });
};

// module.exports = function(app) {
//   app.dataSources.testwalk.automigrate('User', function(err) {
//     if (err) throw err;

//     app.models.User.create([{
//       email: 'Bel@Cafe.com',
//       password: 'Vancouver'
//     }, {
//       email: 'Three@sad.com',
//       password: 'SanMateo'
//     }, {
//       email: 'Caffe@Artigiano.com',
//       password: 'Vancouver'
//     }], function(err, coffeeShops) {
//       if (err) throw err;

//     });
//   });
// };
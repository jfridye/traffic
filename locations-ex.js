/*
  How to generate a Google Maps URL:
  1. Go to maps.google.com
  2. Add a starting address and destination address, hit enter
  3. Once the directions loads, click into the Details of one of the resulting options
  4. Copy URL from the address bar
  
  Note, PM URL should directions from the reverse of what you searched for above.
*/

const AM = [
  {home: 'my-home', work: 'downtown', url: '<google maps url>'},
  {home: 'my-home', work: 'domain', url: '<google maps url>'},
]

const PM = [
  {home: 'my-home', work: 'downtown', url: '<google maps url>'},
  {home: 'my-home', work: 'domain', url: '<google maps url>'},
]

module.exports = { AM, PM }
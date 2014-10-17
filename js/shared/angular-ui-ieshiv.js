/**
 * @author dbalmer@accela.com
 * @description add angular-ui elements to IE
 */
var elems = 'accordion,accordion-group,accordion-heading,alert,carousel,pagination,progressbar,rating,tab,tabset'.split(',');

for (var i=0; i<elems.length; i++) {
  document.createElement(elems[i]);
}

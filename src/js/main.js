
/**
 * First we will load all of this project's JavaScript dependencies.
 */

require('./bootstrap');

/**
 * Then we will load all of this project's JavaScript components.
 */

require('./bootstrap-datetimepicker');
require('./components/datetimepicker');
require('./components/selectpicker');
require('./components/toggles/menuToggle');
require('./components/toggles/modalToggle');
require('./components/toggles/categoryToggle');

/**
 * Here we'll include some JS from the old admin panel
 * to ensure backwards compatibility for the meanwhile.
 */

 require('./old/admin');
 require('./old/dynamicforms');

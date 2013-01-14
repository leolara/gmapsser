/* 
Copyright (c) 2004-2012 Leo Lara

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


function gmaps_result_serialize(result) {
    return {
        address_components: result.address_components,
        formatted_address: result.formatted_address,
        geometry: gmaps_geometry_serialize(result.geometry),
        types: result.types
    }
}

function gmaps_geometry_serialize(geometry) {
    var result = {
        location_type: geometry.location_type
    }
    
    if (typeof(geometry.location) != 'undefined') {
        result.location = gmaps_latlng_serialize(geometry.location);
    }
    
    if (typeof(geometry.bounds) != 'undefined') {
        result.bounds = gmaps_latlngbounds_serialize(geometry.bounds);
    }
    
    if (typeof(geometry.viewport) != 'undefined') {
        result.viewport = gmaps_latlngbounds_serialize(geometry.viewport);
    }
    
    return result;
}

function gmaps_latlng_serialize(latlng) {
    return {
        lat: latlng.lat(),
        lng: latlng.lng()
    }
}

function gmaps_latlngbounds_serialize(bounds) {
    return {
        sw: gmaps_latlng_serialize(bounds.getSouthWest()),
        ne: gmaps_latlng_serialize(bounds.getNorthEast())
    }
}

function gmaps_result_unserialize(result) {
    return {
        address_components: result.address_components,
        formatted_address: result.formatted_address,
        geometry: gmaps_geometry_unserialize(result.geometry),
        types: result.types
    }
}

function gmaps_geometry_unserialize(geometry) {
    var result = {
        location_type: geometry.location_type,
    }
    
    if (typeof(geometry.location) != 'undefined') {
        result.location = gmaps_latlng_unserialize(geometry.location);
    }
    
    if (typeof(geometry.bounds) != 'undefined') {
        result.bounds = gmaps_latlngbounds_unserialize(geometry.bounds);
    }
    
    if (typeof(geometry.viewport) != 'undefined') {
        result.viewport = gmaps_latlngbounds_unserialize(geometry.viewport);
    }
    
    return result;
}

function gmaps_latlng_unserialize(latlng) {
    return new google.maps.LatLng(latlng.lat, latlng.lng);
}

function gmaps_latlngbounds_unserialize(bounds) {
    return new google.maps.LatLngBounds(gmaps_latlng_unserialize(bounds.sw), gmaps_latlng_unserialize(bounds.ne));
}

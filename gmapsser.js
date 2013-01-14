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


function gmaps_result_ser(result) {
    return {
        address_components: result.address_components,
        formatted_address: result.formatted_address,
        geometry: gmaps_geometry_ser(result.geometry),
        types: result.types
    }
}

function gmaps_geometry_ser(geometry) {
    var result = {
        location_type: geometry.location_type
    }
    
    if (typeof(geometry.location) != 'undefined') {
        result.location = gmaps_latlng_ser(geometry.location);
    }
    
    if (typeof(geometry.bounds) != 'undefined') {
        result.bounds = gmaps_latlngbounds_ser(geometry.bounds);
    }
    
    if (typeof(geometry.viewport) != 'undefined') {
        result.viewport = gmaps_latlngbounds_ser(geometry.viewport);
    }
    
    return result;
}

function gmaps_latlng_ser(latlng) {
    return {
        lat: latlng.lat(),
        lng: latlng.lng()
    }
}

function gmaps_latlngbounds_ser(bounds) {
    return {
        sw: gmaps_latlng_ser(bounds.getSouthWest()),
        ne: gmaps_latlng_ser(bounds.getNorthEast())
    }
}

function gmaps_result_deser(result) {
    return {
        address_components: result.address_components,
        formatted_address: result.formatted_address,
        geometry: gmaps_geometry_deser(result.geometry),
        types: result.types
    }
}

function gmaps_geometry_deser(geometry) {
    var result = {
        location_type: geometry.location_type,
    }
    
    if (typeof(geometry.location) != 'undefined') {
        result.location = gmaps_latlng_deser(geometry.location);
    }
    
    if (typeof(geometry.bounds) != 'undefined') {
        result.bounds = gmaps_latlngbounds_deser(geometry.bounds);
    }
    
    if (typeof(geometry.viewport) != 'undefined') {
        result.viewport = gmaps_latlngbounds_deser(geometry.viewport);
    }
    
    return result;
}

function gmaps_latlng_deser(latlng) {
    return new google.maps.LatLng(latlng.lat, latlng.lng);
}

function gmaps_latlngbounds_deser(bounds) {
    return new google.maps.LatLngBounds(gmaps_latlng_deser(bounds.sw), gmaps_latlng_deser(bounds.ne));
}

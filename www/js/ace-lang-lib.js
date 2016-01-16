/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

/**
 * Source: https://github.com/ajaxorg/ace/blob/master/lib/ace/lib/lang.js
 */

var trimBeginRegexp = /^\s\s*/;
var trimEndRegexp = /\s\s*$/;

var aceLangLib = {
    last : function (a) {
        return a[a.length - 1];
    },

    stringReverse : function (string) {
        return string.split("").reverse().join("");
    },

    stringRepeat : function (string, count) {
        var result = '';
        while (count > 0) {
            if (count & 1)
                result += string;

            if (count >>= 1)
                string += string;
        }
        return result;
    },

    stringTrimLeft : function (string) {
        return string.replace(trimBeginRegexp, '');
    },

    stringTrimRight : function (string) {
        return string.replace(trimEndRegexp, '');
    },

    copyObject : function (obj) {
        var copy = {};
        for (var key in obj) {
            copy[key] = obj[key];
        }
        return copy;
    },

    copyArray : function (array) {
        var copy = [];
        for (var i = 0, l = array.length; i < l; i++) {
            if (array[i] && typeof array[i] == "object")
                copy[i] = this.copyObject(array[i]);
            else
                copy[i] = array[i];
        }
        return copy;
    },

    deepCopy : function deepCopy(obj) {
        if (typeof obj !== "object" || !obj)
            return obj;
        var copy;
        if (Array.isArray(obj)) {
            copy = [];
            for (var key = 0; key < obj.length; key++) {
                copy[key] = deepCopy(obj[key]);
            }
            return copy;
        }
        var cons = obj.constructor;
        if (cons === RegExp)
            return obj;

        copy = cons();
        for (var key in obj) {
            copy[key] = deepCopy(obj[key]);
        }
        return copy;
    },

    arrayToMap : function (arr) {
        var map = {};
        for (var i = 0; i < arr.length; i++) {
            map[arr[i]] = 1;
        }
        return map;

    },

    createMap : function (props) {
        var map = Object.create(null);
        for (var i in props) {
            map[i] = props[i];
        }
        return map;
    },

    /*
     * splice out of 'array' anything that === 'value'
     */
    arrayRemove : function (array, value) {
        for (var i = 0; i <= array.length; i++) {
            if (value === array[i]) {
                array.splice(i, 1);
            }
        }
    },

    escapeRegExp : function (str) {
        return str.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
    },

    escapeHTML : function (str) {
        return str.replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;");
    },

    getMatchOffsets : function (string, regExp) {
        var matches = [];

        string.replace(regExp, function (str) {
            matches.push({
                offset: arguments[arguments.length - 2],
                length: str.length
            });
        });

        return matches;
    }
    
};
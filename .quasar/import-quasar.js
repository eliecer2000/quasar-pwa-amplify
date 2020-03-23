/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/

import lang from 'quasar/lang/es'

import iconSet from 'quasar/icon-set/material-icons'


import Vue from 'vue'

import {Quasar,GoBack,ClosePopup,Dialog,Loading} from 'quasar'


Vue.use(Quasar, { config: {"brand":{"primary":"#002642","secondary":"#840032","accent":"#e59500","dark":"#02040f","positive":"#098526","negative":"#b80419","info":"#1c889e","warning":"#d17a47"}},lang: lang,iconSet: iconSet,directives: {GoBack,ClosePopup},plugins: {Dialog,Loading} })

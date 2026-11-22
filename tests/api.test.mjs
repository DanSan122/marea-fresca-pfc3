import test from 'node:test';import assert from 'node:assert/strict';import {arrivals,filterArrivals,summarize} from '../api/data.js';
test('seis embarcaciones de demostración',()=>assert.equal(arrivals.length,6));
test('búsqueda por embarcación',()=>assert.equal(filterArrivals('mar azul').length,1));
test('búsqueda insensible a mayúsculas',()=>assert.equal(filterArrivals('BONITO')[0].species,'Bonito'));
test('volumen total esperado',()=>assert.equal(summarize().kg,850));
test('no hay precios negativos',()=>assert.ok(arrivals.every(a=>a.price>0&&a.kg>0)));

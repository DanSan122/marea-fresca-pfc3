import test from 'node:test';import assert from 'node:assert/strict';import {arrivals,filterArrivals,summarize,fromSupabase} from '../api/data.js';
test('seis embarcaciones de demostración',()=>assert.equal(arrivals.length,6));
test('búsqueda por embarcación',()=>assert.equal(filterArrivals('mar azul').length,1));
test('búsqueda insensible a mayúsculas',()=>assert.equal(filterArrivals('BONITO')[0].species,'Bonito'));
test('volumen total esperado',()=>assert.equal(summarize().kg,850));
test('no hay precios negativos',()=>assert.ok(arrivals.every(a=>a.price>0&&a.kg>0)));

test('Supabase transforma un arribo válido sin filtrar datos internos',()=>{
  const result=fromSupabase([{id:'abc',boat_name:'Mar Peruano',fisher_name:'Pescador demo',arrival_time:'2026-11-22T14:30:00Z',arrival_status:'en_ruta',species_name:'Bonito',category:'pescado',quantity_kg:'12.50',price_pen_per_kg:'8.00',owner_id:'PRIVADO'}]);
  assert.equal(result.length,1);
  assert.equal(result[0].boat,'Mar Peruano');
  assert.equal(result[0].eta,'09:30');
  assert.equal(result[0].status,'En ruta');
  assert.equal(result[0].kg,12.5);
  assert.equal(result[0].price,8);
  assert.equal(Object.hasOwn(result[0],'owner_id'),false);
});

import {arrivals, filterArrivals, fromSupabase, summarize} from './data.js';

export default async function handler(req,res) {
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='GET') {
    res.setHeader('Allow','GET');
    return res.status(405).json({error:'Método no permitido'});
  }
  const search=String(req.query?.search??'').trim().slice(0,100);
  const url=process.env.SUPABASE_URL;
  const key=process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    return res.status(200).json({data:filterArrivals(search),demo:true,source:'fixtures',notice:'Supabase no configurado; datos de demostración'});
  }
  try {
    // Solo consulta pública RLS; la clave service_role nunca se utiliza.
    const endpoint=new URL('/rest/v1/catch_listings',url);
    endpoint.searchParams.set('select','id,boat_name,fisher_name,arrival_time,arrival_status,species_name,category,quantity_kg,price_pen_per_kg');
    endpoint.searchParams.set('available','eq.true');
    endpoint.searchParams.set('order','arrival_time.desc');
    endpoint.searchParams.set('limit','100');
    const response=await fetch(endpoint,{headers:{apikey:key,Accept:'application/json'},signal:AbortSignal.timeout(8000)});
    if(!response.ok) throw new Error('Supabase HTTP '+response.status);
    const data=await response.json();
    if(!Array.isArray(data)) throw new Error('Formato de API no válido');
    const items=fromSupabase(data).filter(x=>(x.boat+' '+x.fisher+' '+x.species).toLocaleLowerCase('es').includes(search.toLocaleLowerCase('es')));
    return res.status(200).json({data:items,demo:false,source:'supabase',summary:summarize(items)});
  }catch(error) {
    console.error('No se pudo obtener el catálogo de Supabase:',error.message);
    return res.status(503).json({error:'Catálogo temporalmente no disponible',demo:false,source:'supabase'});
  }
}

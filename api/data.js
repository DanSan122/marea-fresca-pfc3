export const arrivals = [{id:1,boat:"Don Manuel",fisher:"Miguel Rojas",eta:"06:40",status:"Arribó",species:"Bonito",category:"Pescado",kg:240,price:8},{id:2,boat:"Virgen del Carmen",fisher:"Pedro Salas",eta:"08:30",status:"En ruta",species:"Jurel",category:"Pescado",kg:180,price:9.5},{id:3,boat:"Mar Azul II",fisher:"Rosa Medina",eta:"09:15",status:"En ruta",species:"Caballa",category:"Pescado",kg:145,price:7},{id:4,boat:"Santa María",fisher:"Luis Aguirre",eta:"11:10",status:"Programada",species:"Corvina",category:"Pescado",kg:80,price:25},{id:5,boat:"Esperanza del Sur",fisher:"Carlos Huamán",eta:"12:30",status:"Programada",species:"Calamar",category:"Mariscos",kg:95,price:18},{id:6,boat:"San Pedro",fisher:"Jorge Vera",eta:"07:20",status:"Arribó",species:"Pejerrey",category:"Pescado",kg:110,price:13}];
export function filterArrivals(query=''){return arrivals.filter(x=>(x.boat+' '+x.fisher+' '+x.species).toLocaleLowerCase('es').includes(String(query).toLocaleLowerCase('es')))}
export function summarize(items=arrivals){return {boats:items.length,species:new Set(items.map(x=>x.species)).size,kg:items.reduce((total,x)=>total+x.kg,0)}}

/** Convierte filas RLS a una representación pública, sin claves ni roles internos. */
export function fromSupabase(rows=[]) {
  return rows.map(row=>({
    id:row.id,
    boat:row.boat_name,
    fisher:row.fisher_name,
    eta:new Intl.DateTimeFormat('es-PE',{timeZone:'America/Lima',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(row.arrival_time)),
    status:({'programada':'Programada','en_ruta':'En ruta','arribo':'Arribó'})[row.arrival_status]??'Programada',
    species:row.species_name,
    category:row.category==='mariscos'?'Mariscos':'Pescado',
    kg:Number(row.quantity_kg),
    price:Number(row.price_pen_per_kg)
  }));
}

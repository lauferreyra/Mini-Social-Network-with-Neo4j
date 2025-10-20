import { withSession } from './db.js';
import { Persona } from './person.service.js';

/**
 * Recomendaciones por ciudad:
 * Sugiere personas que viven en la misma ciudad que "nombre"
 * pero que todavía no son sus amigos.
 */
export async function recByCity(nombre: string): Promise<Persona[]> {
  return withSession(async (s) => {
    const res = await s.run(
      `
      MATCH (p:Persona {nombre:$nombre})
      MATCH (candidato:Persona {ciudad:p.ciudad})
      WHERE candidato <> p AND NOT (p)-[:AMIGO_DE]-(candidato)
      RETURN candidato ORDER BY candidato.nombre
      `,
      { nombre }
    );
    return res.records.map((r) => r.get('candidato').properties as Persona);
  });
}

/**
 * Recomendaciones por hobby:
 * Busca personas con el mismo hobby que "nombre"
 * que todavía no son amigos suyos.
 */
export async function recByHobby(nombre: string): Promise<Persona[]> {
  return withSession(async (s) => {
    const res = await s.run(
      `
      MATCH (p:Persona {nombre:$nombre})
      MATCH (candidato:Persona {hobby:p.hobby})
      WHERE candidato <> p AND NOT (p)-[:AMIGO_DE]-(candidato)
      RETURN candidato ORDER BY candidato.nombre
      `,
      { nombre }
    );
    return res.records.map((r) => r.get('candidato').properties as Persona);
  });
}

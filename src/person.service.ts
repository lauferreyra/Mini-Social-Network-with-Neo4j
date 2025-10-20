import { withSession } from './db.js';

//Tipo que representa el nodo Persona
export interface Persona {
  nombre: string;
  ciudad: string;
  hobby: string;
}

/**
 * CREATE o UPDATE
 * MERGE crea la persona si no existe (basado en nombre),
 * y actualiza sus propiedades si ya existía.
 */
export async function addPerson(p: Persona): Promise<void> {
  return withSession(async (s) => {
    await s.run(
      `
      MERGE (p:Persona {nombre: $nombre})
      SET p.ciudad = $ciudad, p.hobby = $hobby
      RETURN p
      `,
      p
    );
    console.log(`Persona agregada/actualizada: ${p.nombre}`);
  });
}

/**
 * READ (todas las personas)
 * MATCH busca todos los nodos con la etiqueta Persona.
 */
export async function listPeople(): Promise<Persona[]> {
  return withSession(async (s) => {
    const res = await s.run(`MATCH (p:Persona) RETURN p ORDER BY p.nombre`);
    return res.records.map((r) => r.get('p').properties as Persona);
  });
}

/**
 * READ (una persona por nombre)
 * MATCH busca por propiedad y devuelve sus campos.
 */
export async function findPerson(nombre: string): Promise<Persona | null> {
  return withSession(async (s) => {
    const res = await s.run(`MATCH (p:Persona {nombre:$nombre}) RETURN p`, { nombre });
    return res.records[0]?.get('p').properties ?? null;
  });
}

/**
 * DELETE
 * DETACH DELETE borra el nodo y todas sus relaciones.
 */
export async function deletePerson(nombre: string): Promise<boolean> {
  return withSession(async (s) => {
    const res = await s.run(
      `MATCH (p:Persona {nombre:$nombre}) DETACH DELETE p RETURN count(p) AS c`,
      { nombre }
    );
    const count = res.records[0].get('c').toNumber?.() ?? res.records[0].get('c');
    return count > 0;
  });
}

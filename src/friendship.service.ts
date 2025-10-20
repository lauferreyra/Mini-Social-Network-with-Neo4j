import { withSession } from './db.js';
import { Persona } from './person.service.js';

/**
 * Crea una amistad bidireccional entre dos personas existentes.
 * Usa MERGE para evitar duplicados.
 */
export async function createFriendship(a: string, b: string): Promise<void> {
  if (a === b) throw new Error('No se puede ser amigo de uno mismo.');
  await withSession(async (s) => {
    await s.run(
      `
      MATCH (p1:Persona {nombre:$a}), (p2:Persona {nombre:$b})
      MERGE (p1)-[:AMIGO_DE]->(p2)
      MERGE (p2)-[:AMIGO_DE]->(p1)
      `,
      { a, b }
    );
  });
  console.log(`Amistad creada entre ${a} y ${b}`);
}

/**
 * Lista los amigos de una persona.
 * Busca nodos conectados mediante la relación AMIGO_DE (en cualquier dirección).
 */
export async function listFriends(nombre: string): Promise<Persona[]> {
  return withSession(async (s) => {
    const res = await s.run(
      `
      MATCH (:Persona {nombre:$n})-[:AMIGO_DE]-(amigo:Persona)
      RETURN amigo ORDER BY amigo.nombre
      `,
      { n: nombre }
    );
    return res.records.map((r) => r.get('amigo').properties as Persona);
  });
}

/**
 *Elimina la amistad (en ambas direcciones).
 */
export async function deleteFriendship(a: string, b: string): Promise<number> {
  return withSession(async (s) => {
    const res = await s.run(
      `
      MATCH (p1:Persona {nombre:$a})-[r:AMIGO_DE]-(p2:Persona {nombre:$b})
      DELETE r
      RETURN count(r) AS eliminadas
      `,
      { a, b }
    );
    const count = res.records[0].get('eliminadas').toNumber?.() ?? res.records[0].get('eliminadas');
    console.log(`Relaciones eliminadas entre ${a} y ${b}: ${count}`);
    return count;
  });
}

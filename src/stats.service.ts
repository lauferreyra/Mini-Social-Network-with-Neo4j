import { withSession } from './db.js';

/**
 * Devuelve el total de personas registradas en el grafo.
 */
export async function countPeople(): Promise<number> {
  return withSession(async (s) => {
    const res = await s.run(`MATCH (p:Persona) RETURN count(p) AS total`);
    return res.records[0].get('total').toNumber?.() ?? res.records[0].get('total');
  });
}

/**
 * Devuelve el total de relaciones de amistad.
 * Como las relaciones son bidireccionales, se dividen por 2.
 */
export async function countFriendships(): Promise<number> {
  return withSession(async (s) => {
    const res = await s.run(`
      MATCH (:Persona)-[r:AMIGO_DE]-(:Persona)
      RETURN count(r)/2 AS total
    `);
    return res.records[0].get('total').toNumber?.() ?? res.records[0].get('total');
  });
}

/**
 * Devuelve todas las estadísticas juntas.
 */
export async function getStats() {
  const totalPeople = await countPeople();
  const totalFriendships = await countFriendships();

  return { totalPeople, totalFriendships };
}

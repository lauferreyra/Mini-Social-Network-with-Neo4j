import { withSession } from './db.js';

/**
 * Crea constraints e índices iniciales en la base de datos.
 */
export async function addConstraints() {
  return withSession(async (s) => {

    await s.run(`
      CREATE CONSTRAINT persona_nombre_unique IF NOT EXISTS
      FOR (p:Persona)
      REQUIRE p.nombre IS UNIQUE
    `);

    console.log('Constraints agregadas.');
  });
}

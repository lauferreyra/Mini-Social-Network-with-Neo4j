import { testConnection } from './db.js';
import { menu } from './menu.js';
import { addConstraints } from './constraints.js';

async function main() {
  try {
    await testConnection();
    await addConstraints();
    await menu(); //Inicia el menú interactivo
  } catch (err) {
    console.error('Error al iniciar:', err);
  }
}

main();

import { testConnection } from './db.js';
import { menu } from './menu.js';

async function main() {
  try {
    await testConnection();
    await menu(); //Inicia el menú interactivo
  } catch (err) {
    console.error('Error al iniciar:', err);
  }
}

main();

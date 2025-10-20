import { driver, testConnection } from './db.js';
import { addPerson, listPeople, findPerson, deletePerson } from './person.service.js';

async function main() {
  try {
    await testConnection();

    //Agregar personas
    await addPerson({ nombre: 'Ana', ciudad: 'Córdoba', hobby: 'música' });
    await addPerson({ nombre: 'Juan', ciudad: 'Córdoba', hobby: 'fútbol' });
    await addPerson({ nombre: 'Lucía', ciudad: 'Rosario', hobby: 'música' });

    //Listar todas
    const all = await listPeople();
    console.log('Personas:', all);

    //Buscar una
    const ana = await findPerson('Ana');
    console.log('Encontrada:', ana);

    //Borrar una
    const deleted = await deletePerson('Lucía');
    console.log(deleted ? 'Lucía eliminada' : 'No se encontró Lucía');
  } catch (e) {
    console.error('Error general:', e);
  } finally {
    await driver.close();
  }
}

main();

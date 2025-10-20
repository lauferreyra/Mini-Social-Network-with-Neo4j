import * as readlineSync from 'readline-sync';
import { driver } from './db.js';
import { addPerson, listPeople, findPerson, deletePerson } from './person.service.js';
import { createFriendship, listFriends, deleteFriendship } from './friendship.service.js';
import { recByCity, recByHobby } from './recommendation.service.js';
import { getStats } from './stats.service.js';

/**
 * Muestra el menú principal en la consola
 */
export async function menu() {
  let exit = false;

  console.log('\nMini Social Network With Neo4j');

  while (!exit) {
    console.log(`
        1. Agregar persona
        2. Listar personas
        3. Buscar persona
        4. Crear amistad
        5. Ver amigos de una persona
        6. Eliminar amistad
        7. Recomendaciones por ciudad
        8. Recomendaciones por hobby
        9. Estadísticas
        0. Salir
    `);

    const option = readlineSync.question('Seleccioná una opción: ');

    try {
      switch (option) {
        case '1': {
          const nombre = readlineSync.question('Nombre: ');
          const ciudad = readlineSync.question('Ciudad: ');
          const hobby = readlineSync.question('Hobby: ');
          await addPerson({ nombre, ciudad, hobby });
          break;
        }

        case '2': {
          const people = await listPeople();
          console.table(people);
          break;
        }

        case '3': {
          const nombre = readlineSync.question('Nombre a buscar: ');
          const person = await findPerson(nombre);
          if (person) console.table(person);
          else console.log('Persona no encontrada.');
          break;
        }

        case '4': {
          const a = readlineSync.question('Nombre 1: ');
          const b = readlineSync.question('Nombre 2: ');
          await createFriendship(a, b);
          break;
        }

        case '5': {
          const nombre = readlineSync.question('Ver amigos de: ');
          const friends = await listFriends(nombre);
          console.table(friends);
          break;
        }

        case '6': {
          const a = readlineSync.question('Nombre 1: ');
          const b = readlineSync.question('Nombre 2: ');
          await deleteFriendship(a, b);
          break;
        }

        case '7': {
          const nombre = readlineSync.question('Nombre: ');
          const recs = await recByCity(nombre);
          console.log('\nRecomendaciones por ciudad:', recs.map(r => r.nombre));
          break;
        }

        case '8': {
          const nombre = readlineSync.question('Nombre: ');
          const recs = await recByHobby(nombre);
          console.log('\nRecomendaciones por hobby:', recs.map(r => r.nombre));
          break;
        }

        case '9': {
          const stats = await getStats();
          console.table(stats);
          break;
        }

        case '0':
          exit = true;
          break;

        default:
          console.log('Opción inválida. Intente nuevamente.');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }
  await driver.close();
}

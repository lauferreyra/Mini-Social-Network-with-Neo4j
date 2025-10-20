import { driver, testConnection } from './db.js';
import { addPerson, listPeople, findPerson, deletePerson } from './person.service.js';
import { createFriendship, listFriends, deleteFriendship } from './friendship.service.js';
import { recByCity, recByHobby } from './recommendation.service.js';

async function main() {
  try {
    await testConnection();

    //Agregar personas
    await addPerson({ nombre: 'Ana', ciudad: 'Córdoba', hobby: 'música' });
    await addPerson({ nombre: 'Juan', ciudad: 'Córdoba', hobby: 'fútbol' });
    await addPerson({ nombre: 'Lucía', ciudad: 'Rosario', hobby: 'música' });

    //Listar todas las personas registradas
    const all = await listPeople();
    console.log('Personas:', all);

    //Crear amistades
    await createFriendship('Ana', 'Juan');
    await createFriendship('Ana', 'Lucía');
    await createFriendship('Juan', 'Pedro');

    //Recomendaciones por ciudad
    const cityRecs = await recByCity('Ana');
    console.log('\nRecomendaciones por ciudad (para Ana):', cityRecs.map(p => p.nombre));

    //Recomendaciones por hobby
    const hobbyRecs = await recByHobby('Ana');
    console.log('\nRecomendaciones por hobby (para Ana):', hobbyRecs.map(p => p.nombre));


    //Ver amigos de Ana
    const amigosAna = await listFriends('Ana');
    console.log('Amigos de Ana:', amigosAna.map(a => a.nombre));

    //Eliminar una amistad
    await deleteFriendship('Ana', 'Lucía');

    //Ver amigos de Ana nuevamente
    const nuevosAmigos = await listFriends('Ana');
    console.log('Amigos de Ana (actualizado):', nuevosAmigos.map(a => a.nombre));

    //Buscar una persona
    const ana = await findPerson('Ana');
    console.log('Encontrada:', ana);

    //Borrar una persona
    const deleted = await deletePerson('Lucía');
    console.log(deleted ? 'Lucía eliminada' : 'No se encontró Lucía');
  } catch (e) {
    console.error('Error general:', e);
  } finally {
    await driver.close();
  }
}

main();

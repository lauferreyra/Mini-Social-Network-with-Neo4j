import 'dotenv/config';
import neo4j, { Driver, Session } from 'neo4j-driver';

//Cargamos variables de entorno para la conexión
const URI = process.env.NEO4J_URI || 'bolt://localhost:7687';
const USER = process.env.NEO4J_USER || 'neo4j';
const PASSWORD = process.env.NEO4J_PASSWORD || 'password123';

//Creamos el driver (pool de conexiones a Neo4j)
export const driver: Driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));

//Helper para manejar sesiones de forma segura
export async function withSession<T>(work: (s: Session) => Promise<T>): Promise<T> {
  const session = driver.session();
  try {
    return await work(session);
  } finally {
    await session.close();
  }
}

//Test de conexión
export async function testConnection() {
  console.log('Probando conexión a Neo4j...');
  await driver.getServerInfo();
  console.log(`Conectado a Neo4j`);
}

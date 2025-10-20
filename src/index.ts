import 'dotenv/config';
import neo4j, { Driver } from 'neo4j-driver';

const URI = process.env.NEO4J_URI || 'bolt://localhost:7687';
const USER = process.env.NEO4J_USER || 'neo4j';
const PASSWORD = process.env.NEO4J_PASSWORD || 'password123';

const driver: Driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));

async function connection() {
  try {
    console.log('Conectando a Neo4j');
    await driver.getServerInfo();
    console.log('Conexión exitosa con Neo4j');

  } catch (error) {
    console.error('Error al conectar con Neo4j:', error);
  } finally {
    await driver.close();
    console.log('Conexión cerrada.');
  }
}

connection();

# Mini-Social-Network-with-Neo4j
Este proyecto es una aplicación de consola escrita en TypeScript que se conecta a Neo4j, una base de datos de grafos.  
El objetivo es simular una red social donde las personas y sus relaciones se representen mediante nodos y aristas.

## Instalación
Cloná el repositorio:
```bash
git clone https://github.com/lauferreyra/Mini-Social-Network-with-Neo4j.git
cd Mini-Social-Network-with-Neo4j 
 ```  

## Levantar Neo4j
```bash
podman run --name neo4j-social -d -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=neo4j/password123 neo4j:5
```

## Configurar
Crea un archivo `.env` en la raíz:
```
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password123
```

## Instalar y ejecutar
```bash
npm install
npm run start
```
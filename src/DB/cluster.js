import mariadb from 'mariadb';

const cluster = mariadb.createPoolCluster();

cluster.add("master", { host: process.env.HOST, database: process.env.DATABASE, user: process.env.USER, password: process.env.PASS, connectionLimit: process.env.LIMITCON });
cluster.add("slave1", { host: process.env.HOST, database: process.env.DATABASE, user: process.env.USER, password: process.env.PASS, connectionLimit: process.env.LIMITCON });
cluster.add("slave2", { host: process.env.HOST, database: process.env.DATABASE, user: process.env.USER, password: process.env.PASS, connectionLimit: process.env.LIMITCON });

module.exports = cluster;
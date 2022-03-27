import mariadb from 'mariadb';
import config from './../config';

const cluster = mariadb.createPoolCluster();

cluster.add("master", { host: config.HOST, port: 3307, database: config.DATABASE, user: config.USER, password: config.PASS, connectionLimit: 5 });
cluster.add("slave1", { host: config.HOST, port: 3307, database: config.DATABASE, user: config.USER, password: config.PASS, connectionLimit: 5 });
cluster.add("slave2", { host: config.HOST, port: 3307, database: config.DATABASE, user: config.USER, password: config.PASS, connectionLimit: 5 });

module.exports = cluster;
For local development it's convenient to have a DB in a docker container. For example: 

```bash
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql:5
```

**NOTE**: use mysql version below 8, 'cause the Node.js connection module doesn't have the latest
authentication changes implemented.

After MySQL is up, connect to it and run the following query:
```sql
CREATE DATABASE `local-walkin`;
```

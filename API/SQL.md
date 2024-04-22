# Comandes Microsoft SQL Server per Linux 
## Executar client SQL Server

```bash
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Passw0rd!"

## Obtenir les taules de la base de dades:

```sql
select * from MusicaBD.INFORMATION_SCHEMA.TABLES;
go

## Obtenir totes les bases de dades del sistema

```sql
select * from sys.databases;
go

## Selecció de totes les files de la taula

```sql
use MusicaBD;
select * from PlayerLists;
go

## Veure totes les migracions

```sql
use MusicaBD;
select * from __EFMigrationsHistory
go

## Describe table

```sql
use MusicaBD;
:setvar SQLCMDMAXVARTYPEWIDTH 30
:setvar SQLCMDMAXFIXEDTYPEWIDTH 30
exec sp_columns Genres
go

## Describe table - estructura columnes FK i PK

```sql
use MusicaBD;
:setvar SQLCMDMAXVARTYPEWIDTH 30
:setvar SQLCMDMAXFIXEDTYPEWIDTH 30
select TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME from information_schema.key_column_usage where constraint_name like 'FK_%'
go

## Canviar nom base de dades
```sql
alter database [DATABASE] modify name=GamingWithData
go
```

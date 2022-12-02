
cat tables.sql > complete.sql
cat insert.sql >> complete.sql

echo "insertando espere..."
mysql -u root -pLinux123... < complete.sql

package config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import javax.sql.DataSource;
import java.sql.Connection;
// import java.sql.Statement;
import java.util.Properties;

public class DB {
    private static Connection connection = null;

    public static Connection getConnection () throws Exception {
        if (connection == null) {
            // HikariConfig config = new HikariConfig("./db.properties");
            // HikariDataSource dataSource = new HikariDataSource(config);

            Properties props = new Properties();
            props.setProperty("dataSourceClassName", "org.postgresql.ds.PGSimpleDataSource");
            props.setProperty("dataSource.user", "postgres");
            props.setProperty("dataSource.password", "123123");
            props.setProperty("dataSource.databaseName", "fruits_dev");
            props.setProperty("dataSource.serverName", "db");
            // props.put("dataSource.logWriter", new PrintWriter(System.out));
            
            HikariConfig config = new HikariConfig(props);
            HikariDataSource ds = new HikariDataSource(config);
            connection = ds.getConnection();
        }

        return connection;
    }
}
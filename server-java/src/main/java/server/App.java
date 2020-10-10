/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package server;
import io.javalin.Javalin;
import service.Fruits;

public class App {
    public static void main(String[] args) {
        Javalin app = Javalin.create().start(3000);

        try {
            app.get("/api/v1/fruits", ctx -> Fruits.index(ctx));
            app.get("/api/v1/fruits/names", ctx -> Fruits.names(ctx));
            app.post("/api/v1/fruits", ctx -> Fruits.create(ctx));
            app.options("/api/v1/fruits", ctx -> Fruits.createOption(ctx));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

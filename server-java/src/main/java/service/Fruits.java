package service;
import java.sql.Connection;
import java.sql.ResultSet;
// import java.sql.Statement;
import java.sql.PreparedStatement;
import io.javalin.http.Context;
import config.DB;
import java.util.HashMap;
import org.json.JSONObject;
import org.json.JSONArray;
import java.util.HashMap;
import java.util.ArrayList;

public class Fruits {

    // fruit list
    public static void index (Context ctx) throws Exception {
        var names = ctx.queryParams("name");
        var fruits = new ArrayList<HashMap>();
        var query = "SELECT * FROM fruits";
        var hasName = names.size() > 0 && names.get(0) != "";

        if (hasName) { query = query + " WHERE name = ?"; }
        var ps = DB.getConnection().prepareStatement(query);
        if (hasName) { ps.setString(1, names.get(0)); }
        var resultSet = ps.executeQuery();

        while (resultSet.next()) {
            fruits.add(apply(resultSet, new String[]{"id", "name", "description"}));
        }

        ctx.header("Access-Control-Allow-Origin", "*");
        ctx.json(fruits);
    }

    // furit name list
    public static void names (Context ctx) throws Exception {
        var query = "SELECT DISTINCT name FROM fruits";
        var ps = DB.getConnection().prepareStatement(query);
        var resultSet = ps.executeQuery();
        var names = new ArrayList<String>();

        while (resultSet.next()) {
            names.add(resultSet.getString("name"));
        }

        ctx.header("Access-Control-Allow-Origin", "*");
        ctx.json(names);
    }

    // persist fruits
    public static void create (Context ctx) throws Exception {
        var payload = new JSONArray(ctx.body());
        var query = "INSERT INTO fruits (name, description) VALUES ";
        ArrayList<String> placeHolders = new ArrayList();
        var len = payload.length();

        for (int i=0; i<len; i++) {
            var jsonObject = (JSONObject) payload.get(i);
            query = query + "(?, ?)";
            if (i != len-1) { query = query + ", "; }

            // TODO
            placeHolders.add(jsonObject.get("name").toString());
            placeHolders.add(jsonObject.get("description").toString());
        }

        var ps = DB.getConnection().prepareStatement(query);
        for (int i=0; i<placeHolders.size(); i++) {
            ps.setString(i+1, placeHolders.get(i));
        }
        var resultSet = ps.execute();
        System.out.println(resultSet);

        ctx.header("Access-Control-Allow-Origin", "*");
        ctx.result("ok");
    }

    public static void createOption (Context ctx) {
        ctx.header("Access-Control-Allow-Origin", "*");
        ctx.header("Access-Control-Allow-Headers", "*");
        ctx.header("Access-Control-Allow-Methods", "*");
        ctx.status(200);
    }

    private static HashMap apply (ResultSet resultSet, String[] columns) throws Exception {
        var hm = new HashMap();

        for (int i=0; i<columns.length; i++) {
            hm.put(columns[i], resultSet.getString(columns[i]));
        }

        return hm;
    }
}


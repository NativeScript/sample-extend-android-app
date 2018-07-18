package org.nativescript.currencyconversion;

import android.app.Application;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.tns.Runtime;

import org.json.JSONException;
import org.json.JSONObject;
import java.util.ArrayList;
import java.util.Iterator;

public class MainActivity extends AppCompatActivity {
    public Runtime nsRuntime;

    public ArrayList<String> currencies = new ArrayList<String>();
    private ArrayAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        final ListView listview = findViewById(R.id.currencyList);
        adapter = new ArrayAdapter(this, android.R.layout.simple_list_item_1, currencies);
        listview.setAdapter(adapter);
    }

    @Override
    protected void onStart() {
        super.onStart();
        RequestQueue queue = Volley.newRequestQueue(this);
        String url ="http://data.fixer.io/api/latest?access_key=5f26927cd017e78e6f7ae10d41af0169";
        JsonObjectRequest stringRequest = new JsonObjectRequest(Request.Method.GET, url, null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            Iterator<?> keys = response.getJSONObject("rates").keys();
                            while (keys.hasNext()) {
                                String key = (String) keys.next();
                                currencies.add(key + " -> " + response.getJSONObject("rates").getString(key));
                            }
                            adapter.notifyDataSetChanged();
                        } catch (JSONException error) {
                            Log.d("NativeScript", error.getMessage());
                        }

                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("NativeScript", error.getMessage());
            }
        });
        queue.add(stringRequest);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.action_stocks) {
            openNativeScriptActivity();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    public void openNativeScriptActivity() {
        if (nsRuntime == null) {
            Application currentApplication =  MainActivity.this.getApplication();
            nsRuntime = com.tns.RuntimeHelper.initRuntime(currentApplication);
            if (nsRuntime != null) {

                nsRuntime.run();
            } else {
                return;
            }
        }

        android.content.Intent intent = new android.content.Intent(MainActivity.this, MyCustomNativeScriptActivity.class);
        intent.setAction(android.content.Intent.ACTION_DEFAULT);
        startActivity(intent);
    }
}
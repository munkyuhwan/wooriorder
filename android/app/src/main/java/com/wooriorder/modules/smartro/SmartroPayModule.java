package com.wooriorder.modules.smartro;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.os.RemoteException;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import service.vcat.smartro.com.vcat.SmartroVCatCallback;
import service.vcat.smartro.com.vcat.SmartroVCatInterface;

public class SmartroPayModule extends ReactContextBaseJavaModule {
    private static final String SERVER_ACTION = "smartro.vcat.action";
    private static final String SERVER_PACKAGE = "service.vcat.smartro.com.vcat";

    private Context mContext = null;
    SmartroPayModule(ReactApplicationContext context) {
        super(context);
        mContext = context;
    }
    // smartro Interface

    @NonNull
    @Override
    public String getName() {
        return "SmartroPay";
    }
    SmartroVCatInterface mSmartroVCatInterface = null; //This’s Interface-Constructor.
    ServiceConnection mServiceConnection = null;
    @ReactMethod
    public void prepareSmartroPay (String jsonString, Callback errorCallback, Callback successCallback) {
        System.out.println("prepareSmartroPay module!!!: ");
        System.out.println("jsonString: "+jsonString);

        mServiceConnection = new ServiceConnection() {
            @Override
            public void onServiceConnected(ComponentName name, IBinder service) {
                //The V-CAT Service has been succeed to connect with user-application.
                //Your application can take a service via “mSmartroVCatInterface” constructor.
                System.out.println(("onServiceConnected onServiceConnected"));
                mSmartroVCatInterface = SmartroVCatInterface.Stub.asInterface(service);

                //String jsonString = "{\"service\":\"function\",\"external-manage\":\"get-signature\",\"service-result\":\"0800\",\"service-description\":\"서비스가 중단되었습니다.\"}";
                //String jsonString = "{\"service\":\"function\",\"device-manage\":\"get-info\"}";
                //String jsonString = "{\"service\":\"setting\",\"device\":\"dongle\",\"device-comm\":[\"com\",\"ftdi1\",\"115200\"],\"additional-device\":\"virtualpad\"}";
                //String jsonString = "\"device-manage\", \"get-info\"";

                Log.e("com.wooriorder", "jsonString: "+jsonString);
                try {
                    mSmartroVCatInterface.executeService(jsonString, new SmartroVCatCallback.Stub() {
                        @Override
                        public void onServiceEvent(String strEventJSON) throws RemoteException {
                            System.out.println("onServiceEvent: "+strEventJSON);
                            //successCallback.invoke(strEventJSON);
                        }

                        @Override
                        public void onServiceResult(String strResultJSON) throws RemoteException {
                            System.out.println("onServiceResult: "+strResultJSON);
                            successCallback.invoke(strResultJSON);
                            getCurrentActivity().unbindService(mServiceConnection);
                            mSmartroVCatInterface=null;
                        }
                    });

                } catch (RemoteException e) {
                    System.out.println("smartro execption============================================================");
                    errorCallback.invoke("error pay");
                    throw new RuntimeException(e);
                }
            }
            @Override
            public void onServiceDisconnected(ComponentName name) { //The V-CAT Service has been disconnected.
            }
        };

        //Intent intentTemp = new Intent(SERVER_ACTION);
        //intentTemp.setPackage(SERVER_PACKAGE);
        Intent intentTemp = new Intent("smartro.vcat.action");
        intentTemp.setPackage("service.vcat.smartro.com.vcat"); //Putting user-application package name.
        intentTemp.putExtra("package", getCurrentActivity().getPackageName());
        System.out.println("getPackageName: "+getCurrentActivity().getPackageName());



        if(getCurrentActivity().bindService(intentTemp, mServiceConnection, Context.BIND_AUTO_CREATE) == false)
        {
            Log.e("Smartro", "bindService Fail!!!");
        }else {
            Log.e("Smartro", "bindService success!!!");
        }


    }

    @ReactMethod
    public String returnResult () {
        System.out.println("prepareSmartroPay module returnResult!!!");
        return "what the...";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final HashMap<String, Object> constants  = new HashMap<>();

        return constants;
    }
}

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
    private SmartroVCatInterface mSmartroVCatInterface = null; //This’s Interface-Constructor.
    private ServiceConnection mServiceConnection = new ServiceConnection() { @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            //The V-CAT Service has been succeed to connect with user-application.
            //Your application can take a service via “mSmartroVCatInterface” constructor.
            System.out.println(("onServiceConnected onServiceConnected"));
            mSmartroVCatInterface = SmartroVCatInterface.Stub.asInterface(service);

            String jsonString = "{\"service\":\"function\",\"external-manage\":\"get-signature\",\"service-result\":\"0800\",\"service-description\":\"서비스가 중단되었습니다.\"}";
            Log.e("com.wooriorder", "jsonString: "+jsonString);
            try {
                mSmartroVCatInterface.executeService(jsonString, new SmartroVCatCallback() {
                    @Override
                    public void onServiceEvent(String strEventJSON) throws RemoteException {
                        System.out.println("onServiceEvent=======================");
                    }

                    @Override
                    public void onServiceResult(String strResultJSON) throws RemoteException {
                        System.out.println("onServiceResult=======================");

                    }
                    @Override
                    public IBinder asBinder() {
                        System.out.println("asBinder=======================");
                        mContext.unbindService(mServiceConnection);
                        mSmartroVCatInterface=null;
                        return null;
                    }
                });
            } catch (RemoteException e) {
                System.out.println("smartro execption============================================================");
                throw new RuntimeException(e);
            }
        }
        @Override
        public void onServiceDisconnected(ComponentName name) { //The V-CAT Service has been disconnected.
        }
    };
    @NonNull
    @Override
    public String getName() {
        return "SmartroPay";
    }

    @ReactMethod
    public void prepareSmartroPay () {
        System.out.println("prepareSmartroPay module!!!");
        Intent intentTemp = new Intent(SERVER_ACTION);
        intentTemp.setPackage(SERVER_PACKAGE);

        if(mContext.bindService(intentTemp, mServiceConnection, Context.BIND_AUTO_CREATE) == false)
        {
            Log.e("Smartro", "bindService Fail!!!");
        }



        /*
        Intent intentTemp = new Intent("smartro.vcat.action");
        intentTemp.setPackage("service.vcat.smartro.com.vcat");
        intentTemp.putExtra("package", mContext.getPackageName());
        mContext.bindService(intentTemp, mServiceConnection, Context.BIND_AUTO_CREATE);
        */
        //{"service":"function","external-manage":"get-signature","service-result":"0300","service-description":"장치 또는 서버 응답 시간이 초과되었습니다."}

/*
        Intent intentTemp = new Intent("smartro.vcat.action");
        intentTemp.setPackage("service.vcat.smartro.com.vcat"); //Putting user-application package name. i
        intentTemp.putExtra("package", mContext.getPackageName());
//To bind Interface-Constructor at Service

        mContext.bindService(intentTemp, mServiceConnection, Context.BIND_AUTO_CREATE);

        String strRequestJSON; //This's String for requesting a Service to V-CAT application.
        try{
            strRequestJSON = "";
             //Inputting request to JSON “{ ... }”
            String strRequest = null;
            mSmartroVCatInterface.executeService(strRequest, new SmartroVCatCallback.Stub() {
                @Override
                public void onServiceEvent(String strEventJSON) {
                    System.out.println("onServiceEvent================");
                    //This's Method for getting an event from V-CAT service.
                }
                @Override
                public void onServiceResult(String strResultJSON) {
                    System.out.println("onServiceResult================");
                    //This's Method for getting the result from V-CAT service.
                }
            });

        }catch (Exception e) {
            e.printStackTrace();
           }


 */


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

package com.wooriorder.modules.screenController;

import android.app.Activity;
import android.content.Context;
import android.view.WindowManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class KeepAwakeModule extends ReactContextBaseJavaModule {
    private Context mContext = null;

    KeepAwakeModule(ReactApplicationContext context) {
        super(context);
        mContext = context;
    }
    @NonNull
    @Override
    public String getName() {
        return "ScreenController";
    }

    @ReactMethod
    public void keepAwake() {
        System.out.println("keep awake!!!!!!!");
        System.out.println("activity: "+getCurrentActivity());
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                getCurrentActivity().getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON); // 화면 켜짐 유지
            }
        });
       //getCurrentActivity().getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON); // 화면 켜짐 유지
    }

    @ReactMethod
    public void setBrightness(Float brightness) {
        WindowManager.LayoutParams params = getCurrentActivity().getWindow().getAttributes();
        params.screenBrightness= brightness;
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                getCurrentActivity().getWindow().setAttributes(params);
            }
        });
    }
}

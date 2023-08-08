package com.wooriorder.modules.smartro;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class SmartroPayModule extends ReactContextBaseJavaModule {

    SmartroPayModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "SmartroPay";
    }

    @ReactMethod
    public void prepareSmartroPay () {
        System.out.println("prepareSmartroPay module!!!");
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

package com.wooriorder.modules.smartro;

/* --------------------------------------------------------------------
 * V-CAT 서비스 호출 예제 소스
 * --------------------------------------------------------------------
 *
 *  본 소스는 개발을 위한 참고 용도로 사용하시길 바라며,
 *  당 소스를 변경없이 개발 중이신 타겟 응용프로그램에 그대로 적용할 경우,
 *  예상과 다른 동작이 발생할 수 있음을 알려 드립니다.
 *
 */

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.ComponentName;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.ServiceConnection;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Point;
import android.graphics.drawable.BitmapDrawable;
import android.net.Uri;
import android.os.Bundle;
import android.os.IBinder;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.wooriorder.R;

import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

import service.vcat.smartro.com.vcat.SmartroVCatInterface;

public class ServiceProcessingActivity extends AppCompatActivity
{
    private static final String TAG = "V-CAT_EXAMPLE_TAG";

    private static final int kVCATStartReqCode = 1100;

    /* 주의(!) 아래 문자열을 변경하지 마세요!
     * 아래 두 항목의 문자열을 변경하면, 서비스 호출에 문제가 발생됩니다.
     */
    private static final String SERVER_PACKAGE = "service.vcat.smartro.com.vcat";
    private static final String SERVER_ACTION = "smartro.vcat.action";

    private SmartroVCatInterface mSmartroVCatInterface = null;          //서비스 인스턴스

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        if(mSmartroVCatInterface == null)
        {
//            executeVCAT();
            bindVCATService();
        }
    }

    @Override
    protected void onDestroy()
    {
        unbindService(mServiceConnectionExample);
        mSmartroVCatInterface = null;
        super.onDestroy();
    }

    void executeVCAT()
    {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.addCategory(Intent.CATEGORY_BROWSABLE);
        intent.addCategory(Intent.CATEGORY_DEFAULT);
        intent.setData(Uri.parse("smartroapp://vcatscheme?manage=awake"));

        startActivityForResult(intent, kVCATStartReqCode);
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {

        Log.i(TAG, "requestCode : " + requestCode + ", resultCode : " + requestCode + ", data : " + data);

        if(requestCode == kVCATStartReqCode)
        {
            bindVCATService();
        }

        super.onActivityResult(requestCode, resultCode, data);
    }

    void bindVCATService()
    {
        /** 호출 관련 인텐트 값 입력
         */
        Intent intentTemp = new Intent(SERVER_ACTION);
        intentTemp.setPackage(SERVER_PACKAGE);
        /** 서비스 바인드 처리
         */
        if(bindService(intentTemp, mServiceConnectionExample, Context.BIND_AUTO_CREATE) == false)
        {
            Log.e(TAG, "bindService Fail!!!");
        }
    }

    /** 서비스 바인드-언바인드 관련 인라인 메써드
     */
    private final ServiceConnection mServiceConnectionExample = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            mSmartroVCatInterface = SmartroVCatInterface.Stub.asInterface(service);

            try {
                connectedWithService();
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        }

        @Override
        public void onServiceDisconnected(ComponentName name)
        {
            disconnectedWithService();
        }
    };

    protected void connectedWithService()
    {
        showToast("서비스가 연결되었습니다.");
        writeLog("서비스가 연결되었습니다.");
    }

    protected void disconnectedWithService()
    {
        showToast("서비스 연결이 해제 되었습니다.");
        mSmartroVCatInterface = null;
    }

    protected void writeLog(String strFormat, Object ...argValue)
    {
        Log.i(TAG, String.format(strFormat, argValue));
    }

    protected void writeLog(String strText)
    {
        Log.i(TAG, strText);
    }

    protected SmartroVCatInterface getVCatInterface()
    {
        return mSmartroVCatInterface;
    }

    /**
     * 메시지 다이얼로그 표시 예제 함수
     *
     * @param strCaption - 표시 타이틀
     * @param strText - 표시 내용
     */
    private String mStrAlertCaption = null;
    private String mStrAlertText = null;
    protected void showAlertDialog(String strCaption, String strText)
    {
        mStrAlertCaption = strCaption;
        mStrAlertText = strText;

        runOnUiThread(new Runnable() {
            public void run() {
                try
                {
                    AlertDialog builderTemp = new AlertDialog.Builder(ServiceProcessingActivity.this).create();

                    builderTemp.setTitle(mStrAlertCaption);
                    builderTemp.setMessage(mStrAlertText);
                    builderTemp.setButton(AlertDialog.BUTTON_NEUTRAL, "확인",
                            new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog, int which) {
                                    dialog.dismiss();
                                }
                            });

                    builderTemp.show();
                }
                catch (Exception e)
                {
                    e.printStackTrace();
                }
            }
        });
    }

    /** 토스트 메시지 표시 함수
     *
     * @param strMessage - 표시 내용
     */
    private String mStrToastMessage = null;
    protected void showToast(String strMessage)
    {
        mStrToastMessage = strMessage;

        runOnUiThread(new Runnable() {
            public void run() {
                try
                {
                    Toast.makeText(ServiceProcessingActivity.this, mStrToastMessage, Toast.LENGTH_SHORT).show();
                }
                catch (Exception e)
                {
                    e.printStackTrace();
                }
            }
        });
    }

    /** 프로그래스 다이얼로그 표시 함수
     *
     * @param strCaption - 표시 내용
     */
    private String mStrProgressMessage = null;
    private ProgressDialog mProgressDialog = null;
    protected void showProgress(String strCaption)
    {
        mStrProgressMessage = strCaption;

        runOnUiThread(new Runnable() {
            public void run() {
                if (mProgressDialog != null) {
                    closeProgress();
                }

                try
                {
                    mProgressDialog = new ProgressDialog(ServiceProcessingActivity.this);
                    mProgressDialog.setMessage(mStrProgressMessage);
                    mProgressDialog.setButton(DialogInterface.BUTTON_NEGATIVE, "중단", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            try {
                                mSmartroVCatInterface.cancelService();
                            }
                            catch (Exception e) {
                                e.printStackTrace();
                            }
//                            dialog.dismiss();

                        }
                    });
                    mProgressDialog.show();
                }
                catch (Exception e)
                {
                    e.printStackTrace();
                }
            }
        });
    }

    protected void closeProgress()
    {
        if (mProgressDialog != null)
        {
            mProgressDialog.dismiss();
            mProgressDialog = null;
        }
    }

    /** 사인 표시 다이얼로그
     *
     */
    private AlertDialog mUiDialog = null;
    protected void showSignUiDialog()
    {
        runOnUiThread(new Runnable() {
            public void run() {
                if (mIsSignDialog)
                {
                    return;
                }

                final ImageView ivSign = new ImageView(ServiceProcessingActivity.this);

                ivSign.setImageResource(R.drawable.test_sign);

                mUiDialog = new AlertDialog.Builder(ServiceProcessingActivity.this).create();

                mUiDialog.setTitle("Custom UI 서명화면(이미지)");
                mUiDialog.setView(ivSign);
                mUiDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "이미지 전달",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int which) {
                                try {
                                    JSONObject jobjPath = new JSONObject();
                                    String strSignImagePath = ServiceProcessingActivity.this.getExternalFilesDir(null).getAbsolutePath() + "/test_sign.png";

                                    File fFile = new File(strSignImagePath);

                                    if (!fFile.exists())
                                    {
                                        fFile.createNewFile();
                                    }

                                    FileOutputStream fStream = new FileOutputStream(fFile);
                                    Bitmap bitmapTemp = ((BitmapDrawable)ivSign.getDrawable()).getBitmap();
                                    bitmapTemp.compress(Bitmap.CompressFormat.PNG, 100, fStream);

                                    fStream.flush();
                                    fStream.close();

                                    jobjPath.put("sign-path", strSignImagePath);
                                    mSmartroVCatInterface.postExtraData(jobjPath.toString());
                                }
                                catch (Exception e) {
                                    e.printStackTrace();
                                }

                                dialog.dismiss();
                                mIsSignDialog = false;
                            }
                        });

                mUiDialog.setButton(AlertDialog.BUTTON_NEGATIVE, "취소",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int which) {
                                try {
                                    mSmartroVCatInterface.cancelService();
                                }
                                catch (Exception e) {
                                    e.printStackTrace();
                                }

                                dialog.dismiss();
                            }
                        });

                mUiDialog.show();
            }
        });
    }

    /** 사인 표시 다이얼로그
     *
     */
    /** 사인 표시 관련 클래스 뷰
     *
     */
    private class DisplaySignature extends View
    {
        private final int WIDTH = 128;
        private Paint mPaint;
        private final List<Point> mLstPosition;
        private float mfScale;

        public DisplaySignature(Context context)
        {
            super(context);

            mPaint = new Paint();
            mPaint.setColor(Color.BLACK);

            mLstPosition = new ArrayList<>();
            setBackgroundColor(Color.GRAY);
        }

        public void putPosition(int iX, int iY)
        {
            Point pntData = new Point();

            pntData.x = iX;
            pntData.y = iY;
            synchronized (mLstPosition)
            {
                mLstPosition.add(pntData);
            }
        }

        @Override
        protected void onSizeChanged(int w, int h, int oldw, int oldh)
        {
            mfScale = w / WIDTH;
            mPaint.setStrokeWidth((mfScale * 1.5f));
            super.onSizeChanged(w, h, oldw, oldh);
        }

        @Override
        protected void onDraw(Canvas canvas)
        {
            synchronized (mLstPosition)
            {
                for (Point pntData : mLstPosition)
                {
                    canvas.drawPoint(pntData.x * mfScale, pntData.y * mfScale, mPaint);
                }
            }
            super.onDraw(canvas);
        }
    }

    private DisplaySignature mDispSign = null;
    private AlertDialog mSignDialog = null;
    private boolean mIsSignDialog = false;
    public void showSignDialog()
    {
        runOnUiThread(new Runnable()
        {
            public void run()
            {
                if (mIsSignDialog)
                {
                    return;
                }

                mDispSign = new DisplaySignature(ServiceProcessingActivity.this);
                mSignDialog = new AlertDialog.Builder(ServiceProcessingActivity.this).create();

                mSignDialog.setTitle("고객 서명 화면");
                mSignDialog.setView(mDispSign);
                mSignDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "중단",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int which) {
                                try {
                                    mSmartroVCatInterface.cancelService();
                                }
                                catch (Exception e) {
                                    e.printStackTrace();
                                }

                                dialog.dismiss();
                                mIsSignDialog = false;
                            }
                        });

                mSignDialog.show();

                DisplayMetrics displayMetrics = new DisplayMetrics();
                getWindowManager().getDefaultDisplay().getMetrics(displayMetrics);
                mSignDialog.getWindow().setLayout((int) (displayMetrics.widthPixels * 0.5f), (int) (displayMetrics.heightPixels * 0.5f));
                mIsSignDialog = true;
            }
        });
    }

    protected void drawSignPosition(int iX, int iY)
    {
        if (mIsSignDialog)
        {
            mDispSign.putPosition(iX, iY);

            runOnUiThread(new Runnable()
            {
                public void run()
                {
                    mDispSign.invalidate();
                }
            });
        }
    }

    protected void closeSignDialog()
    {
        if (mSignDialog != null)
        {
            mSignDialog.dismiss();
            mIsSignDialog = false;
        }
    }

    /**
     *
     * @param strTitle
     * @param lstArg
     * @param doListener
     */

    private String mstrTitle;
    private List<String> mlstPopupArg;
    private DialogInterface.OnClickListener mdoListener;
    private AlertDialog m_dlgSpinner = null;
    protected void showPopupSpinner(String strTitle, List<String> lstArg, DialogInterface.OnClickListener doListener)
    {
        if (lstArg == null)
        {
            return;
        }

        mstrTitle = strTitle;
        mlstPopupArg = lstArg;
        mdoListener = doListener;
        runOnUiThread(new Runnable()
        {
            @Override
            public void run()
            {
                AlertDialog.Builder abTemp = new AlertDialog.Builder(ServiceProcessingActivity.this);
                String[] saValue = new String[mlstPopupArg.size()];
                int iIndex = 0;

                for (String strItem : mlstPopupArg)
                {
                    saValue[iIndex++] = strItem;
                }

                ArrayAdapter<String> adapTemp = new ArrayAdapter<>(ServiceProcessingActivity.this, android.R.layout.simple_spinner_dropdown_item , mlstPopupArg);
                abTemp.setAdapter(adapTemp, mdoListener);

                m_dlgSpinner = abTemp.create();
                m_dlgSpinner.setTitle(mstrTitle);
                m_dlgSpinner.setCancelable(false);
                m_dlgSpinner.setCanceledOnTouchOutside(false);
                m_dlgSpinner.show();
            }
        });
    }

    protected void closePopupSpinner()
    {
        if (m_dlgSpinner != null)
        {
            m_dlgSpinner.dismiss();
        }
    }

    /** 스피너 입력 처리 함수
     *
     * @param resID - 리소스 ID
     * @param lstArg - 문자열 목록
     * @param onItemSelectListener - 리스너 처리
     */
    private int mSpinnerResID = 0;
    private List<String> mlstSpinnerArg = null;
    private AdapterView.OnItemSelectedListener mOnItemSelectListener = null;
    protected void setupSpinner(int resID, List<String> lstArg, AdapterView.OnItemSelectedListener onItemSelectListener)
    {
        mSpinnerResID = resID;
        mlstSpinnerArg = lstArg;
        mOnItemSelectListener = onItemSelectListener;

        runOnUiThread(new Runnable() {
            public void run()
            {
                ArrayAdapter<String> adapTemp = new ArrayAdapter<>(ServiceProcessingActivity.this, android.R.layout.simple_spinner_item, mlstSpinnerArg);

                adapTemp.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                ((Spinner)findViewById(mSpinnerResID)).setOnItemSelectedListener(mOnItemSelectListener);
                ((Spinner)findViewById(mSpinnerResID)).setAdapter(adapTemp);
                (findViewById(mSpinnerResID)).setTag(adapTemp);
            }
        });
    }

    /**
     *
     * @param strTitle
     * @param oclParam
     */
    private EditText mEdtText = null;
    protected void showTextInput(final String strTitle, DialogInterface.OnClickListener oclParam)
    {
        AlertDialog.Builder dlgIpPort = new AlertDialog.Builder(this);

        dlgIpPort.setTitle(strTitle);
        dlgIpPort.setMessage(strTitle);

        mEdtText = new EditText(this);

        mEdtText.setHint("입력하세요.");
        LinearLayout llTemp = new LinearLayout(this);
        llTemp.setOrientation(LinearLayout.VERTICAL);
        llTemp.setGravity(Gravity.CENTER);

        llTemp.addView(mEdtText);
        dlgIpPort.setView(llTemp);

        mEdtText.requestFocus();
        dlgIpPort.setPositiveButton("입력", oclParam);
        dlgIpPort.setNegativeButton("취소", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                mEdtIP = null;
                mEdtPort = null;
                dialog.dismiss();
            }
        });
        dlgIpPort.show();
    }

    protected String getInputtedText()
    {
        if (mEdtText != null)
        {
            return mEdtText.getText().toString();
        }

        return "";
    }

    /**
     * IP 와 포트번호를 입력받고, 가져오는 다이얼로그
     *
     * @param strTitle - 다이얼로그 타이틀
     * @param oclParam - 입력 후 이벤트 처리
     */
    private EditText mEdtIP = null;
    private EditText mEdtPort = null;
    protected void showIPPortSetup(String strTitle, DialogInterface.OnClickListener oclParam)
    {
        AlertDialog.Builder dlgIpPort = new AlertDialog.Builder(this);

        dlgIpPort.setTitle(strTitle);
        dlgIpPort.setMessage("IP와 포트 번호를 입력해 주세요.");

        mEdtIP = new EditText(this);
        mEdtPort = new EditText(this);

        mEdtIP.setHint("IP를 입력하세요.");
        mEdtPort.setHint("PORT 번호를 입력하세요.");
        LinearLayout llTemp = new LinearLayout(this);
        llTemp.setOrientation(LinearLayout.VERTICAL);
        llTemp.setGravity(Gravity.CENTER);

        llTemp.addView(mEdtIP);
        llTemp.addView(mEdtPort);
        dlgIpPort.setView(llTemp);

        dlgIpPort.setPositiveButton("입력", oclParam);
        dlgIpPort.setNegativeButton("취소", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                mEdtIP = null;
                mEdtPort = null;
                dialog.dismiss();
            }
        });

        dlgIpPort.show();
    }

    protected String getIPValue()
    {
        if (mEdtIP != null)
        {
            return mEdtIP.getText().toString();
        }

        return "";
    }

    protected String getPortValue()
    {
        if (mEdtPort != null)
        {
            return mEdtPort.getText().toString();
        }

        return "";
    }

    /**
     * Yes Or No를 선택하는 다이얼로그
     *
     * @param strTitle - 다이얼로그 타이틀
     * @param strText - 다이얼로그 표시 문자열
     * @param strYesCaption - YES 버튼의 문자열
     * @param oclYes - YES 버튼의 이벤트 처리
     * @param strNoCaption - NO 버튼의 문자열
     * @param oclNo - NO 버튼의 이벤트 처리
     */
    private String mstrYesOrNoTitle;
    private String mstrText;
    private String mstrYesCaption;
    private String mstrNoCaption;
    private DialogInterface.OnClickListener moclYes;
    private DialogInterface.OnClickListener moclNo;
    protected void showYesOrNoDialog(String strTitle, String strText,
                                     String strYesCaption, DialogInterface.OnClickListener oclYes,
                                     String strNoCaption, DialogInterface.OnClickListener oclNo)
    {
        mstrYesOrNoTitle = strTitle;
        mstrText = strText;
        mstrYesCaption = strYesCaption;
        mstrNoCaption = strNoCaption;
        moclYes = oclYes;
        moclNo = oclNo;

        runOnUiThread(new Runnable()
        {
            @Override
            public void run()
            {
                AlertDialog.Builder dlgIpPort = new AlertDialog.Builder(ServiceProcessingActivity.this);

                dlgIpPort.setTitle(mstrYesOrNoTitle);
                dlgIpPort.setMessage(mstrText);
                dlgIpPort.setCancelable(false);

                dlgIpPort.setPositiveButton(mstrYesCaption, moclYes);
                dlgIpPort.setNegativeButton(mstrNoCaption, moclNo);
                dlgIpPort.show();
            }
        });
    }
}

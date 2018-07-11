package com.oteapp.dev;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.levelasquez.androidopensettings.AndroidOpenSettingsPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import xyz.miron.reactnativehourformat.RNHourFormatPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.RNTextInputMask.RNTextInputMaskPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.smixx.fabric.FabricPackage;
import org.wonday.pdf.RCTPdfView;
import com.RNFetchBlob.RNFetchBlobPackage;

import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new AndroidOpenSettingsPackage(),
            new LottiePackage(),
            new RNHourFormatPackage(),
            new FabricPackage(),
            new RNTextInputMaskPackage(),
            new FIRMessagingPackage(),
            new PickerPackage(),
            new SplashScreenReactPackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage(),
            new SvgPackage(),
            new RNI18nPackage(),
            new MapsPackage(),
            new RNFetchBlobPackage(),
            new RCTPdfView()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    Fabric.with(this, new Crashlytics());
  }
}

package com.onetransport.enterprise;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.syarul.rnlocation.RNLocation;
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
            new FabricPackage(),
            new RNLocation(),
            new RNTextInputMaskPackage(),
            new FIRMessagingPackage(),
            new PickerPackage(),
            new SplashScreenReactPackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage(),
            new SvgPackage(),
            new RNI18nPackage(),
            new MapsPackage()
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

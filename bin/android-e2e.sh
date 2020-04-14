if [ ! -f ./android/app/build/outputs/apk/release/app-release.apk ]; then
  detox build -c android.emu.release;
fi
detox test -c android.emu.release;

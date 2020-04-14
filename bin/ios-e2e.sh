if [ ! -a ../ios/build/Build/Products/Release-iphonesimulator/rnspike.app ]; then
  detox build -c ios.sim.release;
fi
detox test -c ios.sim.release;

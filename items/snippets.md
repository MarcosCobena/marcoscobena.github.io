### Connect an Android device through Wi-Fi

1.  Plug device through USB

2.  `$ adb devices`

  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  List of devices attached
  
  114aafe57d84 device
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1.  `$ adb tcpip 5555`

2.  Unplug it and gather its IP (Settings, About is a good place)

3.  `$ adb connect W.X.Y.Z`

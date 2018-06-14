### Add StyleCop to both Visual Studio on Windows & macOS

1. With a Solution opened, add [StyleCop.MSBuild](https://www.nuget.org/packages/StyleCop.MSBuild/) NuGet to every project you'd like to enforce coding guidelines
2. On such same projects, edit the .csproj to add the following line:

```xml
<PropertyGroup>
  [...]
  <!-- This' the line! -->
  <StyleCopTreatErrorsAsWarnings>false</StyleCopTreatErrorsAsWarnings>
</PropertyGroup>
```

3. At the Solution root, place a Settings.StyleCop file like [this](items/documents/Settings.StyleCop)
4. Bonus: You can edit visually which rules to apply by running this through CMD:

`PathToYourSolution\packages\StyleCop.MSBuild.5.0.0\tools>StyleCop.SettingsEditor.exe ..\..\..\Settings.StyleCop`

### Connect an Android device through Wi-Fi

1.  Plug device through USB

2.  `$ adb devices`

```
List of devices attached

114aafe57d84 device
```

3. `$ adb tcpip 5555`
4. Unplug it and gather its IP (Settings, About is a good place)
5. `$ adb connect W.X.Y.Z`

### Reset Visual Studio for Mac layout

1.  Close Visual Studio

2.  Delete
    `/Users/marcos/Library/Preferences/VisualStudio/7.0/EditingLayout.xml`

3.  Open Visual Studio

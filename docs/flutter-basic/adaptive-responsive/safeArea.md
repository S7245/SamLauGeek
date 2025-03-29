# SafeArea

<iframe width="560" height="315" src="https://www.youtube.com/embed/lkF0TQJO0bA?si=1BPsTPKCv_-H_193" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## 资料

[MediaQuery](https://notes.tst.sh/flutter/media-query/)


**LayoutBuilder & MediaQuery.sizeOf**

- `LayoutBuilder`: Gives the mininum and maximun height and width allowed for our widget.

```dart
LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth < 600) {
          return const MyScreen();
        } else {
          return const MyScreen();
        }
      },
    );
```

```dart
return LayoutBuilder(builder: (context, constraints) {

}
```

Platform Look

```dart
    Size size = MediaQuery.sizeOf(context);
    kIsWeb = true;
    defaultTargetPlatform = TargetPlatform.iOS;
```


```dart
Widget getPlatFormLayout(BuildContext context) {
  switch (defaultTargetPlatform) {
    case TargetPlatform.android:
      return const SafeAreaTest();
    case TargetPlatform.iOS:
      return const SafeAreaTest();
    case TargetPlatform.fuchsia:
      return const SafeAreaTest();
    case TargetPlatform.linux:
      return const SafeAreaTest();
    case TargetPlatform.macOS:
      return const SafeAreaTest();
    case TargetPlatform.windows:
      return const SafeAreaTest();
  }
}
```

**暗黑模式**

```dart
Brightness brightness = Theme.of(context).brightness;


class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        darkTheme: ThemeData(brightness: Brightness.dark),
        home: Scaffold(
          body: Center(
            child: Icon(
              Theme.of(context).brightness == Brightness.dark
                  ? Icons.dark_mode
                  : Icons.light_mode,
            ),
          ),
        ));
  }
}
```

动态监听

```dart
class BrightnessListenDemo extends StatefulWidget {
  const BrightnessListenDemo({super.key});

  @override
  State<BrightnessListenDemo> createState() => _BrightnessListenDemoState();
}

class _BrightnessListenDemoState extends State<BrightnessListenDemo>
    with WidgetsBindingObserver {}
```

**HardWare Sensors**

```dart
class HoverBox extends StatefulWidget {
  const HoverBox({super.key});

  @override
  State<HoverBox> createState() => _HoverBoxState();
}

class _HoverBoxState extends State<HoverBox> {
  bool _isHovering = false;

  @override
  Widget build(BuildContext context) {
    return FocusableActionDetector(
      onShowHoverHighlight: (showHighlight) {
        setState(() {
          _isHovering = showHighlight;
        });
      },
      child: Container(
        width: 100,
        height: 100,
        color: _isHovering ? Colors.blue : Colors.red,
      ),
    );
  }
}
```
# Mattermost to grommunio-chat iOS transformation guide

## Install the app

- `npm install`


## Run the app

- `npm start`
- normally via Xcode


## Build the app


## Debug

### Problems

#### OpenSSL problems

install OpenSSL v1.1: 
- `brew install openssl@1.1`
- `brew unlink openssl@3`
- `brew link openssl@1.1`
- add to path variable in `~/.zshrc`: `export PATH="/usr/local/opt/openssl@1.1/bin:$PATH"`
- restart terminal
- `openssl version` should be `1.1.1`

#### JDK problems

install Java 17:
- `brew install openjdk@17`
- add to path variable in `~/.zshrc`: :warning: check if path exists :warning: `export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home`

#### npm-solidarity-check problems with Android
- add to path variable in `~/.zshrc`: 
    ```
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    export PATH=$PATH:$ANDROID_HOME/tools
    export PATH=$PATH:$ANDROID_HOME/tools/bin
    export PATH=$PATH:$ANDROID_HOME/emulator
    ```

force solidarity check to ignore :warning: be sure you know what you are doing :warning::

- change solidarity check in `./solidarity`

### Errors

#### Cocoapods errors
e.g.
> /Users/jensherman/Code/grommunio-chat-mobile/ios/Pods/Target Support Files/Pods-grommunioChat/Pods-grommunioChat.debug.xcconfig:1:1 unable to open configuration settings file

> Could not build module ...

Reinstall node and pod modules:

- `rm -r node_modules/`
- `rm -rf ios/Podfile.lock ios/Pods/`
- `npm install`

If that didn't help:
- `rm -rf ~/Library/Caches/CocoaPods/`
- `rm -rf ~/Library/Developer/Xcode/DerivedData/ModuleCache.noindex/`
- `rm -rf ios/Podfile.lock ios/Pods/ ios/build/`
- `npm install`

#### Ruby (rvm) OpenSSL error
> `require': cannot load such file -- openssl (LoadError)

- use system-ruby: check with `rvm list` if other rubys are installed and remove them `rvm remove <versionNumber`
- restart terminal
- check if ruby version is `2.7.8`
- check if openssl works correctly: `ruby -ropenssl -e "puts :OK"` (maybe you have to restart the terminal)

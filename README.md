# Note: development on this repository has primarily moved to the `gekidou` branch
This `master` branch is mostly in maintenance mode while we're working to getting our "v2" (code named "gekidou") to the GA stage. To contribute check out the [gekidou](https://github.com/mattermost/mattermost-mobile/tree/gekidou) branch in this repository.

# Mattermost Mobile App
[![Mattermost](https://user-images.githubusercontent.com/7205829/136108314-75cd2e1f-4147-4cfa-a16c-9b3b0313ea25.png)](https://mattermost.com)

- **Minimum Server versions:** Current ESR version (6.3.0)
- **Supported iOS versions:** 12.1+
- **Supported Android versions:** 7.0+


[Mattermost](https://mattermost.com) is an open source platform for secure collaboration across the entire software development lifecycle. This repo is for the mobile app that runs on Android and iOS. You can download our apps from the [App Store](https://about.mattermost.com/mattermost-ios-app/) or [Google Play Store](https://about.mattermost.com/mattermost-android-app/), or [build them yourself](https://developers.mattermost.com/contribute/mobile/build-your-own/). 

New features are released monthly - check the [changelog](https://github.com/mattermost/mattermost-mobile/blob/master/CHANGELOG.md) for currently-supported features! 

**Important:** If you self-compile the Mattermost Mobile apps you also need to deploy your own [Mattermost Push Notification Service](https://github.com/mattermost/mattermost-push-proxy/releases). 

# How to Contribute

### Testing

To help with testing app updates before they're released, you can:

1. Sign up to be a beta tester
   - [Android](https://play.google.com/apps/testing/com.grommunio.chat)
   - [iOS](https://testflight.apple.com/join/Q7Rx7K9P) - Open this link from your iOS device
2. Install the `Mattermost Beta` app. New updates in the Beta app are released periodically. You will receive a notification when the new updates are available.
3. File any bugs you find by filing a [GitHub issue](https://github.com/mattermost/mattermost-mobile/issues) with:
   - Device information
   - Repro steps
   - Observed behavior (including screenshot / video when possible)
   - Expected behavior
4. (Optional) [Sign up for our team site](https://pre-release.mattermost.com/signup_user_complete/?id=f1924a8db44ff3bb41c96424cdc20676)
   - Join the [Native Mobile Apps channel](https://pre-release.mattermost.com/core/channels/native-mobile-apps) to see what's new and discuss feedback with other contributors and the core team
   
You can leave the Beta testing program at any time:
- On Android, [click this link](https://play.google.com/apps/testing/com.grommunio.chat) while logged in with your Google Play email address used to opt-in for the Beta program, then click **Leave the program**. 
- On iOS, access the `Mattermost Beta` app page in TestFlight and click **Stop Testing**.

### Contribute Code 

1. Look in [GitHub issues](https://mattermost.com/pl/help-wanted-mattermost-mobile) for issues marked as [Help Wanted]
2. Comment to let people know you’re working on it
3. Follow [these instructions](https://developers.mattermost.com/contribute/mobile/developer-setup/) to set up your developer environment
4. Join the [Native Mobile Apps channel](https://pre-release.mattermost.com/core/channels/native-mobile-apps) on our team site to ask questions



# Frequently Asked Questions

### How is data handled on mobile devices after a user account is deactivated?

App data is wiped from the device when a user logs out of the app. If the user is logged in when the account is deactivated, then within one minute the system logs the user out, and as a result all app data is wiped from the device.

### Can I connect to multiple Mattermost servers using the mobile apps?

At the moment, we only support connecting to one server at a time. If you need to connect to multiple servers, please [upvote the feature request](https://mattermost.uservoice.com/forums/306457/suggestions/10975938) so we can track demand for it. 

As a work around, you can install both the released "Mattermost" app and sign up to be a [tester](#testing) for the "Mattermost Beta" app so you can connect to two servers at once.

### Will there be second generation apps available for tablets?

We plan to add support for tablets in the future, but the timeline depends on how many people have a need for it. If you're looking for a tablet version, please help us out by [upvoting the feature request](https://mattermost.uservoice.com/forums/306457/suggestions/20082079)!

# Troubleshooting

### I keep getting a message "Cannot connect to the server. Please check your server URL and internet connection."

This sometimes appears when there is an issue with the SSL certificate configuration. 

To check that your SSL certificate is set up correctly, test the SSL certificate by visiting a site such as https://www.ssllabs.com/ssltest/index.html. If there’s an error about the missing chain or certificate path, there is likely an intermediate certificate missing that needs to be included.

Please note that the apps cannot connect to servers with self-signed certificates, consider using [Let's Encrypt](https://docs.mattermost.com/install/config-ssl-http2-nginx.html) instead. 

### I see a “Connecting…” bar that does not go away

If your app is working properly, you should see a grey “Connecting…” bar that clears or says “Connected” after the app reconnects. 

If you are seeing this message all the time, and your internet connection seems fine: 

Ask your server administrator if the server uses NGINX or another webserver as a reverse proxy. If so, they should check that it is configured correctly for [supporting the websocket connection for APIv4 endpoints](https://docs.mattermost.com/install/install-ubuntu-1604.html#configuring-nginx-as-a-proxy-for-mattermost-server). 

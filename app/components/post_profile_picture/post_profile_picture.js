// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import CompassIcon from '@components/compass_icon';
import GrommunioIcon from '@components/grommunio_icon';
import ProfilePicture from '@components/profile_picture';
import TouchableWithFeedback from '@components/touchable_with_feedback';
import {ViewTypes} from '@constants';
import {emptyFunction} from '@utils/general';

export default class PostProfilePicture extends PureComponent {
    static propTypes = {
        enablePostIconOverride: PropTypes.bool,
        fromWebHook: PropTypes.bool,
        isSystemMessage: PropTypes.bool,
        fromAutoResponder: PropTypes.bool,
        overrideIconUrl: PropTypes.string,
        onViewUserProfile: PropTypes.func,
        userId: PropTypes.string,
        isBot: PropTypes.bool,
        isEmoji: PropTypes.bool,
    };

    static defaultProps = {
        onViewUserProfile: emptyFunction,
    };

    render() {
        const {
            enablePostIconOverride,
            fromWebHook,
            isSystemMessage,
            fromAutoResponder,
            onViewUserProfile,
            overrideIconUrl,
            userId,
            isBot,
            isEmoji,
        } = this.props;

        if (isSystemMessage && !fromAutoResponder && !isBot) {
            return (
                <View style={style.buffer}>
                    <GrommunioIcon style={style.logo}/>
                </View>
            );
        }

        if (fromWebHook && enablePostIconOverride) {
            const frameSize = ViewTypes.PROFILE_PICTURE_SIZE;
            const pictureSize = isEmoji ? ViewTypes.PROFILE_PICTURE_EMOJI_SIZE : ViewTypes.PROFILE_PICTURE_SIZE;
            const borderRadius = isEmoji ? 0 : ViewTypes.PROFILE_PICTURE_SIZE / 2;

            let iconComponent;
            if (overrideIconUrl) {
                const source = {uri: overrideIconUrl};
                iconComponent = (
                    <FastImage
                        source={source}
                        style={{
                            height: pictureSize,
                            width: pictureSize,
                        }}
                    />
                );
            } else {
                iconComponent = (
                    <CompassIcon
                        name='webhook'
                        size={32}
                    />
                );
            }

            return (
                <View
                    style={[{
                        borderRadius,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: frameSize,
                        width: frameSize,
                    }, style.buffer]}
                >
                    {iconComponent}
                </View>
            );
        }

        const showProfileStatus = !fromAutoResponder;
        let component = (
            <ProfilePicture
                userId={userId}
                size={ViewTypes.PROFILE_PICTURE_SIZE}
                iconSize={24}
                showStatus={showProfileStatus}
                testID='post_profile_picture.profile_picture'
            />
        );

        if (!fromWebHook) {
            component = (
                <TouchableWithFeedback
                    onPress={onViewUserProfile}
                    type={'opacity'}
                >
                    {component}
                </TouchableWithFeedback>
            );
        }

        return component;
    }
}

const style = StyleSheet.create({
    buffer: {
        ...Platform.select({
            android: {
                marginRight: 2,
            },
            ios: {
                marginRight: 3,
            },
        }),
    },
    logo: {
        width: ViewTypes.PROFILE_PICTURE_SIZE,
        height: ViewTypes.PROFILE_PICTURE_SIZE,
    },
});

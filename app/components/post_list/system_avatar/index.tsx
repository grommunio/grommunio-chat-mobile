// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {StyleSheet, View} from 'react-native';

import GrommunioIcon from '@components/grommunio_icon';

const styles = StyleSheet.create({
    profilePictureContainer: {
        marginBottom: 5,
        marginLeft: 12,
        marginRight: 13,
        marginTop: 10,
    },
    logo: {
        width: 40,
        height: 40,
    },
});

const SystemAvatar = () => {
    return (
        <View style={styles.profilePictureContainer}>
            <GrommunioIcon style={styles.logo}/>
        </View>
    );
};

export default SystemAvatar;

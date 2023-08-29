// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {StyleSheet} from 'react-native';

import GrommunioIcon from '@app/components/grommunio_icon';

const styles = StyleSheet.create({
    logo: {
        width: 40,
        height: 40,
        marginLeft: -8,
    },
});

const SystemAvatar = () => {
    return (
        <GrommunioIcon style={styles.logo}/>
    );
};

export default SystemAvatar;

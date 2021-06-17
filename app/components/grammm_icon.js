/* eslint-disable header/header */
// Copyright (c) 2021-present grammm GmbH. All Rights Reserved.

import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import Icon from '@assets/images/grammm_favicon-triangle_light_512.png';

const GrammmIcon = () => (
    <View>
        <Image
            source={Icon}
            style={styles.logo}
        />
    </View>
);

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 200,
    },
});

export default GrammmIcon;

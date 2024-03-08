/* eslint-disable header/header */
// Copyright (c) 2021-present grommunio GmbH. All Rights Reserved.

import PropTypes from 'prop-types';
import React from 'react';
import {View, Image, type StyleProp, type ImageStyle} from 'react-native';

import Icon from '@assets/images/icon.png';

type Props = {
    style?: StyleProp<ImageStyle>;
};

const GrommunioIcon = ({style}: Props) => (
    <View>
        <Image
            source={Icon}
            style={style}
        />
    </View>
);

GrommunioIcon.propTypes = {
    style: PropTypes.object.isRequired,
};

export default GrommunioIcon;

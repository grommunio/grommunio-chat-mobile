/* eslint-disable header/header */
// Copyright (c) 2021-present grommunio GmbH. All Rights Reserved.

import PropTypes from 'prop-types';
import React from 'react';
import {View, Image} from 'react-native';

import Icon from '@assets/images/grommunioChat_512.png';

const GrommunioIcon = ({style}) => (
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

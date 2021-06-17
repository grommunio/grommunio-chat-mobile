/* eslint-disable header/header */
// Copyright (c) 2021-present grammm GmbH. All Rights Reserved.

import React from 'react';
import {View, Image} from 'react-native';
import PropTypes from 'prop-types';

import Icon from '@assets/images/grammm_favicon-triangle_light_512.png';

const GrammmIcon = ({style}) => (
    <View>
        <Image
            source={Icon}
            style={style}
        />
    </View>
);

GrammmIcon.propTypes = {
    style: PropTypes.object.isRequired,
};

export default GrammmIcon;

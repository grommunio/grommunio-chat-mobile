// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {View, Image} from 'react-native';

const Logo = require('@assets/images/logo.png');

type Props = {
    size?: number;
}

const GrommunioIcon = (props: Props) => (
    <View>
        <Image
            source={Logo}
            style={{
                width: props.size || 40,
                height: props.size || 40,

                //marginLeft: -8,
            }}
        />
    </View>
);

export default GrommunioIcon;

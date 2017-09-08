// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, View} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import FormattedText from 'app/components/formatted_text';

import SettingItemIcon from './setting_item_icon';
import getStyleSheet from './style';

export default class SettingsItem extends PureComponent {
    static propTypes = {
        defaultMessage: PropTypes.string.isRequired,
        i18nId: PropTypes.string.isRequired,
        iconName: PropTypes.string,
        iconType: PropTypes.oneOf(['fontawesome', 'foundation', 'ion', 'material']),
        isDestructor: PropTypes.bool,
        centered: PropTypes.bool,
        onPress: PropTypes.func,
        separator: PropTypes.bool,
        showArrow: PropTypes.bool,
        theme: PropTypes.object.isRequired
    };

    static defaultProps = {
        isDestructor: false,
        separator: true
    };

    render() {
        const {
            centered,
            defaultMessage,
            i18nId,
            iconName,
            iconType,
            isDestructor,
            onPress,
            separator,
            showArrow,
            theme
        } = this.props;
        const style = getStyleSheet(theme);

        const destructor = {};
        if (isDestructor) {
            destructor.color = theme.errorTextColor;
        }

        let divider;
        if (separator) {
            divider = (<View style={style.divider}/>);
        }

        let icon;
        if (iconType && iconName) {
            icon = (
                <SettingItemIcon
                    name={iconName}
                    type={iconType}
                    style={[style.icon, destructor]}
                />
            );
        }

        return (
            <TouchableOpacity
                onPress={onPress}
            >
                <View style={style.container}>
                    {icon &&
                    <View style={style.iconContainer}>
                        {icon}
                    </View>
                    }
                    <View style={style.wrapper}>
                        <View style={style.labelContainer}>
                            <FormattedText
                                id={i18nId}
                                defaultMessage={defaultMessage}
                                style={[style.label, destructor, centered ? style.centerLabel : {}]}
                            />
                            {showArrow &&
                            <View style={style.arrowContainer}>
                                <FontAwesomeIcon
                                    name='angle-right'
                                    style={style.arrow}
                                />
                            </View>
                            }
                        </View>
                        {divider}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

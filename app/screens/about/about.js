// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {intlShape} from 'react-intl';
import {
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {SafeAreaView} from 'react-native-safe-area-context';

import Config from '@assets/config';
import FormattedText from '@components/formatted_text';
import StatusBar from '@components/status_bar';
import AboutLinks from '@constants/about_links';
import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';
import {tryOpenURL} from '@utils/url';
import GrammmIcon from '@components/grammm_icon';

const MATTERMOST_BUNDLE_IDS = ['com.mattermost.rnbeta', 'com.mattermost.rn'];

export default class About extends PureComponent {
    static propTypes = {
        config: PropTypes.object.isRequired,
        license: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
    };

    static contextTypes = {
        intl: intlShape.isRequired,
    };

    openURL = (url) => {
        const {intl} = this.context;
        const onError = () => {
            Alert.alert(
                intl.formatMessage({
                    id: 'mobile.link.error.title',
                    defaultMessage: 'Error',
                }),
                intl.formatMessage({
                    id: 'mobile.link.error.text',
                    defaultMessage: 'Unable to open the link.',
                }),
            );
        };

        tryOpenURL(url, onError);
    };

    handleAboutTeam = () => {
        this.openURL(Config.AboutTeamURL);
    };

    handleAboutEnterprise = () => {
        this.openURL(Config.AboutEnterpriseURL);
    };

    handlePlatformNotice = () => {
        this.openURL(Config.PlatformNoticeURL);
    };

    handleMobileNotice = () => {
        this.openURL(Config.MobileNoticeURL);
    };

    handleTermsOfService = () => {
        this.openURL(AboutLinks.TERMS_OF_SERVICE);
    };

    handlePrivacyPolicy = () => {
        this.openURL(AboutLinks.PRIVACY_POLICY);
    }

    render() {
        const {theme, config} = this.props;
        const style = getStyleSheet(theme);

        const subTitle = (
            <FormattedText
                id='about.teamEditionSt'
                defaultMessage='All your team communication in one place, instantly searchable and accessible anywhere.'
                style={style.subtitle}
                testID='about.subtitle'
            />
        );

        const learnMore = (
            <View style={style.learnContainer}>
                <FormattedText
                    id='about.teamEditionLearn'
                    defaultMessage='Join the grammm community at '
                    style={style.learn}
                    testID='about.learn_more'
                />
                <TouchableOpacity
                    onPress={this.handleAboutTeam}
                >
                    <Text
                        style={style.learnLink}
                        testID='about.learn_more.url'
                    >
                        {Config.TeamEditionLearnURL}
                    </Text>
                </TouchableOpacity>
            </View>
        );

        let serverVersion;
        if (config.BuildNumber === config.Version) {
            serverVersion = (
                <FormattedText
                    id='mobile.about.serverVersionNoBuild'
                    defaultMessage='Server Version: {version}'
                    style={style.info}
                    values={{
                        version: config.Version,
                    }}
                    testID='about.server_version'
                />
            );
        } else {
            serverVersion = (
                <FormattedText
                    id='mobile.about.serverVersion'
                    defaultMessage='Server Version: {version} (Build {number})'
                    style={style.info}
                    values={{
                        version: config.Version,
                        number: config.BuildNumber,
                    }}
                    testID='about.server_version'
                />
            );
        }

        let termsOfService;
        if (config.TermsOfServiceLink) {
            termsOfService = (
                <FormattedText
                    id='mobile.tos_link'
                    defaultMessage='Terms of Service'
                    style={style.noticeLink}
                    onPress={this.handleTermsOfService}
                    testID='about.terms_of_service'
                />
            );
        }

        let privacyPolicy;
        if (config.PrivacyPolicyLink) {
            privacyPolicy = (
                <FormattedText
                    id='mobile.privacy_link'
                    defaultMessage='Privacy Policy'
                    style={style.noticeLink}
                    onPress={this.handlePrivacyPolicy}
                    testID='about.privacy_policy'
                />
            );
        }

        let tosPrivacyHyphen;
        if (termsOfService && privacyPolicy) {
            tosPrivacyHyphen = (
                <Text style={[style.footerText, style.hyphenText]}>
                    {' - '}
                </Text>
            );
        }

        return (
            <SafeAreaView
                edges={['left', 'right']}
                style={style.container}
                testID='about.screen'
            >
                <StatusBar/>
                <ScrollView
                    style={style.scrollView}
                    contentContainerStyle={style.scrollViewContent}
                    testID='about.scroll_view'
                >
                    <View style={style.logoContainer}>
                        <GrammmIcon/>
                    </View>
                    <View style={style.infoContainer}>
                        <View style={style.titleContainer}>
                            <Text
                                style={style.title}
                                testID='about.site_name'
                            >
                                {`${config.SiteName} `}
                            </Text>
                        </View>
                        {subTitle}
                        <FormattedText
                            id='mobile.about.appVersion'
                            defaultMessage='App Version: {version} (Build {number})'
                            style={style.info}
                            values={{
                                version: DeviceInfo.getVersion(),
                                number: DeviceInfo.getBuildNumber(),
                            }}
                            testID='about.app_version'
                        />
                        {serverVersion}
                        <FormattedText
                            id='mobile.about.database'
                            defaultMessage='Database: {type}'
                            style={style.info}
                            values={{
                                type: config.SQLDriverName,
                            }}
                            testID='about.database'
                        />
                        {learnMore}
                        {!MATTERMOST_BUNDLE_IDS.includes(DeviceInfo.getBundleId()) &&
                            <FormattedText
                                id='mobile.about.powered_by'
                                defaultMessage='{site} is powered by grammm'
                                style={style.footerText}
                                values={{
                                    site: this.props.config.SiteName,
                                }}
                                testID='about.powered_by'
                            />
                        }
                        <FormattedText
                            id='mobile.about.grammm_copyright'
                            defaultMessage='Copyright 2021-{currentYear} grammm GmbH. All rights reserved'
                            style={[style.footerText, style.copyrightText]}
                            values={{
                                currentYear: new Date().getFullYear(),
                            }}
                            testID='about.copyright'
                        />
                        <FormattedText
                            id='mobile.about.copyright'
                            defaultMessage='Copyright 2015-{currentYear} Mattermost, Inc. All rights reserved'
                            style={[style.footerText, style.copyrightText]}
                            values={{
                                currentYear: new Date().getFullYear(),
                            }}
                            testID='about.copyright'
                        />
                        <View style={style.tosPrivacyContainer}>
                            {termsOfService}
                            {tosPrivacyHyphen}
                            {privacyPolicy}
                        </View>
                        <View style={style.hashContainer}>
                            <View style={style.footerGroup}>
                                <FormattedText
                                    id='about.hash'
                                    defaultMessage='Build Hash:'
                                    style={style.footerTitleText}
                                    testID='about.build_hash.title'
                                />
                                <Text
                                    style={style.footerText}
                                    testID='about.build_hash.value'
                                >
                                    {config.BuildHash}
                                </Text>
                            </View>
                            <View style={style.footerGroup}>
                                <FormattedText
                                    id='about.hashee'
                                    defaultMessage='EE Build Hash:'
                                    style={style.footerTitleText}
                                    testID='about.build_hash_enterprise.title'
                                />
                                <Text
                                    style={style.footerText}
                                    testID='about.build_hash_enterprise.value'
                                >
                                    {config.BuildHashEnterprise}
                                </Text>
                            </View>
                        </View>
                        <View style={style.footerGroup}>
                            <FormattedText
                                id='about.date'
                                defaultMessage='Build Date:'
                                style={style.footerTitleText}
                                testID='about.build_date.title'
                            />
                            <Text
                                style={style.footerText}
                                testID='about.build_date.value'
                            >
                                {config.BuildDate}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const getStyleSheet = makeStyleSheetFromTheme((theme) => {
    return {
        container: {
            flex: 1,
        },
        scrollView: {
            flex: 1,
            backgroundColor: changeOpacity(theme.centerChannelColor, 0.06),
        },
        scrollViewContent: {
            paddingBottom: 30,
        },
        logoContainer: {
            alignItems: 'center',
            flex: 1,
            height: 200,
            paddingVertical: 40,
        },
        infoContainer: {
            flex: 1,
            flexDirection: 'column',
            paddingHorizontal: 20,
        },
        titleContainer: {
            flex: 1,
            marginBottom: 20,
        },
        title: {
            fontSize: 22,
            color: theme.centerChannelColor,
        },
        subtitle: {
            color: changeOpacity(theme.centerChannelColor, 0.5),
            fontSize: 19,
            marginBottom: 15,
        },
        learnContainer: {
            flex: 1,
            flexDirection: 'column',
            marginVertical: 20,
        },
        learn: {
            color: theme.centerChannelColor,
            fontSize: 16,
        },
        learnLink: {
            color: theme.linkColor,
            fontSize: 16,
        },
        info: {
            color: theme.centerChannelColor,
            fontSize: 16,
            lineHeight: 19,
        },
        licenseContainer: {
            flex: 1,
            flexDirection: 'row',
            marginTop: 20,
        },
        noticeContainer: {
            flex: 1,
            flexDirection: 'column',
        },
        noticeLink: {
            color: theme.linkColor,
            fontSize: 11,
            lineHeight: 13,
        },
        hashContainer: {
            flex: 1,
            flexDirection: 'column',
        },
        footerGroup: {
            flex: 1,
        },
        footerTitleText: {
            color: changeOpacity(theme.centerChannelColor, 0.5),
            fontSize: 11,
            fontWeight: '600',
            lineHeight: 13,
        },
        footerText: {
            color: changeOpacity(theme.centerChannelColor, 0.5),
            fontSize: 11,
            lineHeight: 13,
            marginBottom: 10,
        },
        copyrightText: {
            marginBottom: 0,
        },
        hyphenText: {
            marginBottom: 0,
        },
        tosPrivacyContainer: {
            flex: 1,
            flexDirection: 'row',
            marginBottom: 10,
        },
    };
});

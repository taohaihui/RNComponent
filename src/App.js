/*
 * @Author: thh 
 * @Date: 2018-08-28 13:55:02 
 * @Last Modified by: thh
 * @Last Modified time: 2018-08-28 17:09:37
 */
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { WhiteSpace } from 'antd-mobile-rn';

import BaseEChart from './component/baseEChart/BaseEChart';
import EChartMap from './component//eChartMap/EChartMap';

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <BaseEChart /> */}
          <EChartMap />
          <WhiteSpace />
        </ScrollView>
      </View>
    );
  }
}
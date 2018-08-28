/*
 * @Author: thh 
 * @Date: 2018-08-28 14:26:08 
 * @Last Modified by: thh
 * @Last Modified time: 2018-08-28 17:11:00
 */
import React, { Component } from 'react';
import { View, WebView, Platform, Dimensions } from 'react-native';

export default class BaseEChart extends Component {
  componentDidMount() {
    this.props.eChartsOptions && this.newData();
    this.props.eChartsEvents && this.addEChartListener();
    this.props.mapData && this.newMap();
  }

  componentWillReceiveProps(nextProps) {
    const { eChartsOptions, eChartsEvents, mapData } = nextProps;
    eChartsOptions && this.newData(eChartsOptions);
    eChartsEvents && this.addEChartListener(eChartsEvents);
    mapData && this.newMap(mapData);
  }

  render() {
    const { width, height, bgColor } = this.props;

    return (
      <View style={[{ width, height }]}>
        <WebView
          ref={node => this.eChartsNode = node}
          startInLoadingState={true}
          style={[{ flex: 1, backgroundColor: bgColor }]}
          source={require('./base.html')}
          onLoad={this.htmlLoad.bind(this)}
          onMessage={this.getMessage.bind(this)} />
      </View>
    );
  }

  htmlLoad() {
    this.initDom();
    this.props.onLoad && this.props.onLoad();
  }

  //初始化图表尺寸
  initDom() {
    let { width, height } = this.props;
    let data = {
      action: 'initDom',
      options: {
        width,
        height,
      }
    };
    this.postMessage(data);
  }

  //更新图表数据
  newData(eChartsOptions) {
    let data = {
      action: 'newData',
      options: eChartsOptions || this.props.eChartsOptions
    };
    this.postMessage(data);
  }

  //给图表添加事件
  addEChartListener(eChartsEvents) {
    let data = {
      action: 'newData',
      options: eChartsEvents || this.props.eChartsEvents
    };
    this.postMessage(data);
  }

  //注册新地图
  newMap(mapData) {
    let data = {
      action: 'newMap',
      options: mapData || this.props.mapData
    };
    this.postMessage(data);
  }

  //接收webView传回的数据
  getMessage(e) {
    let data = JSON.parse(e.nativeEvent.data);
    this.props.onMessage && this.props.onMessage(data);
  }

  //向webView发送message事件
  postMessage(data) {
    let action = data.action;
    let str = JSON.stringify(data, function (key, value) {
      if (typeof value === 'function') { //序列化函数
        return `${value}`;
      }

      return value;
    });

    if (this[action] !== str) {
      console.log(data);
      this[action] = str;
      this.eChartsNode.postMessage(str);
    }
  }

  //向webView注入js代码
  injectJavaScript(code) {
    this.eChartsNode.injectJavaScript(code);
  }
}

BaseEChart.defaultProps = {
  width: Dimensions.get('window').width, //图表宽 number
  height: Dimensions.get('window').height / 2, //图表高 number
  bgColor: '#fff', //webView背景色 string
  eChartsOptions: null, //图表配置参数 {}
  eChartsEvents: null, //添加事件 []
  mapData: null, //地图数据 {}
  onMessage: null, //eChartsEvents事件的回调 function
  onLoad: null, //webView加载成功的回调，在此回调函数中要重新渲染组件
}
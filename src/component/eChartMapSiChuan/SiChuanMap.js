/*
 * @Author: thh 
 * @Date: 2018-08-29 10:39:38 
 * @Last Modified by: thh
 * @Last Modified time: 2018-08-29 11:44:28
 */
import React, { Component } from 'react';
import BaseEChart from '../baseEChart/BaseEChart';

import siChuanMap from './sichuan.json';

export default class SiChuanMap extends Component {
  state = {
    options: null,
    events: null,
    mapName: null,
    mapData: null,
  };

  render() {
    return (
      <BaseEChart
        eChartsOptions={this.state.options}
        eChartsEvents={this.state.events}
        mapName={this.state.mapName}
        mapData={this.state.mapData}
        onLoad={this.onLoad.bind(this)}
        onMessage={this.handleMessage.bind(this)} />
    );
  }

  //必须在图表加载完成后再设置数据
  onLoad() {
    this.setState({
      options: this.setMapData(),
      events: this.setEvents(),
      mapName: '四川',
      mapData: siChuanMap,
    });
  }

  handleMessage(data) {
    console.log(data);
  }

  setMapData(maxNum = 2000, data = []) {
    let options = {
      title: {
        text: '四川地图，通过json文件注册地图',
        textStyle: {
          fontSize: 16,
          color: '#999',
          align: 'center',
          lineHeight: 30
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return params.name + ' : ' + (params.value[2] || 0);
        }
      },
      series: [{
        type: 'map',
        map: '四川',
      }]
    };

    return options;
  }

  setEvents() {
    let eChartsEvents = [
      {
        name: 'click',
        value: ['componentType', 'seriesType', 'seriesIndex', 'name', 'data']
      },
      {
        name: 'dblclick',
        value: ['componentType']
      }
    ];

    return eChartsEvents;
  }
}
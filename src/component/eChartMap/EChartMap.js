/*
 * @Author: thh 
 * @Date: 2018-08-28 16:19:46 
 * @Last Modified by: thh
 * @Last Modified time: 2018-08-29 11:43:13
 */
import React, { Component } from 'react';

import BaseEChart from '../baseEChart/BaseEChart';

export default class EChartMap extends Component {
  state = {
    options: null,
    events: null
  };

  render() {
    return (
      <BaseEChart
        //bgColor="pink"
        eChartsOptions={this.state.options}
        eChartsEvents={this.state.events}
        onLoad={this.onLoad.bind(this)}
        onMessage={this.handleMessage.bind(this)} />
    );
  }

  //必须在图表加载完成后再设置数据
  onLoad() {
    this.setState({
      options: this.setMapData(),
      events: this.setEvents()
    });
  }

  handleMessage(data) {
    console.log(data);
  }

  setMapData(maxNum = 2000, data = []) {
    let options = {
      title: {
        text: '中国地图，通过js加载地图数据',
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
      dataRange: {
        y: 'bottom',
        x: 'right',
        max: maxNum,
        itemWidth: 10,
        calculable: true,
        color: ['rgba(255, 255, 255, 0.8)', 'rgba(14, 241, 242, 0.8)', 'rgba(37, 140, 249, 0.8)'],
        textStyle: {
          color: '#fff'
        },
        show: true,
      },
      geo: {
        map: 'china',
        scaleLimit: {
          min: 1,
          max: 3,
        },
        itemStyle: {
          areaColor: 'none',
          borderColor: 'rgba(100,149,237,1)'
        },
        emphasis: {
          itemStyle: {
            areaColor: 'none'
          },
          label: {
            show: false
          }
        }
      },
      series: [{
        type: 'effectScatter',
        //name: '案件量',
        effectType: 'ripple',
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        coordinateSystem: 'geo',
        data: data,
        symbol: 'circle',
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(14, 241, 242, 0.8)'
        },
        emphasis: {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          }
        }
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
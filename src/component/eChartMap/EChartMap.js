/*
 * @Author: thh 
 * @Date: 2018-08-28 16:19:46 
 * @Last Modified by: thh
 * @Last Modified time: 2018-08-28 17:06:59
 */
import React, { Component } from 'react';

import BaseEChart from '../baseEChart/BaseEChart';

export default class EChartMap extends Component {
  state = {
    options: null
  };

  render() {
    return (
      <BaseEChart
        //bgColor="pink"
        eChartsOptions={this.state.options}
        onLoad={this.onLoad.bind(this)} />
    );
  }

  onLoad() {
    this.setMapData();
  }

  setMapData(maxNum = 2000, data = []) {
    let options = {
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
        //roam: true,
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

    this.setState({
      options
    });
  }
}
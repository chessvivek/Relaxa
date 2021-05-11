import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineGraph extends Component {
	render() {
		const options = {
			animationEnabled: false,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Stress level vs Time",
                fontSize: "15",
			},
			axisY: {
				title: "Stress level",
				suffix: "%",
                maximum: 100,
                gridThickness: 0,
                includeZero: true,
                
			},
			axisX: {
				title: "Time",
				suffix: "s",
				interval: 15,
                includeZero: true,
			},
			data: [{
				type: "spline",
				toolTipContent: "time {x} s : {y}%",
				dataPoints: this.props.data,
			}],
            width: 400,
            height: 300,


		}

		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default LineGraph;
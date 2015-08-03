'use strict';

/**
 * @ngdoc service
 * @name graphApp.graphRender
 * @description
 * # graphRender
 * Service in the mySampleApp.
 */
angular.module('mySampleApp')
	.service('graphRender', function ($log) {
		//do the actual rendering
		function renderBars(elem, dataTable, opts) {
			var chart = new google.visualization.BarChart(elem);
			chart.draw(dataTable, opts);
		}

		function renderPie(elem, dataTable, opts) {
			var chart = new google.visualization.PieChart(elem);
			chart.draw(dataTable, opts);
		}

		function renderLineGraph(elem, dataTable, opts) {
			var chart = new google.visualization.LineChart(elem);
			chart.draw(dataTable, opts);
		}

		this.draw = function(elem, data, type) {

			if(!data)
			{
				$log.error("No data to draw the chart");
				return;
			} 

			//TODO, validate data structure
			// $log.log("chart is type:" + type);

			//prepare info in google chart style
			var dataTable;
			if(google && google.visualization)
			{
				dataTable = new google.visualization.DataTable();
				//columns
				for(var i=0; i<data.columns.length; i++)
				{
					// $log.log("add columns:", data.columns[i]);
					dataTable.addColumn.apply(dataTable, data.columns[i]);
				}

				//rows
				dataTable.addRows(data.rows);
				
			} else {
				throw new Error("Google Charts was not loaded");
			}
			


			//call a different render function depending on type
			switch(type){
				case "bars":
					renderBars(elem, dataTable, data.options);
					break;
				case "pie":
					renderPie(elem, dataTable, data.options);
					break;
				case "lines":
					renderLineGraph(elem, dataTable, data.options);
					break;
				default:
					$log.error("Invalid chart type");
			}
		};
	});

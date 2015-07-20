'use strict';

/**
 * @ngdoc service
 * @name graphApp.graphRender
 * @description
 * # graphRender
 * Service in the graphApp.
 */
angular.module('graphApp')
	.service('graphRender', function ($log) {
		//do the actual rendering
		//params: 
		//	1 - a canvas context
		//	2 - the graph data
		function renderBars(ctx, data) {
			$log.log("rendering bars");
			ctx.fillStyle = "#804715";
			ctx.fillRect(10, 10, 100, 100);
		}

		function renderPie(ctx, data) {
			$log.log("rendering pie");
			ctx.fillStyle = "#801B15";
			ctx.fillRect(10, 10, 100, 100);
		}

		function renderLineGraph(ctx, data) {
			$log.log("rendering line");
			ctx.fillStyle = "#10631B";
			ctx.fillRect(10, 10, 100, 100);
		}

		this.draw = function(canvas, data) {
			//validation
			if(!(canvas instanceof HTMLCanvasElement)){
				throw new Error("Not an instance of Canvas");
			}

			if(!data)
			{
				$log.error("No data to draw the graph");
				return;
			} else if(!data.type)
			{
				$log.error('Not enough data to draw the graph, "type" missing');
				return;
			}

			//TODO, validate data structure
			$log.log("data is type:" + data.type);

			//call a different render function depending on type
			var ctx = canvas.getContext("2d");

			switch(data.type){
				case "bars":
					renderBars(ctx, data);
					break;
				case "pie":
					renderPie(ctx, data);
					break;
				case "lines":
					renderLineGraph(ctx, data);
					break;
				default:
					$log.error("Invalid graphic type");
			}
		}
	});

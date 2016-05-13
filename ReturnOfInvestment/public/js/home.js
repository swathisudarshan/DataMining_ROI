/**
 * http://usejsdoc.org/
 */
var appVar = angular.module('app', [ "ngRoute","highcharts-ng"]);

appVar.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/stats', {
		controller : 'ctrl1',
		templateUrl : 'templates/stats.ejs'
	}).when('/prediction', {
		controller : 'baysianCtrl',
		templateUrl : '/templates/baysian.ejs'
	}).when('/yearly', {
		controller : 'yearlyctrl',
		templateUrl : '/templates/yearlyanalysis.ejs'
	}).when('/maps#/yearly', {
		controller : 'yearlyctrl',
		templateUrl : '/home.ejs'
	})
} ]);

appVar.controller("ctrl1", function($scope, $http) {
	$http({
		method : "POST",
		url : '/getData',
		data : {}
	}).success(function(data){
		if(data.statusCode == 401){
			console.log("error");
		}
		else
		{
			$scope.tuitionjson = data.schools[0].array;
			console.log("Output is"+JSON.stringify($scope.tuitionjson));
			console.log("Success");
		}
	}).error(function(error){
		console.log("error");
	});
	
	    $scope.highchartsNG = {
	        options: {
	            chart: {
	                type: 'bar',
	                events: {
	                    redraw: function() {
	                    }

	                }
	            }
	        },
	        series: [{
	        	color: $scope.barcolor,
	            data: []  
	        }],
	        title: {
	            text: 'Return of Investment for Colleges'
	        },
	        xAxis: {
	        	title: {
	        		text: 'College Name'
	        	},
	        	categories: []
	        },
	        yAxix: {
	        },
	        loading: false
	    }
	    angular.forEach($scope.tuitionjson, function(item) {
	    	console.log(item);
	    	$scope.highchartsNG.xAxis.categories.push(item.name)	 
	    })
	    $scope.xSeriesArray = [];
	    angular.forEach($scope.tuitionjson, function(item) {
	    	    	console.log(item);
	    	    	$scope.xSeriesArray.push(item.cost)	 
	    	    })
	    $scope.highchartsNG.series[0].data = $scope.xSeriesArray;
	    
	    $scope.barcolor = '#166D9C';
	   
	    $scope.selectedItemChanged = function() {
	    	console.log($scope.selection);
	    	if($scope.selection == 'Tuition Fees')
	    		{
	    		$scope.xSeriesArray = [];
	    		angular.forEach($scope.tuitionjson, function(item) {
	    	    	console.log(item);
	    	    	$scope.xSeriesArray.push(item.cost)	 
	    	    })
	    	    $scope.barcolor = '#166D9C';
	    		}
	    	else if($scope.selection == 'Earnings')
	    		{
	    		$scope.xSeriesArray = [];
	    		angular.forEach($scope.tuitionjson, function(item) {
	    	    	console.log(item);
	    	    	$scope.xSeriesArray.push(item.earn)	 
	    	    })
	    	    $scope.barcolor = '#1F9C16'
	    		}
	    	else if($scope.selection == 'Completion Rate')
	    		{
	    		$scope.xSeriesArray = [];
	    		angular.forEach($scope.tuitionjson, function(item) {
	    	    	console.log(item);
	    	    	$scope.xSeriesArray.push(item.Comp)	 
	    	    })
	    	    $scope.barcolor = '#8B9C16'
	    		}
	    	$scope.highchartsNG.series[0].data = $scope.xSeriesArray;

	    	// $scope.highchartsNG.options.chart.redraw();
	    }
	    
	    
	    $scope.redirect = function() {
	    	window.location = "#/baysian.ejs";
	    }
	});

appVar.controller("baysianCtrl", function($scope,$http) {
	$http({
		method : "POST",
		url : '/getNormalizedData',
		data : {}
	}).success(function(data){
		if(data.statusCode == 401){
			console.log("error");
		}
		else
		{
			$scope.baysian = data.schools[0].array;
			console.log("Output is"+JSON.stringify($scope.tuitionjson));
			console.log("Success");
		}
	}).error(function(error){
		console.log("error");
	});

	
	$scope.baysiandata = [];

	$scope.calculate = function(tuition, earning,comp) {

	$scope.tuition = 0;

	$scope.earnings = 0;

	$scope.comp = 0;

	$scope.total = 0;

	$scope.count=0;

	$scope.college = [];
	  angular.forEach($scope.baysian, function(item) {
	  $scope.data= [];
	  if(item.MALE_RPY == "Yes") 
	  {
	  $scope.total = $scope.total +1;
	  $scope.count = $scope.count +1;
	  }
	    if(item.MALE_RPY == "Yes" & item.TUITIONFEE_IN == tuition)
	    {
	    $scope.tuition = $scope.tuition+1;
	    $scope.count = $scope.count+1;
	    }
	    if(item.MALE_RPY == "Yes" & item.EARN_2011 == earning)
	    {
	    $scope.earnings = $scope.earnings+1;
	    $scope.count = $scope.count +1;
	    }
	    if(item.MALE_RPY == "Yes" & item.C150_4 == comp)
	    {
	    $scope.comp = $scope.comp+1;
	    $scope.count = $scope.count +1;
	    }
	    if(item.MALE_RPY == "Yes" & item.EARN_2011 == earning & item.TUITIONFEE_IN == tuition & item.C150_4 == comp)
	    {
	    $scope.college.push(item.INSTNM);
	    }
	   })
	$scope.prob = ($scope.tuition/$scope.total)*($scope.earnings/$scope.total)*($scope.comp/$scope.total);
	$scope.baysiandata.push({'fees':tuition, 'earn':earning, 'comp':comp, 'prob':$scope.prob,'college': angular.copy($scope.college)})
	}	
});

appVar.controller('yearlyctrl', function($scope, $http) {
	$http({
		method : "POST",
		url : '/getDataYearly',
		data : {}
	}).success(function(data){
		if(data.statusCode == 401){
			console.log("error");
		}
		else
		{
			$scope.yearly = data.schools[0].array[0].schools;
			console.log("Output is"+JSON.stringify($scope.yearly));
			console.log("Success");
		}
	}).error(function(error){
		console.log("error");
	});

	
	//$scope.years = ['2011','2012','2013','2014'];
	
	$scope.option = 0;
	
	for(var i=0;i<$scope.yearly.length;i++)
		{
		
		$scope.collegeNames.push({"id":$scope.option++ , "name":$scope.yearly[i].name});
		}
	$scope.collegeName = $scope.collegeNames[0];
	 $scope.highchartsNG = {
		        options: {
		            chart: {
		                type: 'line',
		                events: {
		                    redraw: function() {
		                    }

		                }
		            }
		        },
		        tooltip: {
		            pointFormat: "Value: {point.y:,.1f} mm"
		        },
		        series: [{
		            data: [],
		            pointStart: Date.UTC(2011, 0, 1),
		            pointInterval: 366*(24 * 3600 * 1000),
		            name: 'Years'
		            
		        }],
		        title: {
		            text: $scope.collegeName
		        },
		        xAxis: {
		        	type: 'datetime',
		        	labels: {
		                format: '{value:%Y}'
		            },
		        	title: {
		        		text: []
		        	}
		        },
		        yAxix: {
		        	cost: [],
		        	title: {
		        		text: 'Cost'
		        	}
		        },
		        loading: false
		    }
	 
	 
	  var  yeardata = $scope.yearly[0].array[0];
	 $scope.xSeriesArray = [];
	  for(var i =0;i<$scope.yearly.length;i++)
		  {
		  $scope.xSeriesArray.push($scope.yearly[i].cost)	 
		  }
	  $scope.highchartsNG.series[0].data = $scope.xSeriesArray;
	  $scope.highchartsNG.xAxis.years = $scope.years;
	  $scope.highchartsNG.title.text = $scope.collegeName.name
	
	$scope.selectedItemChanged = function(selection)
	{
		$scope.xSeriesArray = [];	 
		$scope.highchartsNG.series[0].data = [];
		$scope.data = $scope.yearly[selection];
		 for(var i =0;i<$scope.data.length;i++)
	 		{
				 $scope.xSeriesArray.push(((($scope.data[i].earn*5) - ($scope.data[i].cost))/($scope.data[i].cost))*100)
	 		}
		 $scope.highchartsNG.series[0].data = $scope.xSeriesArray;
		 $scope.highchartsNG.title.text = $scope.collegeNames[selection].name
	}

	
});

appVar.controller('decisionCtrl',function($scope){
	
	$scope.decision = [{
		"name": "Queens",
	    "cost": "high",
	    "MALE_RPY": "No",
	    "earn": "high",
	    "comp": "high"
	  }];
	
	$scope.print1=""
	
	$scope.jsondata = [({'cost': {'average':{'earn':{'low':'no','high':'yes'}},'low':'yes','high':'no'}})];
	angular.toJson($scope.jsondata);
	angular.forEach($scope.jsondata, function(item) {
		
		angular.forEach(item.cost, function(item)
        	{
			console.log(item)
//        	 if(angular.isObject($scope.jsondata[0].cost.average))
//        		 {
//        		 if(angular.isObject($scope.jsondata[0].cost.average.earn))
//        			 {
//        			   console.log("cost->average->earn->low->"+$scope.jsondata[0].cost.average.earn.low)
//        			   console.log("cost->average->earn->high->"+$scope.jsondata[0].cost.average.earn.high)
//        			 }
//        		 }
//        	 else
//        		 {
//        		 console.log("cost->average->"+$scope.jsondata[0].cost.average)
//        		 }
        	})
		
	    })
	
})


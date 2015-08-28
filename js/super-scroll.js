var superScroll = angular.module("superScroll",[]);
superScroll.directive("superScroll",function($window){
    var superScrollDirective ={
        restrict:'E',
        replace:true
    };
    superScrollDirective.scope = {
        color : "=color",
        position: "=position"
    },
    superScrollDirective.controller = function($scope){
        $scope.width="0%";
        $scope.$on("scrolling",function(){
            var s = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            var d = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
            var c = window.innerHeight;
            $scope.width =  (s / (d - c)) * 100 + "%";
            $scope.$digest();
        });
    };
    superScrollDirective.template = "<div "
        +"id='ng-scroll-indicator'"
        +"style='position: fixed; {{position}}: 0px; width: 100%; height: 2px; margin: 0px; left: 0px; z-index: 1100;width:{{width}}'"
        +"><span id='Progress-bar' class='bar' "
        +"style=' height: 2px; background:{{color}}; position: fixed;  {{position}}: 0px; width:{{width}};  z-index: 1100;'"
        +"></span></div>";
    superScrollDirective.link=function(scope) {
        angular.element($window).on('scroll', function(e) {
    		scope.$broadcast('scrolling');
        });
    };
    return superScrollDirective;                                                                                        
});
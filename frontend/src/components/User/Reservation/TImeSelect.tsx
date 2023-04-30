import React from "react";
// import ReactDatePicker from "react-datepicker";
import 

export default function Timeselect() {
  var app = angular.module("timepicker", []);

  app.controller("timeCtrl", [
    "$scope",
    function ($scope) {
      $scope.getHours = function () {
        var hours = new Array(11);
        return hours;
      };

      $scope.time = "12:00";
      $scope.hour = 12;
      $scope.minutes = 0;
      $scope.currentoffset = 0;

      $scope.timeframe = "am";

      $scope.changetime = function (timeframe) {
        $scope.timeframe = timeframe;
      };
    },
  ]);

  app.directive("timetravel", function ($window) {
    return {
      restrict: "A",
      scope: {
        selectedtime: "=",
      },
      link: function (scope, element, attrs) {
        function pad2(number) {
          return (number < 10 ? "0" : "") + number;
        }

        scope.moving = false;
        scope.offsetx = 0;
        scope.currentoffset = 0;
        scope.totaloffset = 0;
        var currenttime = $(".current-time");
        var timeline = $(".timeline");
        var timeline_width = timeline[0].offsetWidth;

        angular.element($window).on("resize", function () {
          timeline_width = timeline[0].offsetWidth;
        });

        scope.getTime = function () {
          var percenttime = scope.currentoffset / timeline_width + 0.01;
          var percentminutes =
            (scope.currentoffset / timeline_width) * 12 + 0.01;
          var minutes = Math.round(percentminutes % 1) * 30;
          var hour = Math.floor(percenttime * 12);
          if (hour === 0) {
            hour = 12;
          }

          scope.selectedtime = hour + ":" + pad2(minutes);
          scope.$apply();
        };

        element.on("mousedown touchstart", function (event) {
          if (event.type == "mousedown") {
            scope.xinitial = event.clientX;
          } else if (event.type == "touchstart") {
            scope.xinitial = event.touches[0].clientX;
          }
          scope.moving = true;
          currenttime.css({
            transition: "none",
          });
        });

        angular.element($window).on("mousemove touchmove", function (event) {
          if (scope.moving === true) {
            if (event.type == "mousemove") {
              scope.offsetx = event.clientX - scope.xinitial;
            } else if (event.type == "touchmove") {
              scope.offsetx = event.touches[0].clientX - scope.xinitial;
            }
            var movex = scope.offsetx + scope.totaloffset;
            if (movex >= 0 && movex <= timeline_width) {
              currenttime.css({
                transform: "translateX(" + movex + "px)",
              });
              scope.currentoffset = movex;
            } else if (movex < 0) {
              currenttime.css({
                transform: "translateX(0)",
              });
              scope.currentoffset = 0;
            } else {
              currenttime.css({
                transform: "translateX(" + timeline_width + "px)",
              });
              scope.currentoffset = timeline_width;
            }
            scope.getTime();
          }
        });

        angular.element($window).on("mouseup touchend", function (event) {
          var sectionlength = timeline_width / 24;
          var roundsection = Math.round(scope.currentoffset / sectionlength);
          var newoffset = roundsection * sectionlength;
          currenttime.css({
            transition: "transform 0.25s ease",
            transform: "translateX(" + (newoffset - 1) + "px)",
          });
          scope.currentoffset = newoffset;
          scope.totaloffset = scope.currentoffset;
          window.setTimeout(function () {
            scope.getTime();
          }, 250);
          scope.moving = false;
        });
      },
    };
  });
  return (
    <>
      <div
        className="container"
        ng-app="timepicker"
        ng-controller="timeCtrl"
        ng-className="{'am': timeframe == 'am', 'pm': timeframe == 'pm' }"
      >
        <div
          className="timepicker-container-outer"
          selectedtime="time"
          timetravel
        >
          <div className="timepicker-container-inner">
            <div className="timeline-container">
              <div className="current-time">
                <div className="actual-time">{{ time }}</div>
              </div>
              <div className="timeline"></div>
              <div className="hours-container">
                <div
                  className="hour-mark"
                  ng-repeat="hour in getHours() track by $index"
                ></div>
              </div>
            </div>
            <div className="display-time">
              {{ time }} {{ timeframe }}
            </div>
            <div className="am-pm-container">
              <div className="am-pm-button" ng-click="changetime('am')">
                am
              </div>
              <div className="am-pm-button" ng-click="changetime('pm')">
                pm
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="loading">Loading...</div>;
    </>
  );
}

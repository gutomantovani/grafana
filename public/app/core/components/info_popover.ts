///<reference path="../../headers/common.d.ts" />

import _ from 'lodash';
import $ from 'jquery';
import coreModule from 'app/core/core_module';
import Drop from 'tether-drop';

export function infoPopover() {
  return {
    restrict: 'E',
    template: '<i class="fa fa-info-circle"></i>',
    transclude: true,
    link: function(scope, elem, attrs, ctrl, transclude) {
      // var inputElem = elem.prev();
      // if (inputElem.length === 0) {
      //   console.log('Failed to find input element for popover');
      //   return;
      // }

      var offset = attrs.offset || '0 -10px';
      var position = attrs.position || 'right middle';
      var classes = 'drop-help drop-hide-out-of-bounds';
      var openOn = 'hover';

      elem.addClass('gf-form-help-icon');

      if (attrs.wide) {
        classes += ' drop-wide';
      }

      if (attrs.mode) {
        elem.addClass('gf-form-help-icon--' + attrs.mode);
      }

      transclude(function(clone, newScope) {
        var content = document.createElement("div");
        _.each(clone, (node) => {
          content.appendChild(node);
        });

        var drop = new Drop({
          target: elem[0],
          content: content,
          position: position,
          classes: classes,
          openOn: openOn,
          tetherOptions: {
            offset: offset
          }
        });

        scope.$on('$destroy', function() {
          drop.destroy();
        });

      });
    }
  };
}

coreModule.directive('infoPopover', infoPopover);

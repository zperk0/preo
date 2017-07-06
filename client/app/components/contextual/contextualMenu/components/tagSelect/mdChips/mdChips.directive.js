export default function mdChips(){
  "ngInject";
  return {
    restrict: 'E',
    require: 'mdChips', // Extends the original mdChips directive
    link: function (scope, element, attributes, mdChipsCtrl) {
      mdChipsCtrl.addOnBlur = true;
      mdChipsCtrl.configureAutocomplete = function(ctrl) {
        if (ctrl) {
          this.autocompleteCtrl = ctrl;

          ctrl.registerSelectedItemWatcher(angular.bind(this, function (item) {
            if (item) {
              // Only append the chip and reset the chip buffer if the max chips limit isn't reached.
              if (this.hasMaxChipsReached()) return;

              this.appendChip(item);
              this.resetChipBuffer();
            }
          }));

          this.$element.find('input')
              .on('focus',angular.bind(this, this.onInputFocus) )
              .on('blur', angular.bind(this, this.onInputBlur) );
        }
      };

      mdChipsCtrl.removeChipAndFocusInput = function (index) {
        this.removeChip(index);

        if (this.autocompleteCtrl) {
          // Always hide the autocomplete dropdown before focusing the autocomplete input.
          // Wait for the input to move horizontally, because the chip was removed.
          // This can lead to an incorrect dropdown position.
          this.autocompleteCtrl.hidden = true;
          this.$mdUtil.nextTick(this.onFocus.bind(this));
        } else {
          this.onFocus();
        }

      };

      mdChipsCtrl.shouldAddOnBlur = function() {

        // Update the custom ngModel validators from the chips component.
        this.validateModel();

        var chipBuffer = this.getChipBuffer().trim();
        var isModelValid = this.ngModelCtrl.$valid;
        var isAutocompleteShowing = this.autocompleteCtrl && !this.autocompleteCtrl.hidden;

        if (this.userInputNgModelCtrl) {
          isModelValid = isModelValid && this.userInputNgModelCtrl.$valid;
        }

        return this.addOnBlur && !this.requireMatch && chipBuffer && isModelValid && !isAutocompleteShowing;
      };

      mdChipsCtrl.onInputBlur = function () {
        this.inputHasFocus = false;

        if (this.shouldAddOnBlur()) {
          this.appendChip(this.getChipBuffer().trim());
          this.resetChipBuffer();
        }
      };
    }
  }
};
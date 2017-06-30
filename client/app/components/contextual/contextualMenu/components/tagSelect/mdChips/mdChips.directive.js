export default function mdChips(){
  "ngInject";
  return {
    restrict: 'E',
    require: 'mdChips', // Extends the original mdChips directive
    link: (scope, element, attributes, mdChipsCtrl) => {
      mdChipsCtrl.onInputBlur = function () {
        this.inputHasFocus = false;

        var chipBuffer = this.getChipBuffer();
        if (chipBuffer != "") {
            this.appendChip(chipBuffer);
            this.resetChipBuffer();
        }
      };
    }
  }
};
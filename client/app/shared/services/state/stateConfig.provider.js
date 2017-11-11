'use strict';

export default class StateConfig {

  static get UID(){
    return "StateConfig";
  }

  $get() {

    return {
      isChannel: this.isChannel
    }
  }

  constructor() {
    "ngInject";

    this.isChannel = window._PREO_DATA._IS_CHANNEL || false;
  }
}

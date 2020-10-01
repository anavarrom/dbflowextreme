import { Component, OnInit } from '@angular/core';

@Component({ template: `` })
export class CallbackComponent implements OnInit {

  constructor(/*private okta: OktaAuthService*/) {}

  ngOnInit() {
    // Handles the response from Okta and parses tokens
    // this.okta.handleAuthentication();
  }
}
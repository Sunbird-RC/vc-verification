import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-verify-module',
  template: `
    <p>
      verify-module works!
    </p>
  `,
  styles: [
  ]
})
export class VerifyModuleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    alert('hi this Vc Verify Lib');
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: []
})
export class BreadcrumbComponent implements OnDestroy {
  public title;
  public titleSub$: Subscription;

  constructor( private _router: Router ) { 
    console.log(_router)
    this.titleSub$ = this.getArgumentsPath().subscribe(({ title }) => {
      this.title = title;
      document.title = 'AdminPro - ' + title;
    });
  }

  ngOnDestroy() {
    this.titleSub$.unsubscribe();
  }

  getArgumentsPath() {
    return this._router.events.pipe(
      filter( event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    )
  }

}

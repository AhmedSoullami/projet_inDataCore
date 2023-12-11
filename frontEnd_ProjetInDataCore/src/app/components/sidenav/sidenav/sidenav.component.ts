import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  private collapsedSubject = new BehaviorSubject<boolean>(false);
  collapsed$ = this.collapsedSubject.asObservable();

  sidenavWidth$: Observable<string> = this.collapsed$.pipe(
    map((collapsed) => (collapsed ? '0px' : '250px'))
  );

  toggleCollapsed() {
   
    this.collapsedSubject.next(!this.collapsedSubject.value);
  }
}

import { Component, Input, ViewChild, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnChanges{
  @ViewChild('popover') popover;
  @Input() path!: string;

  breadcrumbItems: string[]= [];
  isOpen = false;
  collapsedBreadcrumbs: HTMLIonBreadcrumbElement[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.formatRoutes(changes.path.currentValue);
  }

  async presentPopover(e: Event) {
    this.collapsedBreadcrumbs = (e as CustomEvent).detail.collapsedBreadcrumbs;
    this.popover.event = e;
    this.isOpen = true;
  }

  formatRoutes(path: string){
    if(path === undefined) {return;};
    this.breadcrumbItems = path.split('_');
  }

}

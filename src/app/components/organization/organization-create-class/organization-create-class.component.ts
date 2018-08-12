import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ClassGroup} from '../../../model/classgroup';
import {UUID} from 'angular2-uuid';
declare var $: any;
@Component({
  selector: 'app-organization-create-class',
  templateUrl: './organization-create-class.component.html',
  styleUrls: ['./organization-create-class.component.css']
})
export class OrganizationCreateClassComponent implements OnInit {
  @Output() createClass = new EventEmitter<any>();
  @Output() close = new EventEmitter();
  addClass: ClassGroup = new ClassGroup();
  constructor() { }
  ngOnInit() {
      this.init();
  }
  onSubmit() {
    this.createClass.emit(this.addClass);
    this.init();
  }
  cancel() {
    this.close.emit();
    this.init();
  }
  init() {
    this.addClass = new ClassGroup();
    this.addClass.hasGroups = true;
    this.addClass.isActivity = true;
    this.addClass.groups = [];
    this.addClass.classId = UUID.UUID();
  }
}

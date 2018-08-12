import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from '../../../model/group';
import {ClassGroup} from '../../../model/classgroup';
import {UUID} from 'angular2-uuid';
@Component({
  selector: 'app-organization-create-group',
  templateUrl: './organization-create-group.component.html',
  styleUrls: ['./organization-create-group.component.css']
})
export class OrganizationCreateGroupComponent implements OnInit {
@Output() updateGroup = new EventEmitter<any>();
@Output() close = new EventEmitter();
@Input() classes: ClassGroup[];
addGroup: Group = new Group();
selectedClassGroup: ClassGroup = new ClassGroup();
groupId = '';
  constructor() { }

  ngOnInit() {
    this.init();
  }
  onSubmit() {
    this.groupId = UUID.UUID();
    this.updateGroup.emit({'classID': this.selectedClassGroup.classId, group: {'groupName': this.addGroup.groupName, 'groupId': this.groupId}});
    this.cancel();
    this.init();
  }
  cancel() {
    this.init();
  }
  onSelectClassGroup(classGroup: ClassGroup) {
    this.selectedClassGroup = classGroup;
  }
  filterItemsOfType(type) {
    if (this.classes) {
      return this.classes.filter(x => x.hasGroups === type);
    } else {
      return;
    }
  }
  init() {
    this.addGroup = new Group();
  }


}

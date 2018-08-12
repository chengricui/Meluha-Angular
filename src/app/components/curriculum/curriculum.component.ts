import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from '../../model/subject';
import {Chapter} from "../../model/chapter";

interface Board {
  name: string;
  code: string;
}
interface GroupClass {
  name: string;
  code: string;
}
interface Group {
  name: string;
  code: string;
}
@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CurriculumComponent implements OnInit {
  editSubjects: Subject[] = [];
  newSubject: Subject = new Subject();
  boards: Board[];
  groupClasses: GroupClass[];
  groups: Group[];
  chapters: Chapter[];
  editChapters: Chapter[] = [];
  newChapter: Chapter = new Chapter();
  selectedSubject: Subject =  new Subject();
  selectedBoard: Board;
  selectedClass: GroupClass;
  selectedGroup: Group;
  subjectName: string;
  chapterName = 'Chapter';
  board_Name = '';
  groupClass_Name = '';
  group_Name = '';
  i = 0;
  A: number [] = [];
  showCreatedSubject = false;
  inVisibleEditChapter = false;
  clickableAddChapterButton = false;
  constructor() {
    this.boards = [
      {name: 'CBSE', code: 'CB'},
      {name: 'Cambridge', code: 'CA'},
      {name: 'STATE', code: 'SA'},
      {name: 'ICSE', code: 'IS'},
    ];
    this.groupClasses = [
      {name: 'Class 1', code: '1'},
      {name: 'Class 2', code: '2'},
      {name: 'Class 3', code: '3'},
      {name: 'Class 4', code: '4'},
      {name: 'Class 5', code: '5'},
    ];
    this.groups = [
      {name: 'MPC', code: 'MP'},
      {name: 'BiPC', code: 'BI'},
      {name: 'CEC', code: 'CE'},
      {name: 'MEC', code: 'MP'},
    ];
  }

  ngOnInit() {
    this.clickableAddChapterButton = false;
    this.inVisibleEditChapter = false;
  }
  saveSubject() {
    if (this.editSubjects.length > 0) {
      this.inVisibleEditChapter = true;
    } else {
      return;
    }
  }
  addSubject() {
    this.newSubject = new Subject();
    this.showCreatedSubject = true;
    this.newSubject.name = this.subjectName;
    this.subjectName = '';
    this.editSubjects.push(this.newSubject);
    console.log(this.editSubjects);
  }
  onSelectSubject(subject: Subject) {
    console.log(subject);
  //  coming soon selected subject object and cane integration with api
  }
  onSelectSubjectItem(name) {
    console.log('selected subjectName' + name);
  }
  addChapter() {
    this.i++;
    this.newChapter = new Chapter();
    this.newChapter.name = this.chapterName.toString() + this.i.toString();
    this.editChapters.push(this.newChapter);
    let limit = 0;
    if (this.editChapters.length % 4) {
      limit = Math.floor(this.editChapters.length / 4 + 1);
    } else {
      limit = this.editChapters.length / 4;
    }
    this.A = [];
    for (let i = 0; i < limit; i++) {
      this.A.push(i);
    }
  }
}

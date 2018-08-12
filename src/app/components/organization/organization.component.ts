import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api/api.service';
import {Board} from '../../model/board';
import {ClassGroup} from '../../model/classgroup';
import {Group} from '../../model/group';
import * as _ from 'lodash';
import {UUID} from 'angular2-uuid';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  item = [];
  boards: Board[] = [];
  classes: ClassGroup[] = [];
  groups: Group[] = [];
  newClasses: ClassGroup[] = [];
  emptyBoard: Board = new Board();
  selectedBoard: Board = new Board();
  editableBoard: Board;
  editableClass: ClassGroup;
  enableEdit = false;
  showCreateBoard = false;
  showEditBoard = false;
  showCreateClass = false;
  showCreateGroup = false;
  showClassTable = false;
  showCreateSimpleClass = false;
  showEditGroupDialog = true;
  showDialog = false;
  showClass = false;
  showGroup = false;
  show = false;
  showTable = false;
  name: string;
  showEditGroup  =  false;
  groupName: string;
  showGroupList = false;
  editableGroup: string [] = [];
  A: number [] = [];
  organizationId = '1602e2f0-9800-11e8-892d-87714bb5c914';
  boardId = '';
  msgs: Message[] = [];
  selectedClassGroup: ClassGroup = new ClassGroup();
  constructor(private api: ApiService) {
  }
  ngOnInit() {
    // this.getBoards();
    this.boards = [];
    this.newClasses = [];
    this.enableEdit = false;
    this.editableBoard = new Board();
    this.showClassTable = false;
    this.classes = [];
    this.show = true;
    this.getBoards();
  }
  getBoards() {
    this.api.organization.gets().promise()
      .then(resp => {
        console.log('**********1');
        console.log(resp);
        let body = resp.body;
        let ifmatch = resp.headers.get('ifmatch');
        console.log(resp.headers.get('etag'));
        localStorage.setItem('etag',resp.headers.get('etag'));

        if (!body.Attributes) {
          this.boards = body.Item.boards;
          console.log('***********2');
          console.log(this.boards);
        }
      })
      .catch(e => {
        console.log('******** catch');
      });
    // this.api.organization.gets().promise()
    //   .then( resp => {
    //     console.log('**************2');
    //     console.log(resp);
    //     if (!resp.Attributes) {
    //       this.boards = resp.Item.boards;
    //     }
    //   })
    //   .catch( resp => {
    //     alert('Net Work Error!');
    //   });
  }
  onCreateBoard(board: Board) {
    board.boardId = UUID.UUID();
    console.log('new Uid:', board.boardId);
    this.validationCreateBoard(board);
  }
  validationCreateBoard(data) {
    let status = true;
    this.boards.forEach(b => {
      if (b.boardName === data.boardName) {
        const message = 'Duplicated "' + data.boardName + '"Name!';
        this.showMessage(false, message);
        status = false;
      }
    });
    if (status) {
      const message = 'Created"' + data.boardName + '" Board!';
      this.showMessage(true, message);
      this.boards.push(data);
      this.showCreateBoard = false;
      this.showClass = true;
    }
  }
  UpdateBoard(data: Board) {
    this.validationUpdateBoard(data);
  }
  validationUpdateBoard(data) {
    let status = true;
    this.boards.forEach(b => {
      if (b.boardName === data.boardName) {
        const message = 'Duplicated "' + data.boardName + '" Name!';
        this.showMessage(false, message);
        status = false;
      }
    });
    if (status) {
      const message = 'Updated "' + data.boardName + '" Board!';
      this.showMessage(true, message);
      this.editableBoard.boardName = data.boardName;
      this.editableBoard.boardCode = data.boardCode;
      this.showEditBoard = false;
    }
  }
  onSelectBoard(board) {
    this.editableBoard = board;
    this.boardId = this.editableBoard.boardId;
    console.log('board id', this.editableBoard.boardId);
    if (!this.editableBoard.classes) {
      console.log('class is null');
      this.classes = [];
    } else {
      console.log('class have data');
      this.classes = this.editableBoard.classes;
    }
    this.setClassColumn();
    this.enableEdit = true;
    this.showClass = true;
    this.showGroup = true;
    this.showGroupList = false;
    this.showClass = true;
    this.showClassTable = true;
    this.showGroupList = true;
  }
  DeleteBoard(data: Board) {
    this.showEditBoard = false;
    this.boards  = _.filter(this.boards, c => c.boardId !== this.editableBoard.boardId);
    const message = 'Deleted "' + this.editableBoard.boardName +  '" Board';
    this.showMessage(true, message);
    this.showClass = false;
    this.showGroup = false;
    this.enableEdit = false;
    this.showClass = false;
    this.showClassTable = false;
    this.showGroupList = false;
  }
  setClassColumn() {
    let limit = 0;
    if (this.classes.length % 3) {
      limit = Math.floor(this.classes.length / 3 + 1) ;
    } else {
      limit = this.classes.length / 3;
    }
    this.A = [];
    for (let i = 0; i < limit; i++) {
      this.A.push(i);
    }
  }
  onCreateClass(addClass) {
    if (!this.boardId) {
      const message = 'Please select the anyone Board!';
      this.showMessage(false, message);
      this.showCreateClass = false;
    } else {
      this.validationCreateClass(addClass);
    }
  }
  validationCreateClass(data) {
    let status = true;
    this.classes.forEach(b => {
      if (b.className === data.className) {
        const message = 'Duplicated "' + data.className + '" Name!';
        this.showMessage(false, message);
        status = false;
      }
    });
    if (status) {
      this.CreateClass(data);
      const message = 'Created "' + data.className + '" Class!';
      this.showMessage(true, message);
    }
  }
  CreateClass(addClass) {
    addClass.classId = UUID.UUID();
    this.showCreateClass = false;
    const inputClass = Object.assign({}, addClass);
    this.classes.push(inputClass);
    this.setClassColumn();
    this.showClassTable = true;
    this.refreshBoardTable(this.classes);
  }
  editClass(classGroup: ClassGroup) {
    this.editableClass = new ClassGroup();
    this.showCreateSimpleClass = true;
    this.editableClass = classGroup;
    this.showEditGroupDialog = true;
  }
  onDeleteSimpleClass(deletedClassGroup: ClassGroup) {
    console.log(deletedClassGroup);
    this.setClassColumn();
    this.classes  = _.filter(this.classes, c => c.classId !== deletedClassGroup.classId);
    const message = 'Deleted "' + deletedClassGroup.className + '"Class!';
    this.showMessage(true, message);
    this.refreshBoardTable(this.classes);
    this.showCreateSimpleClass = false;
  }
  onUpdateSimpleClass(updatedClassGroup: ClassGroup) {
    this.updateClass(updatedClassGroup);
    this.showCreateSimpleClass = false;
    this.refreshBoardTable(this.classes);
  }
  updateClass(updatedClassGroup) {
    for ( let i = 0; i < this.classes.length; i++) {
      if ( this.classes[i].classId === updatedClassGroup.classId) {
        let status = true;
        this.classes.forEach(b => {
          if (b.classId === updatedClassGroup.classId) {
            const message = 'Duplicated "' + updatedClassGroup.className + '" Name!';
            this.showMessage(false, message);
            status = false;
          }
        });
        if (status) {
          const message = 'Updated "' + updatedClassGroup.className +  '" Class!';
          this.showMessage(true, message);
          this.classes[i].className = updatedClassGroup.className;
          this.classes[i].isActivity = updatedClassGroup.isActivity;
          this.classes[i].hasGroups = updatedClassGroup.hasGroups;
        }
      }
    }
    this.refreshBoardTable(this.classes);
  }
  onCreateGroup(data: any) {
    this.createGroup(data);
  }
  createGroup(data: any) {
    for (let i = 0; i < this.classes.length; i ++ ) {
      if (this.classes[i].classId === data.classID) {
        let status  = true;
        this.classes[i].groups.forEach(b => {
          if (b.groupName === data.group.groupName) {
            const message = 'Duplicated "' + data.group.groupName + '" Name!';
            this.showMessage(false, message);
            status = false;
          }
        });
        if (status) {
          const message = 'Created "' + data.group.groupName + '" Group!';
          this.showMessage(true, message);
          const addGroup = Object.assign({}, data.group);
          this.classes[i].groups.push(addGroup);
        }
      }
    }
    this.showCreateGroup = false;
  }
  onUpdateGroup (group) {
    for (let i = 0; i < this.classes.length; i++ ) {
      if (this.classes[i].classId === this.selectedClassGroup.classId) {
        let status  = true;
        this.classes[i].groups.forEach(b => {
          if (b.groupName === group.groupName) {
            const message = 'Duplicated "' + group.groupName + '" Name!';
            this.showMessage(false, message);
            status = false;
          }
        });
        if (status) {
          this.classes[i].groups.forEach( c => {
            if ( c.groupId === group.groupId) {
              const message = 'Updated "' + group.groupName + '" Name!';
              this.showMessage(true, message);
              c.groupName = group.groupName;
            }
          });
        }
      }
    }
    this.showEditGroup = false;
  }
  onDeleteGroup(group: Group) {
    for (let i = 0; i < this.classes.length; i++ ) {
      if (this.classes[i].classId === this.selectedClassGroup.classId) {
        this.classes[i].groups = _.filter(this.classes[i].groups, g => g.groupId !== group.groupId);
        const message = 'Deleted "' + group.groupName + '" Group!';
        this.showMessage(true, message);
      }
    }
    this.showEditGroup = false;
  }
  showCreateBoardDialog() {
    this.emptyBoard = new Board();
    this.showCreateBoard = true;
  }
  showEditBoardDialog() {
    this.showEditBoard = true;
  }
  showClassDialog() {
    this.showCreateClass = true;
  }
  showGroupDialog() {
    this.showCreateGroup = true;
  }
  onCloseDialog() {
    this.showCreateBoard = false;
    this.showCreateClass = false;
    this.showCreateGroup = false;
    this.showEditBoard = false;
  }

  onClickGroup(classGroup: ClassGroup, group: Group) {
    this.selectedClassGroup = Object.assign({}, classGroup);
    this.editableGroup = Object.assign(group);
    this.showEditGroup = true;
  }
  saveAllData() {
    this.api.organization.put(this.boards).promise()
      .then( resp => {
        console.log('post------------->', resp);
        // let body = resp.body;
        let etag = resp.headers.get('etag');
        //
        // localStorage.setItem(If-Match, 'etag');
        console.log('------------->etag', etag);
        localStorage.setItem('etag',resp.headers.get('etag'));
        if (!resp.Attributes) {
          const message = 'Save Success!';
          this.showMessage(true, message);
        }
      }).catch( resp => {
      const message = 'Save Error!';
      this.showMessage(false, message);
    });
  }
  refreshBoardTable(data) {
    for (let i = 0; i < this.boards.length; i++) {
      if (this.boards[i].boardId === this.editableBoard.boardId) {
        this.boards[i].classes = data;
      }
    }
  }
  showMessage(isSuccess: boolean, message) {
    this.msgs = [];

    if (isSuccess) {
      this.msgs.push({
        severity: 'info',
        summary: 'Info',
        detail: message
      });
    } else {
      this.msgs.push({
        severity: 'error',
        summary: 'Error',
        detail: message
      });
    }
  }



}

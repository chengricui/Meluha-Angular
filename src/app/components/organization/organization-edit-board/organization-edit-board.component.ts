import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Board} from '../../../model/board';

@Component({
  selector: 'app-organization-edit-board',
  templateUrl: './organization-edit-board.component.html',
  styleUrls: ['./organization-edit-board.component.css']
})
export class OrganizationEditBoardComponent implements OnInit {
@Output() updateBoard = new EventEmitter<any>();
@Output() delete = new EventEmitter<any>();
@Input() newBoard: Board;
changedBoard: Board;
constructor() { }

  ngOnInit() {
    this.newBoard = new Board();
    this.changedBoard = Object.assign({}, this.newBoard);
  }
  ngOnChanges(changes: any) {
    if (changes.newBoard && changes.newBoard.currentValue) {
      this.changedBoard = Object.assign({}, this.newBoard);
    }
  }
  onSubmit() {
    // console.log(this.newBoard.boardName);
    this.updateBoard.emit(this.changedBoard);
  }
  deleteBoard() {
  this.delete.emit(this.changedBoard);
  }

}

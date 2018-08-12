import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Board} from '../../../model/board';

@Component({
  selector: 'app-organization-create-board',
  templateUrl: './organization-create-board.component.html',
  styleUrls: ['./organization-create-board.component.css']
})
export class OrganizationCreateBoardComponent implements OnInit {
  @Output() create = new EventEmitter<Board>();
  @Output() close = new EventEmitter();
  @Input() board: Board;
  constructor() { }

  ngOnInit() {
    console.log(this.board);
  }
  onSubmit() {
    this.create.emit(this.board);
  }
  cancel() {
    this.close.emit();
  }

}

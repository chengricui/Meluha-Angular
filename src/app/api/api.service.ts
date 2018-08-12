import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private request: ApiRequestService) {}
  organization = {
    gets: () => this.request
      .get()
      .url( '/v1/data/organization'),
    get: (organizationId, boardId) => this.request
      .get()
      .url('/api/v1/data/{}/board/{}', organizationId, boardId),
    post: (organizationId, board) => this.request
        .post({boardName: board.boardName, boardCode: board.boardCode})
        .url('/api/v1/data/{}/board', organizationId),
    put: (board) => this.request
      .put({boards: board})
      .url('/v1/data/organization/'),
    delete: (organizationId, boardId) => this.request
      .delete()
      .url('/api/v1/data/{}/board/{}', organizationId, boardId)
    };
  classgroup = {
    get: (organizationId, boardId) => this.request
      .get()
      .url('/api/v1/data/{}/board/{}/class', organizationId, boardId),
    post: (organizationId, boardId, postClass) => this.request
      .post({className: postClass.className, isActive: postClass.isActivity, hasGroups: postClass.hasGroups})
      .url('/api/v1/data/{}/board/{}/class', organizationId, boardId),
    put: (organizationId, boardId, putClass) => this.request
      .put({className: putClass.className, isActivity: putClass.isActivity, hasGroups: putClass.hasGroups})
      .url('/api/v1/data/{}/board/{}/class/{}', organizationId, boardId, putClass.classId),
    delete: (organizationId, boardId, classId) => this.request
      .delete()
      .url('/api/v1/data/{}/board/{}/class/{}', organizationId, boardId, classId)
  };
  group = {
    get: (organizationId, boardId, classId) => this.request
      .get()
      .url('/api/v1/data/{}/board/{}/class/{}' , organizationId, boardId, classId),
    post: (organizationId, boardId, classId, groupName) => this.request
      .post({groupName: groupName})
      .url('/api/v1/data/{}/board/{}/class/{}/group', organizationId, boardId, classId),
    put: (organizationId, boardId, classId, groupId, data) => this.request
      .put({groupName: data.groupName})
      .url('/api/v1/data/{}/board/{}/class/{}/group/{}', organizationId, boardId, classId, data[2]),
    delete: (organizationId, boardId, classId, groupId, data) => this.request
      .delete()
      .url('/api/v1/data/{}/board/{}/class/{}/group/{}', organizationId, boardId, classId, data[2])
  };
}

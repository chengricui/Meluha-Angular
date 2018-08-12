import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';
import {RoutesModule} from './routes/routes.module';
import { OrganizationComponent } from './components/organization/organization.component';
import { FeatureComponent } from './components/package/feature.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { BaseComponent } from './components/base/base.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {OrganizationCreateBoardComponent } from './components/organization/organization-create-board/organization-create-board.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {ApiService} from './api/api.service';
import {FormsModule} from '@angular/forms';
import { OrganizationCreateClassComponent } from './components/organization/organization-create-class/organization-create-class.component';
import {UiSwitchModule} from 'ngx-ui-switch';
import {OrganizationCreateGroupComponent } from './components/organization/organization-create-group/organization-create-group.component';
import {CurriculumComponent } from './components/curriculum/curriculum.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {DropdownModule} from 'primeng/primeng';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {AccordionModule} from 'primeng/primeng';
import { OrganizationEditBoardComponent } from './components/organization/organization-edit-board/organization-edit-board.component';
import { OrganizationCreatSimpleClassComponent } from './components/organization/organization-creat-simple-class/organization-creat-simple-class.component';
import { OrganizationEditGroupComponent } from './components/organization/organization-edit-group/organization-edit-group.component';
import {GrowlModule} from 'primeng/growl';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    OrganizationComponent,
    FeatureComponent,
    NavBarComponent,
    LeftMenuComponent,
    BaseComponent,
    OrganizationCreateBoardComponent,
    OrganizationCreateClassComponent,
    OrganizationCreateGroupComponent,
    CurriculumComponent,
    OrganizationEditBoardComponent,
    OrganizationCreatSimpleClassComponent,
    OrganizationEditGroupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutesModule,
    DialogModule,
    HttpClientModule,
    FormsModule,
    DropdownModule,
    NgbDropdownModule,
    UiSwitchModule.forRoot({
      size: 'small',
      color: '#5CC25A',
      switchColor: '#ffffff',
      defaultBgColor: '#DF3B3A',
      defaultBoColor : '#DCDCDC',
    }),
    NgbModule.forRoot(),
    MDBBootstrapModule,
    GrowlModule,
    AccordionModule,
    HttpModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }

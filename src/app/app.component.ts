import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showContent = false;
  showPackage = false;
  showOrganization = true;
  showCurri = false;
  ngOnInit() {
    this.showOrganization = true;
  }
  ChangeView(clickedButton) {
    if (clickedButton === 'Organization') {
      this.showOrganization = true;
      this.showContent = false;
      this.showPackage = false;
      this.showCurri = false;
    } else if (clickedButton === 'Content') {
      this.showOrganization = false;
      this.showContent = true;
      this.showPackage = false;
      this.showCurri = false;
    } else if (clickedButton === 'Package') {
      this.showOrganization = false;
      this.showContent = false;
      this.showPackage = true;
      this.showCurri = false;
    } else if (clickedButton === 'Curriculum') {
      this.showOrganization = false;
      this.showContent = false;
      this.showPackage = false;
      this.showCurri = true;
    }
  }
}

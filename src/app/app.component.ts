import { Component, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AccuWeatherApp';
  public screenSize;
  public smScreen: boolean = false;
  public mdScreen: boolean = false;
  public lgScreen: boolean = false;
  display: boolean;

  ngOnInit(): void {
    this.determineScreenSize();
  }

  determineScreenSize() {
    this.screenSize = window.screen.width
    if (this.screenSize <= 576) {
      this.smScreen = true;
    } else if (this.screenSize <= 768) {
      this.mdScreen = true;
    } else if (this.screenSize >= 991) {
      this.lgScreen = true;
    }
  }
}

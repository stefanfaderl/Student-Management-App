import { Component, OnInit } from '@angular/core';
import { AuthService } from './components/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'Student-Management-App';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.autoLogin();
  }

}

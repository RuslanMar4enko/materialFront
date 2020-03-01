import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
  }

  public ifAuth(): boolean {
    return this.loginService.isAuthenticated();
  }

}

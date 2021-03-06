import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthInterceptor} from '../../interceptors/auth.interceptor';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})

export class LoginComponent implements OnInit {
  
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
    
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  submit() {
    this.http.post('http://192.168.15.65:8000/api/login', this.form.getRawValue())
      .subscribe((res: any) => {
        AuthInterceptor.accessToken = res.token;
        mode: 'cors';
        credentials: 'include';

        this.router.navigate(['/']);
        
      });
      
  }
  
}

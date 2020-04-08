import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  insertForm: FormGroup;
  emailAddress : FormControl;
  username: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  errorList : string[];
  isLoading : boolean;
  errorMessage: string;
  invalidRegister: boolean;

  constructor(
    private acct : AccountService, 
    private router : Router,
    private formBuilder : FormBuilder,
    private notfi : NotificationService          
  ) {}

  ngOnInit() {
    this.emailAddress = new FormControl('', [Validators.required, Validators.email])
    this.username = new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(5)])
    this.password = new FormControl('', [Validators.required, Validators.minLength(5), this.hasUpper(), this.hasLower(), this.hasNumeric(), this.hasSpecial()])
    this.confirmPassword = new FormControl('', [Validators.required, this.isMatch(this.password)])  
    this.errorList = [];

     // Initialize FormGroup using FormBuilder
    this.insertForm = this.formBuilder.group({
      'emailAddress' : this.emailAddress,
      'username' : this.username,
      'password' : this.password,
      'confirmPassword' : this.confirmPassword   
    });
  }

  showError(){
    console.log(this.username.errors);
    console.log(this.username.errors?.minLength);
  }

  onSubmit()
  {
    let userReg = this.insertForm.value;
    this.isLoading = true;

    this.acct.register(userReg.username, userReg.password, userReg.emailAddress).subscribe(
      result => {
        this.invalidRegister = false;

        console.log('Register Successfully');
        this.router.navigate(['/login']);
        this.notfi.showSuccess('Account has been registered', 'Registration');
      },
      error => {
        this.isLoading = false;
        this.invalidRegister = true;

        console.log(userReg.username + userReg.password + userReg.emailAddress);
        
        this.errorList = [];

        for(var i = 0; i < error.error.value.length; i++) 
        {
          this.errorList.push(error.error.value[i]);
        }
        
        console.log(this.errorList);
        this.errorMessage = error.error.value[0];
      }
    );

  }

  hasUpper(): ValidatorFn 
  {
    return (passwordControl: AbstractControl): {[key: string]: boolean} | null => {

      if(passwordControl.value.length == ''){
        return null;
      }

      var reg = new RegExp('(?=.*[A-Z])');
      if(!reg.test(passwordControl.value)){
        return {'noUpper': true};
      }
      else{
        return null;
      }
    }
  }

  hasLower(): ValidatorFn 
  {
    return (passwordControl: AbstractControl): {[key: string]: boolean} | null => {

      if(passwordControl.value.length == ''){
        return null;
      }

      var reg = new RegExp('(?=.*[a-z])');
      if(!reg.test(passwordControl.value)){
        return {'noLower': true};
      }
      else{
        return null;
      }
    }
  }

  hasNumeric(): ValidatorFn 
  {
    return (passwordControl: AbstractControl): {[key: string]: boolean} | null => {

      if(passwordControl.value.length == ''){
        return null;
      }

      var reg = new RegExp('(?=.*[0-9])');
      if(!reg.test(passwordControl.value)){
        return {'noNumeric': true};
      }
      else{
        return null;
      }
    }
  }

  hasSpecial(): ValidatorFn 
  {
    return (passwordControl: AbstractControl): {[key: string]: boolean} | null => {

      if(passwordControl.value.length == ''){
        return null;
      }

      var reg = new RegExp('(?=.*[!@#$%^&*])');
      if(!reg.test(passwordControl.value)){
        return {'noSpecial': true};
      }
      else{
        return null;
      }
    }
  }

  isMatch(passwordControl : AbstractControl) : ValidatorFn
  {
    return (confirmPasswordControl : AbstractControl) : {[key: string] : boolean} | null =>
    {
      if(!passwordControl && !confirmPasswordControl){
        return null;
      }
      
      if(confirmPasswordControl && !passwordControl){
        return null;
      }

      if(passwordControl.value !== confirmPasswordControl.value){
        return {'noMatch': true};
      }
      else{
        return null;
      }
    }
  }

}

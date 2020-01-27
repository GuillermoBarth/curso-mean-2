import { Component, OnInit } from '@angular/core';
import { User } from './models/User'
import { GLOBAL } from './services/global';
import { UserService } from './services/user.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Router, ActivatedRoute, Params } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit {
  public title = 'musify';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public url:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService:UserService
  ){
    
    this.user = new User('','','','','','ROLE_USER','');
    this.user_register = new User('','','','','','ROLE_USER','');
    this.url = GLOBAL.url;

  }


  public onSubmit(){
    console.log(this.user);

    //Conseguir los datos del ususario logueado
    this._userService.signup(this.user).subscribe(
        response => {
          let identity = response.user;
          this.identity  = identity;
          if(!this.identity._id){
              alert("El ususario no esta correctamente identificado");
          }else{
            //crear elelemneto en localStorage

            localStorage.setItem('identity', JSON.stringify(identity));
            //consegir el token para enviarselo a cada peticion http
                  this._userService.signup(this.user, 'true').subscribe(
                    response => {
                      let token = response.token;
                      this.token  = token;
                      if(this.token.length <= 1){
                          alert("El token no se a generado correctamente");
                      }else{
                        //crear elelemneto en localStorage para el token disponible
                        localStorage.setItem('token', token);
                        //consegir el token para enviarselo a cada peticion http
                        this.user = new User('','','','','','ROLE_USER','');
            
                      }
                      console.log(response);
                    },
            
                    error =>{
                        var errorMessage =<any>error;
            
                        if(errorMessage!=null){
                          var body = JSON.parse(error._body);
                          this.errorMessage = body.message;
                          console.log(error);
                        }
            
                    }
            
                );



          }
          console.log(response);
        },

        error =>{
            var errorMessage =<any>error;

            if(errorMessage!=null){
              var body = JSON.parse(error._body);
              this.errorMessage = body.message;
              console.log(error);
            }

        }

    );
  }


 ngOnInit(){
    this.identity= this._userService.getIdentity();
    this.token=this._userService.getToken();

    console.log(this.identity);
    console.log(this.token);
  }


  
  onSubmintRegister(){
    console.log(this.user_register);
    this._userService.register(this.user_register).subscribe(
      response=>{
        let user=response.user;
        this.user_register = user;

        if(!user._id){
          this.alertRegister ='Error al registrarse';
        }else{
          this.alertRegister ='El rgistro se a realizado correctamente identificaté con '+this.user_register.email;
          this.user_register = new User('','','','','','ROLE_USER','');
        }

      },

      error =>{
        var alertRegister =<any>error;

        if(alertRegister!=null){
          var body = JSON.parse(error._body);
          this.alertRegister = body.message;
          console.log(error);
        }

      }
    );
  }



  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    this.identity=null;
    this.token= null;
    this._router.navigate(['/']);

  }
}

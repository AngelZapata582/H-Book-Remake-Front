<template>

    <div class="background ">
       <br>
       <div>
        <div className="container-fluid bg">
    <div className="row align-items-center vh-100">
        <div className="col-lg-6 text-center">
         <img  src="../../assets/logo/logo.png" class="card-img-top w-50"  >
        </div>
   
       
  
        <div className="col-lg-5 px-5 letras">
            <form @submit.prevent="registro" >
                <div className="mb-3 text-start">
                    <label  className="form-label py-2">Ingrese su nombre:</label>
                    <input type="name" name="name" v-model="name" className="form-control rounded-pill" id="user"  />

                </div>
                <div className="mb-3 text-start ">
                    <label  className="form-label py-2">Ingrese su correo:</label>
                    <input type="email" v-model="email" name="email" className="form-control rounded-pill" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 text-start ">
                    <label  className="form-label py-2 letras">Ingrese contraseña:</label>
                    <input type="password" name="password" v-model="password"  className="form-control rounded-pill" id="password"/>
                </div>

                <div className="d-grid gap-2 col-6 mx-auto py-2">
                <button type="submit" className="btn btn-primary text-center rounded-pill">Registrarme</button>

                </div>
                <div className="text col-1 mx-auto py-2">
                  <a href="/registro" className="card-link">Iniciar</a>
                  </div>
            </form>
        </div>
    </div>
       </div>
</div>
       </div>
       
    
        
    </template>
    
    
    
    <style>
    
    .animate__animated.animate__bounceInDown {
      --animate-duration: 2s;
    }
    
    .background {
        background-color:black;
        background-size: cover;
        background-repeat: no-repeat;
    }
    
    .link{
        text-decoration: none;
    }

    .logo{
   
    height: 220px;
    margin-left: auto; 
    
    margin-right: auto;
    }
    .letras{
     color: #ffff;
    }
    .color 
    {
       background-color:aqua ;
       color: #ffff;
    }
    .deco {
       text-decoration: underline;
    }
    </style>
    
    <script>
import url from '../../../enviroment.js'
import Swal from 'sweetalert2'
import axios from "axios";
export default {
    
    data(){
        return {
         name:"",
         email:"",
         password:""
        }
    },
    methods:{
       
        async registro(){
           console.log(this.user)
            await axios.post(url+'register',{
               name:this.name,
               email:this.email,
               password:this.password,
               rol:"user"
            }).then(response=>{
               console.log(response.data.status)
               if(response.data.status){
                  Swal.fire(
                     'Registro completado',
                     '',
                     'success'
                  )
                  this.$router.push('/login')
               }
               else{
                  Swal.fire(
                     'Registro fallido',
                     '',
                     'error'
                  )
               }
            }).catch(error=>{
               console.log(error)
               Swal.fire(
                     'Correo ya registrado',
                     '',
                     'error'
                  )
            })
        },
    }
}
    </script>
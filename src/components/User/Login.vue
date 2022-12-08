<template>

   <div class="background ">
      <br>
      <div>
       <div className="container-fluid bg">
   <div className="row align-items-center vh-100">
       <div className="col-lg-6 float-center text-center">
        <img  src="../../assets/logo/logo.png" class=" img-fluid w-50"   >
       </div>
  
      
 
       <div className="col-lg-5 px-5 letras">
           <form @submit.prevent="login">
               <div className="mb-3 text-start">
                   <label  className="form-label py-2">Ingrese su correo:</label>
                   <input type="email" name="email"  v-model="email" className="form-control rounded-pill" id="exampleInputEmail1" aria-describedby="emailHelp" />

               </div>
               <div className="mb-3 text-start ">
                   <label  className="form-label py-2 letras">Ingrese su contraseña:</label>
                   <input type="password" name="password" v-model="password"  className="form-control rounded-pill" id="password"/>
               </div>

               <div className="d-grid gap-2 col-6 mx-auto py-2">
               <button type="submit" className="btn btn-primary text-center rounded-pill">Iniciar</button>

               </div>
               <div className="text col-2 mx-auto py-2">
                 <a href="/registro" className="card-link text-center">Registrarme</a>
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
    width: 100px;
   height: 100px; 
   
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
import VueCookies from 'vue-cookies'
export default {
   
   data(){
       return {
           user:{},
           email:"",
           password:""
       }
   },
   methods:{

     async login(){
           
           await axios.post(url+'login',{
              email:this.email,
              password:this.password
           }).then(response=>{
                 if(response.data.status){
                    VueCookies.set('name',response.data.name)
                    VueCookies.set('token',response.data.token) 
                    Swal.fire(
                       'Bienvenido a H-books',
                       '',
                       'success'
                    )
                    window.location.reload()
                    //this.$router.push({path:'/home'})
                //mandar al login
              }
              else{
                 Swal.fire(
                       'Algo salio mal',
                       'Vuelva intentarlo mas tarde',
                       'error'
                    )
              }
           }).catch(error=>{
              console.log(error)
              Swal.fire(
                       'Correo o contraseña incorrecto',
                       '',
                       'error'
              )
           })
       },
   }
}
</script>
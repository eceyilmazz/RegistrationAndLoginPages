import React from 'react';
import "../App.css";
import { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Header from "components/headers/light.js";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export default function Register() {

    const [id, setid] = useState("");
    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPass, setconfirmPass] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState();
    const [city, setcity] = useState("istanbul");
    const [address, setaddress] = useState("");
    const [tckn, settckn] = useState("");


    const navigate= useNavigate();

    const isValidate = (e) => {
        let isProceed = true;
        let errorMessage = "Lütfen şu alanı doldurun : ";
        if(id === null || id===''){
            isProceed=false;
            errorMessage += " Kullanıcı Adı ";
        }
        if(name === null || name===''){
            isProceed=false;
            errorMessage += " Ad -Soyad ";
        }
        if(password === null || password===''){
            isProceed=false;
            errorMessage += " Şifre ";
        }
        if(email === null || email===''){
            isProceed=false;
            errorMessage += " E-posta ";
        }
        if(phone === null || phone==='' || phone === undefined){
            isProceed=false;
            errorMessage += " Telefon numarası ";
        }
        if(city === null || city===''){
            isProceed=false;
            errorMessage += " Şehir ";
        }
        if(confirmPass === null || confirmPass===''){
            isProceed=false;
            errorMessage += " Şifre doğrulama ";
        }
        if(tckn === null || tckn===''){
            isProceed=false;
            errorMessage += " T.C No ";
        }
       
        

        if(!isProceed){ // Eğer yukarıdaki değerler boşsa isProceed false olacağından if(!true) ise error mesajı çıkar:
            toast.warning(errorMessage);
        }else{ // Yukarıdaki alanlar doluysa bu sefer diğer kontroller yapılır: 

            
            if(!(password === confirmPass)){
                isProceed=false;
                toast.error("Şifreler uyuşmuyor !");
            }
            if(!(/^[0-9]+$/.test(tckn))){
                isProceed=false;
                toast.error("T.C No rakamlardan oluşmalı !");
            }
            if(!(tckn.length === 11)){
                isProceed=false;
                toast.error("Geçersiz T.C No girildi. 11 hane olmalı !");
            }
            if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))){
                //!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))    
                    isProceed=false;
                    toast.error("Geçerli e-posta giriniz. deneme@deneme.deneme");
            }
            if(!(phone.length === 13)){
                isProceed=false;
                toast.error("Telefon numarası 11 haneli olmalı !");
            }

        }
  
        return isProceed; 
    } 


    const handleSubmit = (e) => {
        e.preventDefault();
        const uye = {id, name, password, email, phone, city, address, tckn};
        if(isValidate()){ 
            axios.post("http://localhost:3001/user",uye)
                .then((res) => {
                    toast.success("Kayıt Başarılı")
                    navigate('/login');

                })
                .cath((err) => {
                    toast.warning("Kayıt başarısız !" + err.message);

                });
        }
    }

  return (
    <div className='register'>
        <Header/>
        <div className='offset-lg-3 col-lg-6'>
            <form className='container' onSubmit={handleSubmit}>
                <div className='card'>
                    <div className='card-header'>
                        <h1> Üye Kayıt Formu</h1>

                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label>Kullanıcı Adı <span className='errmsg'>*</span></label>
                                    <input value={id} onChange={e=>setid(e.target.value)} type="text" placeholder='ylzece' className='form-control' />

                                </div>

                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label>Şifre<span className='errmsg'>*</span></label>
                                    <input value={password} onChange={e=>setpassword(e.target.value)} type="password" placeholder='****' className='form-control' />

                                </div>

                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label>Ad - Soyad <span className='errmsg'>*</span></label>
                                    <input value={name} onChange={e=>setname(e.target.value)} type="text" placeholder='Ece Yılmaz' className='form-control' />

                                </div>

                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label>Şifre Doğrulama<span className='errmsg'>*</span></label>
                                    <input value={confirmPass} onChange={e=>setconfirmPass(e.target.value)} type="password" placeholder='****' className='form-control' />

                                </div>

                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label>T.C No<span className='errmsg'>*</span></label>
                                    <input value={tckn} onChange={e=>settckn(e.target.value)} type="text" placeholder='------' className='form-control' />

                                </div>

                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label>E-posta<span className='errmsg'>*</span></label>
                                    <input value={email} onChange={e=>setemail(e.target.value)} type="text" placeholder='deneme@deneme.com' className='form-control' />

                                </div>

                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label>Telefon Numarası <span className='errmsg'>*</span></label>
                                    {/* <input value={phone} onChange={e=>setphone(e.target.value)} placeholder='90 ___ ___ __ __' className='form-control' /> */}

                                        <PhoneInput
                                            international
                                            countryCallingCodeEditable={false}
                                            placeholder="telefon numarasını giriniz"
                                            defaultCountry='TR'
                                            value={phone}
                                            onChange={setphone}/>

                                </div>

                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label>Şehir<span className='errmsg'>*</span></label>
                                    <select value={city} onChange={e=>setcity(e.target.value)} className='form-control'>
                                        <option value="istanbul" key="istanbul">İstanbul</option>
                                        <option value="ankara" key="ankara">Ankara</option>
                                        <option value="izmir" key="izmir">İzmir</option>
                                    </select>

                                </div>

                            </div>
                            <div className='col-lg-6'>
                                <div className='form-group'>
                                    <label>Adres</label>
                                    <textarea value={address} onChange={e=>setaddress(e.target.value)} className='form-control'></textarea>

                                </div>

                            </div>
                            

                        </div>
                        

                    </div>
                    <div className='card-footer'>
                        <button type='submit' className='btn btn-outline-primary'>Kayıt Ol</button> | 
                        <a href="/" className='btn btn-outline-danger'>Ana Sayfa</a>

                    </div>

                </div>

            </form>

        </div>
      
    </div>
  )
}

import React from 'react'
import { useState } from 'react'
import "../App.css";
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from "components/headers/light.js";

export default function LoginPage() {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [tckn, settckn] = useState("");
    const [remember, setremember] = useState(false);

    const navigate= useNavigate();

    const validate = () => {
        let result = true;

        if(email === null || email===''){
            result=false;
            toast.warning("Lütfen E-POSTA giriniz !");
        }
        if(password === null || password===''){
            result=false;
            toast.warning("Lütfen ŞİFRE giriniz !");
        }
        if(tckn === null || tckn===''){
            result=false;
            toast.warning("Lütfen T.C No giriniz !");
        }
        return result;
    }

    const ProceedLogin = (e) => {
        e.preventDefault();
        const flak =false;
        if(validate()){
            axios("http://localhost:3001/user?email="+email)
            .then((res) => {
                if(!(Object.keys(res.data).length === 0)){   
                    for (let i = 0; i < (res.data).length; i++) {
                        if(res.data[i].tckn === tckn){
                            if(res.data[i].password === password){
                                toast.success("Giriş Başarılı")
                                navigate('/');
                            }else{
                                toast.error("Yanlış Şifre !");
                                console.log(res.data[i]);
                            }
                            flak = true;
                            break;
                        }
                    }
                    if(!flak){
                        toast.error("E-posta ve T.C No Eşleşmiyor !");
                    }
                }else{
                    toast.error("Kullanıcı Bulunamadı! Var olmayan E-posta adresi girildi !");
                }
            })
            .cath((err) => {
                toast.error("Giriş başarısız !" + err.message)
            });
        }
    }
  return (
    <div className='giris'>
        <Header/>
        <div className='offset-lg-3 col-lg-6'>
            <form onSubmit={ProceedLogin} className='container'>
                <div className='card'>
                    <div className='card-header'>
                        <h2>Kullanıcı Girişi</h2>
                    </div>
                    <div className='card-body'>
                        <div className='form-group'>
                            <label>E-posta </label>
                            <input value={email}  onChange={e=>setemail(e.target.value)} type="text" className='form-control' />
                        </div>
                        <div className='form-group'>
                            <label>T.C No </label>
                            <input value={tckn} onChange={e=>settckn(e.target.value)} type="text" className='form-control' />
                        </div>
                        <div className='form-group'>
                            <label>Şifre </label>
                            <input value={password} onChange={e=>setpassword(e.target.value)} type="password" className='form-control' />
                        </div>
                        <div className='form-group'>
                            <label>
                                <input value={remember} onChange={e=>setremember(e.target.value)} type="checkbox" name='remember'/> Beni Hatırla
                            </label> 
                        </div>
                        <div className='form-group'>
                            <label>
                                <input  type="checkbox" name='forgot'/> Şifremi Unuttum
                            </label>    
                        </div>
                    </div>
                    <div className='card-footer'>
                        <button type='submit' className='btn btn-outline-primary'>Giriş</button> | 
                        <a href="/register" className='btn btn-outline-danger'>Kayıt</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

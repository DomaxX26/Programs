import React from 'react';
import {userSchema} from '../Validations/RegisterValidation';

export const Register = () => {
    const registerUser = async (event) => {
        event.preventDefault();
        
        let formData ={
            name: event.target[0].value,
            email: event.target[1].value,
            password: event.target[2].value,
        };
        console.log(formData);
    };



    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Registrar nou usuari</h1>
                        <h4 className="text-danger" id="missatgeError"></h4>
                        <form onSubmit={registerUser}>
                            <div className="form-group text-start my-4">
                                <label htmlFor="nom">Nom</label>
                                <input type="text" className="form-control" id="nom" name="nom" placeholder="Introduir nom"/>
                            </div>
                            <div className="form-group text-start my-4">
                                <label htmlFor="email">Correu electrònic</label>
                                <input type="email" className="form-control" id="email" name="email" placeholder="Introduir email"/>
                            </div>
                            <div className="form-group text-start my-4">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="password">Contrasenya</label>
                                        <input type="password" className="form-control" id="password" name="password" placeholder="Contrasenya"/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="passwordc">Repetir contrasenya</label>
                                        <input type="password" className="form-control" id="passwordc" name="passwordc" placeholder=" Repetir contrasenya"/>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" id="enviar" className="mt-2 btn btn-primary">Registrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

// // passwordc: Yup.string()
// .min(6, 'Too Short!')
// .max(20, 'Too Long!')
// .oneOf([Yup.ref('password'), null], "Passwords don't match!")
// .required('Required'),

export default Register;

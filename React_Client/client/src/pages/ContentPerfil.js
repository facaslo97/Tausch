import React, {useState,useEffect} from "react";
import NavBarPerfil from "../components/NavBar/NavBarPerfil";
import { FaFacebook, FaInstagramSquare, FaTwitter, FaUserEdit, FaEdit, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ContentPerfil () {
    //Estado para saber si el usuario se autentico
    //Este estado solo se cambia si el usuario tiene token valida
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [userEmail, setUserEmail]=useState(null);
    const [datos, setDatos] = useState({});
    const [productOptions, setProductOptions]=useState([{}])
    //Estado para saber si el usuario actual es el propietario del perfil o no
    const [propietario, setPropietario] = useState(false);

    //Verificar si la token esta activa Con la funcion authorization
    //Y asi saber si hay alguien loggeado y extraer el correo de esa persona
    async function isAuth(emailDueñoPublicacion){
        try{
            const response = await fetch("http://localhost:3080/authentication/is-verify",
            {
                method:"GET",
                headers:{token: localStorage.token}
            });

            //Retorna True si se tiene token valida
            const parseRes = await response.json();

            //Si es true, es que hay una token activa, entonces esta autenticado
            parseRes === true ? setisAuthenticated(true) : setisAuthenticated(false);
            
            if (parseRes == true){
                //Si hay alguien autenticado,
                //entonces buscar su nombre_de_usuario
                const userData = await fetch("http://localhost:3080/authentication/getProfileInfo",
                {
                    method:"GET",
                    headers:{token: localStorage.token}
                });

                const userDataJson = await userData.json();
                setDatos(userDataJson[0]);
                if(emailDueñoPublicacion == userDataJson[0].email){
                    setPropietario(true);
                }
            }
        } catch(err){
            console.error(err.message);
        }
    }


    const requestPublicationsList= async() => {
        const url = "http://localhost:3080/user-posts";
        return await fetch(url,{            
            method : 'GET',
            headers:{token: localStorage.token}           
        })
        .then((response) => response.json()).catch(error=> console.log(error));
        
    };

    useEffect(() => {
        (async () => {
            isAuth();
            let respuesta = await requestPublicationsList();
            let publications=[]
            for (const pub of respuesta.posts){
                publications.push(pub)
            }
            setProductOptions(publications)
            
        })();
    },[]);

    {/*const activarcaja = () => {
        document.getElementById('basic-addon1').disabled=true
    }*/}



    return(
        <>
            {/*<NavBarPerfil/>*/}
            <div className="general-container">
                <div className="card">
                    <div className="card-body p-4">
                        <h1 className="card-title">Tu perfil</h1><hr />
                        <div className="accordion" id="accordionPanelsStayOpenExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                    <h4>Tu información</h4>
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                    <div className="accordion-body">
                                        <div className="card-group">  
                                            <div className="card border-light d-block my-auto">
                                                <div className="card-body">
                                                    <img className="rounded-circle shadow img-fluid rounded-start" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(31).jpg"  />
                                                </div>
                                            </div>
                                            <div className="card border-light d-block my-auto">
                                                <div className="card-body">
                                                    <h5 className="pt-3"><strong>{datos.nombres} {datos.apellidos}</strong></h5>
                                                    <div className={!propietario? "":"butup"}>
                                                    <h6>{datos.email}</h6>
                                                    </div>
                                                    <h6>Fecha de registro: {String(datos.fecha_de_registro).slice(0,10)}</h6>
                                                </div>
                                            </div>
                                            <div className="card border-light d-block my-auto">
                                            <div className={!propietario? "":"butup"}>
                                                <div className="card-body">
                                                    <h5 className="card-title">Información de contacto</h5>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text" id="basic-addon1"><FaPhoneAlt size={20}/></span>
                                                        <input type="text" className="form-control" placeholder={datos.celular} aria-label="Celular" aria-describedby="basic-addon1" keyfilter={/^\d{0,10}$/} disabled=""/>
                                                        <button  type="input-group-text" onClick="" ><FaEdit /></button>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text" id="basic-addon2"><FaFacebook size={20}/></span>
                                                        <input type="text" className="form-control" placeholder={datos.facebook} aria-label="Facebook" aria-describedby="basic-addon2" disabled=""/>
                                                        <button  type="input-group-text" onClick="" ><FaEdit /></button>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text" id="basic-addon3"><FaInstagramSquare size={20}/></span>
                                                        <input type="text" className="form-control" placeholder={datos.instagram} aria-label="Instagram" aria-describedby="basic-addon3" disabled=""/>
                                                        <button  type="input-group-text" onClick="" ><FaEdit /></button>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text" id="basic-addon4"><FaTwitter size={20}/></span>
                                                        <input type="text" className="form-control" placeholder={datos.twitter} aria-label="Twitter" aria-describedby="basic-addon4" disabled=""/>
                                                        <button  type="input-group-text" onClick="" ><FaEdit /></button>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                        <h4>Tus publicaciones</h4>
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                    <div class="accordion-body">
                                        <strong>Publicaciones que has realizado.</strong>
                                        <div className="card-group">
                                        {productOptions.map((item) => {
                                            return(
                                                <>
                                                    <div className='card'>
                                                        <div className='card-body'>
                                                            <div className="card h-100 text-center shadow rounded" key={item.id}>
                                                                <img src={item.imagen} className='img-fluid mx-auto d-block rounded' alt={item.titulo} width={400} height={400}/>
                                                                <div className='card-body'>
                                                                    <h5 className='car-title mb-2'>{item.titulo}</h5>
                                                                    <p className='card-text'>{item.descripcion}...</p>
                                                                    <Link to = {`/publication/${item.id}`} className="btn btn-outline-dark">
                                                                        Ver publicación
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                        <h4 className="font-bold text-primary">Tus trueques en curso</h4>
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                    <div class="accordion-body">
                                        <strong>Acepta o rechaza trueques en curso.</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                                        <h4>Tus trueques concretados</h4>
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
                                    <div class="accordion-body">
                                        <strong>Revisa el historial de los trueques que has concretado.</strong>
                                    </div>
                                </div>
                            </div>                  
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
    
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "./Cart.module.scss";
import { saveWebsite, getWebsite, updateWebsite } from "../../firebase/api";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  url: "",
  name: "",
  apellidos: "",
  telefono: "",
  social: "",
  correo: "",
  description: "",
};
export const WebsiteForm = (props) => {
  const [website, setWebsite] = useState(initialState);
  const params = useParams();
  const navigate = useNavigate();

  const handleInputChange = ({ target: { name, value } }) =>
    setWebsite({ ...website, [name]: value });

  const validURL = (str) => {
    var pattern = new RegExp();
    //   "^(https?:\\/\\/)?" + // protocol
    //     "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    //     "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    //     "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    //     "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    //     "(\\#[-a-z\\d_]*)?$",
    //   "i" // fragment locator
    return !!pattern.test(str);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validURL(website.url))
      return toast("invalid url", { type: "warning", autoClose: 1000 });

    if (!params.id) {
      await saveWebsite(website);
      toast("New Link Added", {
        type: "success",
      });
    } else {
      await updateWebsite(params.id, website);
      toast("Updated", {
        type: "success",
      });
    }

    // Clean Form
    setWebsite(initialState);
    navigate("/");
  };

  const getLinkById = async (id) => {
    try {
      const doc = await getWebsite(id);
      setWebsite({ ...doc.data() });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getLinkById(params.id);
    }
  }, [params.id]);

  return (
    <div className={styles.containerAmigos}>
      <div className={styles.navREd}>
        <h4 className={styles.titulo}>Red de amigos</h4>
        <img
          className={styles.imgAmigos}
          src="https://images.ecestaticos.com/IEGPXOCFeHa0nrIlUnLekx8vvK8=/4x145:2116x1263/600x315/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fdf9%2Fc81%2F2e4%2Fdf9c812e4dfb91f7cd15e122030a4e68.jpg"
        />
      </div>
      <div className={styles.red}>
        <p className={styles.parrafo}>
          El voluntariado es una manera de demostrar la solidaridad organizada,
          una intervención de la comunidad en la resolución de sus problemas,
          por eso{" "}
          <b>te invitamos a que hagas parte de nuestra Red de Amigos.</b>
        </p>
       
        <form className={styles.formulario} onSubmit={handleSubmit}>
          <label htmlFor="url">Inscríbete aquí</label>

          <div >
            <div className="input-group-text bg-dark">
              {/* <label className="material-icons">Nombre</label> */}
            </div>
            <input
              type="text"
              value={website.name}
              name="name"
              placeholder="Ingrese su nombre"
              className={styles.group}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="input-group">
            <div className="input-group-text bg-dark">
              {/* //<i className="material-icons">Telefono</i> */}
            </div>
            <input
              type="number"
              value={website.telefono}
              name="telefono"
              placeholder="Ingrese su telefono"
              className={styles.group}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <div className="input-group-text bg-dark">
              {/* <i className="material-icons">Voluntariado</i> */}
            </div>
            <input
              type="text"
              value={website.social}
              name="social"
              placeholder="Área de apoyo"
              className={styles.group}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className={styles.link}>
              {/* //<i className={styles.insertarlink}>Correo electronico</i> */}
            </div>
            <input
              type="text"
              className={styles.group}
              placeholder="correo"
              value={website.url}
              name="url"
              onChange={handleInputChange}
            />
          </div>

          {/* <label htmlFor="description">Descripcion:</label> */}
          <textarea
            rows="3"
            className="form-control mb-3"
            placeholder="Escribe una descripcion"
            name="description"
            value={website.description}
            onChange={handleInputChange}
          ></textarea>

          <button
            className={styles.boton}
         
          >
            {props.currentId === "" ? "Save" : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
};

import { useRef } from "react";
import Card from "../../components/card/Card";
import styles from "./Contact.module.scss";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_oydbh9b",
        "template_4l840m9", form.current,
        'RB7V3B7OqH8Ypz6wG'
      )
      .then(
        (result) => {
          toast.success("Mensaje enviado correctamente");
        },
        (error) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2 className={styles.hh}>Contáctenos</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Nombre</label>
              <input
                type="text"
                name="user_name"
                placeholder="Nombre completo"
                required
              />
              <label>Correo electronico</label>
              <input
                type="email"
                name="user_email"
                placeholder="ejemplo@ejemplo.com"
                required
              />
              <label>Asunto</label>
              <input
                type="text"
                name="subject"
                placeholder="Asunto"
                required
              />
              <label>Mensaje</label>
              <textarea name="message" cols="30" rows="3"></textarea>
              <button className="--btn --btn-primary">Enviar mensaje</button>
            </Card>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
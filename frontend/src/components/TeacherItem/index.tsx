import React from 'react';
import './styles.css';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

const TeacherItem = () => {
   return (
      <article className="teacher-item">
         <header>
            <img src="image" alt="Name" />
            <div>
               <strong>Name</strong>
               <span>Subject</span>
            </div>
         </header>
         <p>Description</p>
         <footer>
            <p>
               Preço/hora
               <strong>R$ Price</strong>
            </p>
            <button type="button">
               <img src={whatsappIcon} alt="Whatsapp" />
               Entrar em contato
            </button>
         </footer>
      </article>
   );
};

export default TeacherItem;

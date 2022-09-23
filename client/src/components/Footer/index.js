import React from 'react';
import Quizard from '../../images/Quizard.png'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div>
            <img src={Quizard} alt="Quizard Logo" />
        </div>      
        &copy;2022 by Quizard</div>
    </footer>
  );
};

export default Footer;

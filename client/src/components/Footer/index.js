import React from 'react';
import Quizard from '../../images/Quizard.png'

console.log(Quizard);
const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-primary p-4">
      
      <div className="container text-light">
        <div>
                <img src={Quizard} alt="Quizard Logo" />
        </div>
        
        &copy;2022 by Quizard</div>
    </footer>
  );
};

export default Footer;

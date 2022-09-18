import Banner from '../../images/header.png'
import Nav from '../Nav';

function Header() {
    return(
        <header>
            <img src={Banner} alt='Quizard banner with two wizards'></img>
            <Nav></Nav>
        </header>
    )
};

export default Header;

import Banner from '../../images/header.png'
import Nav from '../Nav';

function Header() {
    return(
        <header>
            <Nav></Nav>
            <img src={Banner} alt='Quizard banner with two wizards'></img>
        </header>
    )
};

export default Header;


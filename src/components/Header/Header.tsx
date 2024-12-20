import Container from "../Container";
import Nav from "./Nav";

const Header = () => {
  return (
    <Container>
      <header className="py-4 md:py-6 xl:py-10 flex justify-end border-b border-gray-400">
        <Nav />
      </header>
    </Container>
  );
};

export default Header;

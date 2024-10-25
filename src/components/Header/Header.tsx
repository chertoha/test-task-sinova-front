import Link from "next/link";
import { BsDatabaseFillGear } from "react-icons/bs";
import Container from "../Container";
import ROUTES from "@/config/routes";

const Header = () => {
  return (
    <Container>
      <header className="pt-4 md:pt-6 xl:pt-10 flex justify-end">
        <Link
          href={ROUTES.ADMIN}
          className="hover:text-green-700 transition-colors duration-300 ease-in-out"
        >
          <BsDatabaseFillGear size={40} />
        </Link>
      </header>
    </Container>
  );
};

export default Header;

import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header>
      <div>
        <div className="topNav">
          <Image src={"/images/wizard.png"} alt="logo" width={50} height={50} />
          <nav>
            <ul>
              <li>
                <Link href="/" passHref>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/events" passHref>
                  Events
                </Link>
              </li>
              <li>
                <Link href="/about-us" passHref>
                  About Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <p className="title" >When an unknown printer took a galley</p>
    </header>
  );
}

export default Header;

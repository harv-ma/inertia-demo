import { Link } from "@inertiajs/react";
import Root from "@/root";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndustry, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

export default function Authenticated(children: ReactNode) {
    return (
        <Root>
            <div className="min-h-screen bg-white flex pl-[90px]">
                <nav className="fixed left-0 h-screen bg-green-200 border-r flex flex-col items-center py-4 w-[90px] shrink-0 gap-2">
                    <Link href="/" className="nav__item mb-8">
                        <FontAwesomeIcon
                            icon={faHome}
                            className="nav__item-icon"
                        />
                    </Link>
                    <Link href="/projects" className="nav__item">
                        <FontAwesomeIcon
                            icon={faIndustry}
                            className="nav__item-icon"
                        />
                    </Link>

                    <Link href="/profile" className="nav__item mt-auto">
                        <FontAwesomeIcon
                            icon={faUser}
                            className="nav__item-icon"
                        />
                    </Link>
                </nav>

                <main className="grow min-w-0">{children}</main>
            </div>
        </Root>
    );
}

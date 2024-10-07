import { useMemo } from "react";

// Next
import Link from "next/link";
import Image from "next/image";

// Assets
import Logo from "@/public/assets/img/TheBlueMan-Logo-Title-05.png";

// ShadCn
import { Card, CardTitle } from "@/components/ui/card";

// Components
import { DevDebug, LanguageSelector, ThemeSwitcher } from "@/app/components";
import { Label } from "@radix-ui/react-label";

const BaseNavbar = () => {
  const devEnv = useMemo(() => {
    return process.env.NODE_ENV === "development";
  }, []);

  return (
    <header className="lg:container z-[99]">
      <nav>
        <Card className="flex flex-wrap justify-between items-center px-5 py-2 gap-5">
          <Link href={"/"}>
            <div className="flex items-center gap-3">
              <Image
                src={Logo}
                alt="Invoify Logo"
                width={40}
                height={20}
                loading="eager"
              />
              <Label>The Blue Man</Label>
            </div>
          </Link>
          {/* ? DEV Only */}
          <CardTitle className="flex items-center gap-3">
            <span className="uppercase">Invoice Builder</span>
          </CardTitle>
          {/* {devEnv && <DevDebug />} */}
          <div className="flex gap-3">
            <ThemeSwitcher />
            {/* <LanguageSelector /> */}
          </div>
        </Card>
      </nav>
    </header>
  );
};

export default BaseNavbar;

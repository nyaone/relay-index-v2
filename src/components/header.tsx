import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "加入我们", href: "#join" },
  { name: "实例列表", href: "#instances" },
  { name: "FAQ", href: "#faq" },
];

const LogoImg =
  "https://file.nya.one/misskey/9910f099-e1bb-43dc-9447-2e6cd6dffa3a.png";

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (state: boolean) => void;
}
const MobileMenu = ({
  isMobileMenuOpen,
  setMobileMenuOpen,
}: MobileMenuProps) => (
  <Transition.Root show={isMobileMenuOpen} as={Fragment}>
    <Dialog as="div" className="md:hidden" onClose={setMobileMenuOpen}>
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-900/60" />
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <img className="h-8 w-auto" src={LogoImg} alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Transition.Child>
    </Dialog>
  </Transition.Root>
);

interface MainNavProps {
  setMobileMenuOpen: (state: boolean) => void;
}
const MainNav = ({ setMobileMenuOpen }: MainNavProps) => (
  <nav
    className="flex items-center justify-between p-6 md:px-8"
    aria-label="Global"
  >
    <div className="flex md:flex-1">
      <a href="#" className="-m-1.5 p-1.5">
        <img className="h-8 w-auto" src={LogoImg} alt="" />
      </a>
    </div>
    <div className="flex md:hidden">
      <button
        type="button"
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        onClick={() => setMobileMenuOpen(true)}
      >
        <span className="sr-only">Open main menu</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
    <div className="hidden md:flex md:gap-x-12">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="text-sm font-semibold leading-6 text-gray-900 px-3 py-0.5 rounded-full border-primary border-2 border-opacity-0 hover:border-opacity-100 transition-colors duration-300"
        >
          {item.name}
        </a>
      ))}
    </div>
    <div className="hidden md:flex md:flex-1 md:justify-end"></div>
  </nav>
);

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white bg-opacity-80 hover:bg-opacity-100 transition-colors duration-300">
      <MainNav setMobileMenuOpen={setMobileMenuOpen} />
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </header>
  );
};

export default Header;

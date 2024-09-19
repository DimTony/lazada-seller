import React from "react";
import {
  Image,
  VStack,
  Stack,
  Button,
  Text,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Divider,
} from "@chakra-ui/react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const MobileStepOne = ({
  t,
  showPassword,
  togglePasswordVisibility,
  handleSubmit,
  data,
  handleChange,
  isEmailValid,
  isPasswordValid,
  mobileLoading,
}) => {
  return (
    <>
      <VStack w="100%" h="100%" pointerEvents={mobileLoading ? "none" : "auto"}>
        <form onSubmit={handleSubmit} style={{ width: "100%", height: "100%" }}>
          <VStack px="1rem" gap="1rem" mb="2rem" w="100%">
            <FormControl>
              <Input
                type="email"
                placeholder={t("emailInput")}
                borderRadius="25px"
                h="50px"
                value={data.email}
                name="email"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("passwordInput")}
                  borderRadius="25px"
                  h="50px"
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

          <Stack px="1rem" w="100%">
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
              type="submit"
              isDisabled={!isEmailValid || !isPasswordValid}
            >
              <Text fontSize="1.3rem">{t("loginButton")}</Text>
            </Button>
          </Stack>
        </form>
      </VStack>
    </>
  );
};

export default MobileStepOne;

import React from "react";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { LuMail } from "react-icons/lu";
import { maskEmail } from "../../utils/Reusables";

const MobileStepTwo = ({
  t,
  adminResponse,
  handleNext,
  setMobileCurrentStep,
  handleMobileNext,
}) => {
  return (
    <>
      <VStack w="100%" alignItems="flex-start" p="1rem">
        <Text mb="2rem">{t("mobileProtect")}</Text>

        <Button
          mb="3rem"
          variant="outline"
          gap="0.5rem"
          display="flex"
          alignItems="center"
          border="1px solid #eee"
          borderRadius="6px"
          _hover={{ border: "1px solid #888" }}
          w="100%"
          justifyContent="center"
          p="0.3rem"
          onClick={handleMobileNext}
        >
          <LuMail color="#1e71ff" />

          <Text mb="0.3rem" fontWeight="400">
            {maskEmail(adminResponse.message)}
          </Text>
        </Button>

        <Button
          variant="outline"
          gap="0.5rem"
          display="flex"
          alignItems="center"
          border="1px solid #eee"
          borderRadius="6px"
          _hover={{ border: "1px solid #888" }}
          w="100%"
          justifyContent="center"
          p="0.3rem"
          onClick={() => setMobileCurrentStep(1)}
        >
          {t("mobileBack")}
        </Button>
      </VStack>
    </>
  );
};

export default MobileStepTwo;

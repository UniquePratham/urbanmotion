import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
} from "@chakra-ui/react";

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I book a car?",
      answer:
        "Simply select your car and follow the on-screen instructions to book.",
    },
    {
      question: "What are the payment methods?",
      answer: "We accept credit cards, debit cards, and PayPal.",
    },
    {
      question: "Is there an age requirement?",
      answer: "Yes, renters must be at least 21 years old.",
    },
    {
      question: "Do I need insurance to rent a car?",
      answer:
        "Insurance is not mandatory, but we recommend it. We also offer rental insurance options for your convenience.",
    },
    {
      question: "Can I cancel my booking?",
      answer:
        "Yes, you can cancel your booking up to 24 hours before the scheduled rental time. Cancellation fees may apply.",
    },
    {
      question: "Are there mileage limits on rentals?",
      answer:
        "Yes, there is a mileage limit for each rental. Additional charges may apply for exceeding the limit.",
    },
    {
      question: "Can I rent a car for someone else?",
      answer:
        "Yes, but the person driving the car must be present to show a valid driver’s license at the time of pickup.",
    },
    {
      question: "What happens if I return the car late?",
      answer:
        "A late return fee will be charged based on the duration of the delay. Please contact our support team if you anticipate being late.",
    },
    {
      question: "Do you offer one-way rentals?",
      answer:
        "Yes, we offer one-way rentals. Please check availability and additional fees at the time of booking.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team through the Contact page for further assistance.",
    },
  ];

  return (
    <Box bgColor="black" p={6} ml={{ md: "2%" }} color="white" w="98%">
      <Text
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="bold"
        mb={6}
        textAlign="center"
      >
        <Text as="span" color="white">
          Frequently Asked{" "}
        </Text>
        <Text as="span" color="#00dc00">
          Questions
        </Text>
      </Text>
      <Accordion allowToggle>
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            bg="rgba(255, 255, 255, 0.1)"
            borderRadius="md"
            mb={4}
          >
            <h2>
              <AccordionButton
                px={4}
                py={3}
                borderRadius="md"
                _hover={{ bg: "rgba(0, 219, 0, 0.2)" }}
              >
                <Box
                  flex="1"
                  textAlign="left"
                  fontWeight="bold"
                  fontSize="lg"
                  color="#00dc00"
                >
                  {faq.question}
                </Box>
                <AccordionIcon color="#00dc00" />
              </AccordionButton>
            </h2>
            <AccordionPanel
              px={6}
              py={4}
              fontSize="md"
              color="white"
              borderLeft="2px solid #00dc00"
              borderRight="2px solid #00dc00"
            >
              {faq.answer}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default FAQSection;

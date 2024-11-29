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
  ];

  return (
    <Box bg="gray.900" color="white" p={8} borderRadius="lg" my={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Frequently Asked Questions
      </Text>
      <Accordion allowToggle>
        {faqs.map((faq, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  {faq.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{faq.answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default FAQSection;

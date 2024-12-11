import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  VStack,
  HStack,
  Image,
  Spinner
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const AddCar = () => {
  const [carDetails, setCarDetails] = useState({
    registrationNumber: "",
    model: "",
    carType: "",
    quarterly: "",
    monthly: "",
    weekly: "",
    carImage: "", // Added carImage state
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [ownerId, setOwnerId] = useState("");
  const toast = useToast();

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      fetch(`https://urban-motion-backend.vercel.app/api/sessions/${sessionId}`)
        .then((res) => res.json())
        .then((data) => setOwnerId(data.data._id))
        .catch((err) => console.error("Failed to fetch customer data:", err));
    } else {
      toast({
        title: "Error",
        description: "Owner ID (sessionId) not found in local storage.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast]);
  console.log("Owner : ", ownerId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({ ...carDetails, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  const handleImageUpload = async () => {
    if (!image) {
      toast({
        title: "No file selected",
        description: "Please select an image to upload.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME); // Optional: If you're using presets in Cloudinary
    formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    formData.append("folder", "urbanmotion/retailercars");

    setLoading(true);

    // Log the payload being sent to Cloudinary

    try {
      if (formData && image) {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: "post",
          body: formData
        })

        const data = await response.json();
        const uploadedImagePublicId = data.public_id;
        console.log(uploadedImagePublicId);
        setCarDetails({ ...carDetails, ["carImage"]: uploadedImagePublicId });

        const uploadedUrl = data.url;
        setUploadedImageUrl(uploadedUrl);

        toast({
          title: "Image uploaded successfully!",
          description: "The image has been uploaded to Cloudinary.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      setLoading(false);
      }

      // Extract the URL from the response and set it

    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
      toast({
        title: "Error uploading image",
        description: error.message || "An unexpected error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carData = {
      registrationNumber: carDetails.registrationNumber,
      owner: ownerId,
      model: carDetails.model,
      carType: carDetails.carType,
      isHanded: false,
      carPricing: {
        quarterly: Number(carDetails.quarterly),
        monthly: Number(carDetails.monthly),
        weekly: Number(carDetails.weekly),
      },
      carImage: carDetails.carImage, // Add carImage to the data
    };

    console.log("JSON being sent:", JSON.stringify(carData, null, 2));

    try {
      const response = await axios.post(
        "https://urban-motion-backend.vercel.app/api/cars/add-car",
        carData
      );
      if (response.status === 200) {
        toast({
          title: "Car added successfully!",
          description: "The car has been added to your inventory.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setCarDetails({
          registrationNumber: "",
          model: "",
          carType: "",
          quarterly: "",
          monthly: "",
          weekly: "",
          carImage: "",
        });
      }
    } catch (error) {
      toast({
        title: "Error adding car",
        description:
          error.response?.data?.message || "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      w="full"
      p={{ base: 2, md: 6 }}
      bg="gray.800"
      borderRadius="lg"
      boxShadow="lg"
      maxW="800px"
      mx="auto"
    >
      <Box textAlign="center" mb={6}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
          <Image src="/Resources/add-car40.png" alt="" h="50px" mr={2} />
          <Heading as="h1" size="lg" color="#00db00" ml={2} mt={4}>
            Add Car
          </Heading>
        </Box>
        <Text color="gray.400">
          Fill in the details below to add a new car to your inventory.
        </Text>
      </Box>

      <form onSubmit={handleSubmit}>
        <HStack
          spacing={{ base: 4, md: 16 }}
          width="100%"
          justifyContent="center"
          alignItems="center"
          flexDirection={{ base: "column", md: "unset" }}
        >
          <VStack
            spacing={{ base: 2, md: 8 }}
            width={{ base: "100%", md: "40%" }}
          >
            <FormControl isRequired>
              <FormLabel>Registration Number</FormLabel>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={4}
              >
                <Image
                  src="/Resources/id.png"
                  alt=""
                  h="30px"
                  mr={3}
                  borderRadius={"lg"}
                />
                <Input
                  placeholder="Enter registration number"
                  name="registrationNumber"
                  value={carDetails.registrationNumber}
                  onChange={handleInputChange}
                  bg="gray.100"
                  color="black"
                  type="text"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.5)",
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  }}
                  _focus={{
                    outline: "none",
                    bg: "rgba(255, 255, 255, 0.7)",
                    borderColor: "rgba(0, 255, 0, 0.8)",
                    boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
                  }}
                />
              </Box>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Model</FormLabel>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={4}
              >
                <Image
                  src="/Resources/model.png"
                  alt=""
                  h="30px"
                  mr={3}
                  borderRadius={"lg"}
                />
                <Input
                  placeholder="Enter car model"
                  name="model"
                  value={carDetails.model}
                  onChange={handleInputChange}
                  bg="gray.100"
                  color="black"
                  type="text"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.5)",
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  }}
                  _focus={{
                    outline: "none",
                    bg: "rgba(255, 255, 255, 0.7)",
                    borderColor: "rgba(0, 255, 0, 0.8)",
                    boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
                  }}
                />
              </Box>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Car Fuel Type</FormLabel>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={4}
              >
                <Image
                  src="/Resources/VehiclesBlue-100.png"
                  alt=""
                  h="30px"
                  mr={3}
                  borderRadius={"lg"}
                />
                <Select
                  name="carType"
                  defaultValue=""
                  value={carDetails.carType}
                  onChange={handleInputChange}
                  bg="gray.100"
                  color="black"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.5)",
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  }}
                  _focus={{
                    outline: "none",
                    bg: "rgba(255, 255, 255, 0.7)",
                    borderColor: "rgba(0, 255, 0, 0.8)",
                    boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
                  }}
                >
                  <option value="" disabled>
                    Select Car Fuel Type
                  </option>
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </Select>
              </Box>
            </FormControl>
          </VStack>
          <VStack
            spacing={{ base: 2, md: 8 }}
            width={{ base: "100%", md: "40%" }}
          >
            <FormControl isRequired>
              <FormLabel>Pricing (Quarterly)</FormLabel>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={4}
              >
                <Image
                  src="/Resources/rental-price-per-day321.png"
                  alt=""
                  h="30px"
                  mr={3}
                  borderRadius={"lg"}
                />
                <Input
                  type="number"
                  placeholder="Enter quarterly pricing"
                  name="quarterly"
                  value={carDetails.quarterly}
                  onChange={handleInputChange}
                  bg="gray.100"
                  color="black"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.5)",
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  }}
                  _focus={{
                    outline: "none",
                    bg: "rgba(255, 255, 255, 0.7)",
                    borderColor: "rgba(0, 255, 0, 0.8)",
                    boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
                  }}
                />
              </Box>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Pricing (Monthly)</FormLabel>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={4}
              >
                <Image
                  src="/Resources/rental-price-per-day321.png"
                  alt=""
                  h="30px"
                  mr={3}
                  borderRadius={"lg"}
                />
                <Input
                  type="number"
                  placeholder="Enter monthly pricing"
                  name="monthly"
                  value={carDetails.monthly}
                  onChange={handleInputChange}
                  bg="gray.100"
                  color="black"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.5)",
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  }}
                  _focus={{
                    outline: "none",
                    bg: "rgba(255, 255, 255, 0.7)",
                    borderColor: "rgba(0, 255, 0, 0.8)",
                    boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
                  }}
                />
              </Box>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Pricing (Weekly)</FormLabel>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={4}
              >
                <Image
                  src="/Resources/rental-price-per-day321.png"
                  alt=""
                  h="30px"
                  mr={3}
                  borderRadius={"lg"}
                />
                <Input
                  type="number"
                  placeholder="Enter weekly pricing"
                  name="weekly"
                  value={carDetails.weekly}
                  onChange={handleInputChange}
                  bg="gray.100"
                  color="black"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.5)",
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  }}
                  _focus={{
                    outline: "none",
                    bg: "rgba(255, 255, 255, 0.7)",
                    borderColor: "rgba(0, 255, 0, 0.8)",
                    boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
                  }}
                />
              </Box>
            </FormControl>
          </VStack>
        </HStack>
        <HStack
          spacing={{ base: 4, md: 16 }}
          width="100%"
          justifyContent="center"
          alignItems="center"
          mt={4}
        >
          <VStack
            spacing={{ base: 2, md: 8 }}
            width={{ base: "100%", md: "70%" }}
          >
            <FormControl isRequired>
              <FormLabel>Car Image</FormLabel>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={4}
              >
                <Image
                  src="/Resources/BookingWhite.png"
                  alt=""
                  h="30px"
                  mr={3}
                  borderRadius={"lg"}
                />
                <Box position="relative" display="inline-block">
                  <Input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    opacity="0"
                    position="absolute"
                    width="100%"
                    height="100%"
                    top="0"
                    left="0"
                    zIndex="1"
                    cursor="pointer"
                  />
                  <Box
                    as="button"
                    bg="gray.100"
                    color="black"
                    px="4"
                    py="2"
                    borderRadius="md"
                    textAlign="center"
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.5)",
                      borderColor: "rgba(255, 255, 255, 0.5)",
                    }}
                    _focus={{
                      outline: "none",
                      bg: "rgba(255, 255, 255, 0.7)",
                      borderColor: "rgba(0, 255, 0, 0.8)",
                      boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
                    }}
                  >
                    Upload File
                  </Box>
                </Box>
                <Button bgColor="black" color="white" onClick={handleImageUpload} ml={3}>Upload</Button>
              </Box>
            </FormControl>
            {loading ? (<Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="50px"
              flexDirection="column"
            >
              <Spinner size="sm" color="green" />
            </Box>) : carDetails.carImage && (
              <Box mt={4}>
                <Text mt={2} color="blue.500" fontSize="sm">
                  <a
                    href={uploadedImageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Image
                  </a>
                </Text>
              </Box>
            )}
            <Button
              bg="#00db00"
              color="white"
              border="2px solid transparent"
              borderRadius="md"
              fontSize="lg"
              px="5"
              py="4"
              _hover={{
                bg: "white",
                boxShadow: "0 0 15px #00db00, 0 0 30px #00db00",
                border: "2px solid #00db00",
                color: "#00db00",
              }}
              sx={{
                boxShadow: "0 0 10px #00db00, 0 0 20px rgba(0, 219, 0, 0.5)",
                transition: "0.3s ease",
              }}
              size="lg"
              type="submit"
            >
              Add Car
            </Button>
          </VStack>
        </HStack>
      </form>
    </Box>
  );
};

export default AddCar;

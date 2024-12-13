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
  Spinner,
  IconButton
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

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
  const [isLoading, setIsLoading] = useState(false);
  const [retailerData, setRetailerData] = useState(null);
  const [isUploadingImage, setIsLUploadingImage] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const fileInputRef = useRef();
  const toast = useToast();

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      fetch(`https://urban-motion-backend.vercel.app/api/sessions/${sessionId}`)
        .then((res) => res.json())
        .then((data) => { setRetailerData(data); setOwnerId(data.data._id) })
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({ ...carDetails, [name]: value });
  };
  const handleImageChange = (e) => {
    setUploadedImageUrl("");
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  const resetFileInput = () => {
    setImage(null);
    fileInputRef.current.value = ""; // Clear the file input
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
    if (isUploadingImage) return; // Prevent multiple triggers
    setIsLUploadingImage(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME); // Optional: If you're using presets in Cloudinary
    formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    formData.append("folder", "urbanmotion/retailercars");

    setIsLoading(true);

    // Log the payload being sent to Cloudinary

    try {
      if (formData && image) {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: "post",
          body: formData
        })

        if (response.status === 200) {
          const data = await response.json();
          const uploadedImagePublicId = data.public_id;
          const uploadedUrl = data.url;
          setUploadedImageUrl(uploadedUrl);
          setIsLoading(false);
          setImage(null);
          resetFileInput();
          return uploadedImagePublicId;
        }
        else {
          toast({
            title: "Failed to upload image!",
            description: "The image cannot been uploaded to Cloudinary.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
            variant: "subtle",
            bgColor: "teal.500",
            color: "white",
          });
        }
        setIsLoading(false);
        setImage(null);
        resetFileInput();
        return null;
      }

      // Extract the URL from the response and set it

    } catch (error) {
      setIsLoading(false);
      setImage(null);
      resetFileInput();
      console.error("Error uploading image:", error);
      toast({
        title: "Error uploading image",
        description: error.message || "An unexpected error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
        variant: "subtle",
        bgColor: "teal.500",
        color: "white",
      });
    }
    finally {
      setIsLUploadingImage(false); // Reset the flag once upload completes
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (retailerData) {
        if (retailerData.isVerified) {
          const uploadedImagePublicId = await handleImageUpload();

          if (!uploadedImagePublicId) {
            toast({
              title: "Image upload failed",
              description: "Please try again to upload the image.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
              variant: "subtle",
              bgColor: "teal.500",
              color: "white",
            });
            return; // Exit early if the image upload fails
          }

          setCarDetails({ ...carDetails, ["carImage"]: uploadedImagePublicId });
          const updatedCarDetails = {
            ...carDetails,
            carImage: uploadedImagePublicId, // Ensure the carImage is correctly set
          };

          const carData = {
            registrationNumber: updatedCarDetails.registrationNumber,
            owner: ownerId,
            model: updatedCarDetails.model,
            carType: updatedCarDetails.carType,
            isHanded: false,
            carPricing: {
              quarterly: Number(updatedCarDetails.quarterly),
              monthly: Number(updatedCarDetails.monthly),
              weekly: Number(updatedCarDetails.weekly),
            },
            carImage: updatedCarDetails.carImage, // Add carImage to the data
          };
          const response = await axios.post(
            "https://urban-motion-backend.vercel.app/api/cars/add-car",
            carData
          );
          if (response.status === 201) {
            toast({
              title: "Car added successfully!",
              description: "The car has been added to your inventory.",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top",
              variant: "subtle",
              bgColor: "teal.500",
              color: "white",
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
        }
        else {
          toast({
            title: "Retailer Not Verified",
            description: "Your account is not verified. Please complete the verification process to add a car.",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top",
            variant: "subtle",
            bgColor: "teal.500",
            color: "white",
          });
          return;
        }
      }
      else {
        toast({
          title: "Retailer Data Not Avaliable",
          description: "Unable to process retailerdata",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
          variant: "subtle",
          bgColor: "teal.500",
          color: "white",
        });
        return; // Exit early if the image upload fails
      }
    } catch (error) {
      console.error("Error during car submission:", error);
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
                  src="/Resources/car-fuel-type32.png"
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
            spacing={{ base: 2, md: carDetails.carImage ? 2 : uploadedImageUrl ? 2 : 8 }}
            width={{ base: "100%", md: "100%" }}
          >
            <HStack>
              <FormControl isRequired>
                <FormLabel>Car Image</FormLabel>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
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
                      ref={fileInputRef}
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
                      {image ? image.name : "Choose a file"}
                    </Box>
                  </Box>
                  <IconButton
                    display={image ? "unset" : "none"}
                    aria-label="Menu"
                    icon={<FaTrash />}
                    bg="transparent"
                    color="red"
                    fontSize={{ base: "16px", md: "24px" }}
                    _hover={{
                      color: "white",
                    }}
                    onClick={resetFileInput}
                    zIndex={12}
                    ml={3}
                    transition="all ease-in-out 0.3s"
                  />
                </Box>
              </FormControl>
            </HStack>
            {isLoading ? (<Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="50px"
              flexDirection="column"
            >
              <Spinner size="sm" color="green" />
            </Box>) : uploadedImageUrl && (
              <Box mb={6}>
                <Text color="green.700" fontSize="sm">
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

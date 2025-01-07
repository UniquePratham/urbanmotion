import { Box, Heading, Text, Grid, GridItem, Spinner, Alert, AlertIcon, Image, Input, IconButton, useToast, Icon, HStack, VStack, Select, Button } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { CldImage } from 'next-cloudinary';
import { CopyIcon } from '@chakra-ui/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  FaStar,
  FaRegStar,
  FaFilter,
  FaSortUp,
  FaRedo,
  FaSave,
  FaEdit,
  FaTimes
} from "react-icons/fa";


const Cars = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [ratingFilter, setRatingFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [fuelTypeFilter, setFuelTypeFilter] = useState("");
  const [isVisible, setIsVisible] = useState(true); // State to track visibility
  const [isFiltered, setIsFiltered] = useState(false); // State to track filtered
  const [isEditable, setIsEditable] = useState(false); // Editable state
  const [carPricing, setCarPricing] = useState({
    "weekly": 0,
    "monthly": 0,
    "quarterly": 0
  }); // To store NEW Car pricing
  const [image, setImage] = useState(null);
  const [carImagePublicId, setCarImagePublicId] = useState(""); // To store NEW Car Image Public Id
  const [isFlipped, setIsFlipped] = useState(false); // Flip animation state
  const [isUploadingImage, setIsLUploadingImage] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [index, setIndex] = useState("");
  const fileInputRef = useRef();
  const toast = useToast();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      // Fetch all cars
      const carRes = await fetch("https://urban-motion-backend.vercel.app/api/cars/all-cars");
      const carData = await carRes.json();

      // Fetch retailer data using session ID
      const sessionId = localStorage.getItem("sessionId");
      if (sessionId) {
        const retailerRes = await fetch(`https://urban-motion-backend.vercel.app/api/sessions/${sessionId}`);
        const retailerData = await retailerRes.json();
        // Filter cars based on retailer's carSubmittedArray
        const carsSubmittedIdArray = retailerData.data.carsSubmittedIdArray || [];
        const filteredCars = carData.cars.filter((car) => carsSubmittedIdArray.includes(car._id));
        setCars(filteredCars);
        setFilteredCars(filteredCars);
      } else {
        setError("Session ID not found. Please log in again.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch car data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={{ base: "100vh", md: "200px" }}
        flexDirection="column"
        mt={{ base: 0, md: 64 }}
      >
        <Image src="/Resources/car-rent.png" alt="" h="50px" mb={2} />
        <Spinner size="xl" color="green" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

  const handleFilterChange = () => {
    setIsLoading(true); // Show spinner when filters are applied
    setIsFiltered(true);
    let filtered = cars;

    // Filter by rating
    if (ratingFilter) {
      filtered = filtered.filter((car) => car.rating >= ratingFilter);
    }

    // Filter by price
    if (priceFilter) {
      filtered = filtered.filter(
        (car) => car.carPricing.monthly <= priceFilter
      );
    }

    // Filter by fuel type
    if (fuelTypeFilter) {
      filtered = filtered.filter((car) => car.carType === fuelTypeFilter);
    }

    setFilteredCars(filtered);
    setIsLoading(false); // Hide spinner after filter is applied

    // Show a message if no cars match the filters
    if (filtered.length === 0) {
      setError("No cars match the applied filters.");
    }
  };


  const calculateStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
      if (i < filledStars) {
        stars.push(<Icon as={FaStar} key={i} color="yellow.400" />);
      } else {
        stars.push(<Icon as={FaRegStar} key={i} color="yellow.400" />);
      }
    }

    return stars;
  };

  const onCopy = () => {
    toast({
      title: "Car Registration Number Copied.",
      description: "Car Registration Number Copied Successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleToggle = () => {
    setIsVisible((prev) => !prev); // Toggle visibility state
  };
  const handleResetorClearFilter = () => {
    // Reset the value of all select elements with specific IDs
    setIsFiltered(false);
    setIsLoading(true);
    setRatingFilter("");
    setFuelTypeFilter("");
    setPriceFilter("");
    fetchCars();
  };


  const handleEditClick = (car) => {
    if (car.isHanded) {
      toast({
        title: "Edit Restricted for Car Details",
        description: "Car details can only be edited after the booking period with the current customer ends. Please try again later.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
    else {
      setIsFlipped(!isFlipped);
      setIsEditable(!isEditable);
      setCarPricing(car.carPricing);
    }
  };
  const handleCancelEditClick = () => {
    setIsFlipped(!isFlipped);
    setIsEditable(!isEditable);
    setCarPricing({});
  };

  const handleInputCarPricingChange = (field, value) => {
    setCarPricing((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    setUploadedImageUrl("");
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageUrl(reader.result); // Set the image data URL
        };
        reader.readAsDataURL(file); // Read the file as a data URL
      }
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
        return null;
      }

      // Extract the URL from the response and set it

    } catch (error) {
      setIsLoading(false);
      setImage(null);
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

  const handleImageDelete = async (public_id) => {
    try {
      const response = await fetch("/api/delete_image", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id: public_id }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Image deleted successfully:", result);
      } else {
        const error = await response.json();
        console.error("Error:", error);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };


  const handleSave = async (car) => {
    if (car) {
      let uploadedImagePublicId = "";
      if (image) {
        uploadedImagePublicId = await handleImageUpload();
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
      }
      if (carPricing !== car.carPricing || uploadedImagePublicId !== "") {
        let payload = {}
        let weekly, monthly, quarterly;
        if (carPricing !== car.carPricing) {
          if (carPricing.weekly !== 0) {
            weekly = carPricing.weekly
          }
          else {
            weekly = car.carPricing.weekly
          }
          if (carPricing.monthly !== 0) {
            monthly = carPricing.monthly
          }
          else {
            monthly = car.carPricing.monthly
          }
          if (carPricing.quarterly !== 0) {
            quarterly = carPricing.quarterly
          }
          else {
            quarterly = car.carPricing.quarterly
          }
          payload = {
            "carPricing": {
              "weekly": weekly,
              "monthly": monthly,
              "quarterly": quarterly
            }
          }
        }
        if (uploadedImagePublicId !== "") {
          if (uploadedImagePublicId !== car.carImage) {
            payload = { ...payload, "carImage": uploadedImagePublicId }
            handleImageDelete(car.carImage);
          }
        }
        setCarImagePublicId(uploadedImagePublicId);
        console.log("payload : ", payload);

        let endpoint = `https://urban-motion-backend.vercel.app/api/cars/update-car/${car.registrationNumber}`;
        try {
          const response = await fetch(endpoint, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error("Failed to save data.");
          }

          toast({
            title: "Success",
            description: "Your changes have been saved.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          fetchCars();
        } catch (error) {
          toast({
            title: "Error 1",
            description: "An error 1 occurred while saving your changes.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          try {
            handleImageDelete(uploadedImagePublicId);
          } catch (error) {
            console.error("Error deleting car:", error);
            toast({
              title: "Error",
              description: "Failed to delete the car. Please try again.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } finally {
          setIsEditable(false);
          setIsFlipped(false);
        }
      }
      else {
        toast({
          title: "No Changes Detected",
          description: "You haven't made any changes to save.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
        setIsEditable(false);
        setIsFlipped(false);
      }
    }
    else {
      toast({
        title: "Error 2",
        description: "An error 2 occurred while saving your changes.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      try {
        if (carImagePublicId) {
          handleImageDelete(carImagePublicId);
        }
      } catch (error) {
        console.error("Error deleting car:", error);
        toast({
          title: "Error",
          description: "Failed to delete the car. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      setIsEditable(false);
      setIsFlipped(false);
    }
  };

  return (
    <Box p={4} bg="gray.800" borderRadius="md" boxShadow="md" maxH="100vh" overflowY="scroll">
      <Box textAlign="center" mb={6}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
          <Image src="/Resources/Vehicles.png" alt="" h="50px" mr={2} />
          <Heading as="h1" size="lg" color="#00db00" ml={2} mt={4}>
            My Cars
          </Heading>
        </Box>
        <Text color="gray.400">
          Here you can view the all the cars that are in your inventory.
        </Text>
      </Box>
      {/* Filters */}
      {filteredCars.length > 0 && (
        <>
          <VStack flexDir={{ base: "row", md: "column" }} style={{ display: isVisible ? "flex" : "none" }}>
            <HStack spacing={{ base: 4, md: 44 }} mb={2} mt={{ base: 0, md: 2 }} justifyContent={{ base: "space-between", md: "space-around" }} alignItems={{ base: "unset", md: "center" }} flexDirection={{ base: "column", md: "unset" }}>
              <Box display="flex" alignItems="center">
                <Image src="/Resources/rating_cars.png" alt="Select Rating" boxSize="40px" />
              </Box>
              <Box display="flex" alignItems="center">
                <Image src="/Resources/car-fuel-type32.png" alt="Select Fuel Type" boxSize="40px" />
              </Box>
              <Box display="flex" alignItems="center">
                <Image src="/Resources/money 321.png" alt="Select Max Monthly Price" boxSize="40px" />
              </Box>
            </HStack>
            <HStack spacing={4} mb={2} justify="center" flexDirection={{ base: "column", md: "unset" }} style={{ display: isVisible ? "flex" : "none" }}>
              <Select
                onChange={(e) => setRatingFilter(e.target.value)}
                defaultValue=""
                value={ratingFilter}
                bg="gray.100"
                color="black"
              >
                <option value="" disabled>
                  Select Rating
                </option>
                <option value="1">1 Star ⭐</option>
                <option value="2">2 Stars ⭐⭐</option>
                <option value="3">3 Stars ⭐⭐⭐</option>
                <option value="4">4 Stars ⭐⭐⭐⭐</option>
                <option value="5">5 Stars ⭐⭐⭐⭐⭐</option>
              </Select>

              <Select
                onChange={(e) => setFuelTypeFilter(e.target.value)}
                bg="gray.100"
                color="black"
                defaultValue=""
                value={fuelTypeFilter}
              >
                <option value="" disabled>
                  Select Fuel Type
                </option>
                <option value="Diesel">Diesel</option>
                <option value="Petrol">Petrol</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </Select>

              <Select
                onChange={(e) => setPriceFilter(e.target.value)}
                defaultValue=""
                value={priceFilter}
                bg="gray.100"
                color="black"
              >
                <option value="" disabled>
                  Select Max Monthly Price
                </option>
                <option value="20000">₹20000</option>
                <option value="30000">₹30000</option>
                <option value="50000">₹50000</option>
              </Select>


            </HStack>
          </VStack>
          {/* Go Button */}
          <HStack justifyContent="center" alignItems="center" mb={3} mt={2} style={{ display: isVisible ? "flex" : "none" }}><Button
            display={{ base: "flex", md: "unset" }}
            alignItems="center"
            fontSize="20px"
            color="black"
            px="4px"
            pt="4px"
            w={{ base: "20%", md: "5%" }}
            borderRadius="md"
            bg="white"
            zIndex={3}
            _hover={{
              bg: "gray.500",
              color: "#00db00",
              transform: "scale(1.05)",
              transition: "0.2s ease-in-out",
            }}
            flexDirection="column-reverse"
            size="md" onClick={() => {
              handleFilterChange();
              handleToggle();
            }}
          >
            <Image
              src="/Resources/search-car48.png"
              alt=""
              borderRadius="3"
              p="4px"
              pt="2"
              mt={{ base: "-4", md: "-4" }}
              zIndex={2}
            />
          </Button></HStack>
          <HStack justifyContent="center" alignItems="center" mb={3} mt={2} style={{ display: isVisible ? "flex" : "none" }}>
            <IconButton
              aria-label="Menu"
              icon={<FaRedo />}
              display={{ base: "flex", md: "flex" }}
              bg="transparent"
              color="#00db00"
              fontSize="24px"
              _hover={{
                color: "gray.500",
              }}
              onClick={handleResetorClearFilter}
              transition="transform 0.2s"
              transform={!isVisible ? "rotate(360deg)" : "rotate(0deg)"}
            />
          </HStack>
          <HStack justifyContent="center" alignItems="center" mb={3} mt={2} display={{ base: "flex", md: "flex" }}>
            <IconButton
              aria-label="Menu"
              icon={isVisible ? <FaSortUp /> : <FaFilter />}
              display={{ base: "flex", md: "flex" }}
              bg="transparent"
              color="#00db00"
              fontSize="24px"
              _hover={{
                color: "gray.500",
              }}
              onClick={handleToggle}
              transition="transform 0.2s"
              transform={!isVisible ? "rotate(360deg)" : "rotate(0deg)"}
            />
          </HStack>
        </>
      )}
      {filteredCars.length > 0 ? (
        <Grid templateColumns="repeat(auto-fit, minmax(1, 1fr))" gap={4}>
          {filteredCars.map((car) => (
            isEditable && isFlipped && index === car._id ? (<GridItem
              key={car._id}
              p={4}
              bg="gray.700"
              border="1px solid #00db00"
              borderRadius="md"
              boxShadow="sm"
              _hover={{ boxShadow: "lg", transform: "scale(1.01)" }}
              transition="all 0.3s"
              display="flex"
              justifyContent="center"
              animate={{ rotateY: isFlipped && index === car._id ? 360 : 0 }}
            >
              <Box display="flex" alignItems={{ base: "center", md: "unset" }} justifyContent={{ base: "unset", md: "center" }} flexDirection={{ base: "column", md: "row" }}>
                <IconButton
                  aria-label="Menu"
                  icon={<FaSave />}
                  bg="transparent"
                  color="white"
                  fontSize={{ base: "20px", md: "30px" }}
                  _hover={{
                    color: "#00db00",
                  }}
                  onClick={() => {
                    handleSave(car);
                    setIndex("");
                  }}
                  position="relative"
                  left={{ base: -2, md: 0 }}
                  top={0}
                  zIndex={12}
                />
                <IconButton
                  aria-label="Menu"
                  icon={<FaTimes />}
                  bg="transparent"
                  color="white"
                  fontSize={{ base: "20px", md: "30px" }}
                  _hover={{
                    color: "#00db00",
                  }}
                  onClick={() => {
                    setIndex("");
                    handleCancelEditClick();
                  }}
                  position="relative"
                  left={{ base: 220, md: -10 }}
                  top={{ base: -10, md: 200 }}
                  zIndex={12}
                />
              </Box>
              <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={{ base: 4, md: 20 }} alignItems="center">

                {/* Left Column: Car Details */}
                <Box display={{ base: "flex", md: "unset" }} flexDirection="column" ml={{ base: 0, md: 4 }} >
                  <Heading as="h3" size="xl" color="#00db00" mb={2} >
                    {car.model || "Car Name"}
                  </Heading>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 3fr)" }} gap={3}>
                    <Text fontSize="sm" mb={2}>
                      <Text as="span" color="lightgreen">Registration No:</Text> {car.registrationNumber}
                      <CopyToClipboard text={car.registrationNumber}>
                        <IconButton
                          icon={<CopyIcon />}
                          size="sm"
                          aria-label="Copy registration number"
                          ml={2} // Add margin-left to space out the button from the text
                          variant="ghost" // Optional: for a subtle button style
                          colorScheme="green" // Optional: set color
                          onClick={onCopy}
                        />
                      </CopyToClipboard>
                    </Text>
                    <Text fontSize="sm" mb={2}>
                      <Text as="span" color="lightgreen">Booking Status:</Text> {car.isHanded ? "Booked" : "Not Booked"}
                    </Text>
                    <Text fontSize="sm" mb={2}>
                      <Text as="span" color="lightgreen">Car Fuel Type:</Text> {car.carType || "N/A"}
                    </Text>
                    <Text fontSize="sm" mb={2}>
                      <HStack
                        spacing={1}
                        mb={{ base: 2, md: 4 }}
                        justify={{ base: "start", md: "start" }}
                      >
                        <Text as="span" color="lightgreen">Rating:</Text> {car.rating > 0 ? calculateStars(car.rating) : <Text>No Rating Yet</Text>}
                      </HStack>
                    </Text>
                  </Grid>
                  <Box mt={{ base: 0, md: 2 }}>
                    <Text fontSize="sm" mb={1} color="lightgreen">
                      Car Pricing:
                    </Text>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={1}>
                    <Icon as={FaRupeeSign} color="white" mb={-0.5} />
                      <Text fontSize="sm">- Weekly:   <Input
                        placeholder="Weekly Price"
                        defaultValue={car.carPricing.weekly}
                        onChange={(e) => handleInputCarPricingChange("weekly", e.target.value)}
                        size={{ base: "md", md: "sm" }}
                        bg="rgba(255, 255, 255, 0.1)"
                        borderRadius="md"
                        color="white"
                        border="none"
                        width={{ base: "80%", md: "70%" }}
                        mt={1}
                        _hover={{
                          bg: "rgba(255, 255, 255, 0.2)",
                          borderColor: "rgba(255, 255, 255, 0.5)",
                        }}
                        _focus={{
                          outline: "none",
                          bg: "rgba(255, 255, 255, 0.3)",
                          borderColor: "rgba(0, 255, 0, 0.8)",
                          boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
                        }}
                      /></Text>
                       <Icon as={FaRupeeSign} color="white" mb={-0.5} />
                      <Text fontSize="sm">- Monthly:  <Input
                        placeholder="Monthly Price"
                        defaultValue={car.carPricing.monthly}
                        onChange={(e) => handleInputCarPricingChange("monthly", e.target.value)}
                        size={{ base: "md", md: "sm" }}
                        bg="rgba(255, 255, 255, 0.1)"
                        color="white"
                        border="none"
                        width={{ base: "80%", md: "70%" }}
                        borderRadius="md"
                        mt={1}
                        _hover={{
                          bg: "rgba(255, 255, 255, 0.2)",
                          borderColor: "rgba(255, 255, 255, 0.5)",
                        }}
                        _focus={{
                          outline: "none",
                          bg: "rgba(255, 255, 255, 0.3)",
                          borderColor: "rgba(0, 255, 0, 0.8)",
                          boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
                        }}
                      /></Text>
                       <Icon as={FaRupeeSign} color="white" mb={-0.5} />
                      <Text fontSize="sm">- Quarterly:  <Input
                        placeholder="Quarterly Price"
                        defaultValue={car.carPricing.quarterly}
                        onChange={(e) => handleInputCarPricingChange("quarterly", e.target.value)}
                        size={{ base: "md", md: "sm" }}
                        bg="rgba(255, 255, 255, 0.1)"
                        color="white"
                        border="none"
                        width={{ base: "80%", md: "70%" }}
                        borderRadius="md"
                        mt={1}
                        _hover={{
                          bg: "rgba(255, 255, 255, 0.2)",
                          borderColor: "rgba(255, 255, 255, 0.5)",
                        }}
                        _focus={{
                          outline: "none",
                          bg: "rgba(255, 255, 255, 0.3)",
                          borderColor: "rgba(0, 255, 0, 0.8)",
                          boxShadow: "0 0 8px rgba(0, 255, 0, 0.6)",
                        }}
                      /></Text>
                    </Grid>
                  </Box>
                </Box>
                {/* Right Column: Car Image */}
                <Box display="flex" flexDirection={{ base: "column", md: "column" }} justifyContent="center" alignItems="center" ml={{ base: -10, md: 0 }} mt={{ base: -10, md: 0 }}>
                  <Box width={{ base: "200px", md: "300px" }}
                    height={{ base: "150px", md: "200px" }}
                    overflow="hidden"
                    borderRadius="8px"
                    _hover={{
                      transform: "scale(1.01) scaleX(-1)",
                      transition: "transform 0.3s ease-in",
                    }}>

                    {image && ImageUrl && index === car._id ? (<Image
                      src={ImageUrl}
                      alt="Car Image"
                      style={{
                        width: "300px",
                        height: "200px",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                      boxSize={{ base: "unset", md: "300px" }} // Adjust size as needed
                      objectFit="contain"
                      _hover={{
                        transform: "scale(1.01) scaleX(-1)",
                        transition: "0.03s ease-in transform",
                      }}
                    />) : car.carImage ? (<CldImage
                      src={car.carImage}
                      alt="Car Image"
                      width="300"
                      height="200"
                      style={{
                        width: "300px",
                        height: "200px",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />) : (<Image
                      src="car3.png"
                      alt="Car Image"
                      style={{
                        width: "300px",
                        height: "200px",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                      boxSize={{ base: "unset", md: "300px" }} // Adjust size as needed
                      objectFit="contain"
                      _hover={{
                        transform: "scale(1.01) scaleX(-1)",
                        transition: "0.03s ease-in transform",
                      }}
                    />)}
                  </Box>
                  <Box
                    as="button"
                    bg="gray.100"
                    color="black"
                    mt={{ base: 4, md: 0 }}
                    width={{ base: "70%", md: "50%" }}
                    height="40px"
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
                    <Input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      opacity="0"
                      width="100%"
                      height="100%"
                      zIndex="1"
                      cursor="pointer"
                    />
                    <Text position="relative" top={-8}>{image ? image.name : "Choose a file"}</Text>
                  </Box>
                </Box>
              </Grid>
            </GridItem>) : (
              <GridItem
                key={car._id}
                p={{ base: 2, md: 5 }}
                bg="gray.700"
                border="1px solid #00db00"
                borderRadius="md"
                boxShadow="sm"
                _hover={{ boxShadow: "lg", transform: "scale(1.01)" }}
                transition="all 0.3s"
                display="flex"
                justifyContent="center"
                animate={{ rotateY: isFlipped && index === car._id ? 360 : 0 }}
              >
                <IconButton
                  aria-label="Menu"
                  icon={<FaEdit />}
                  bg="transparent"
                  color="white"
                  fontSize={{ base: "20px", md: "30px" }}
                  _hover={{
                    color: "#00db00",
                  }}
                  onClick={() => {
                    handleEditClick(car);
                    setIndex(car._id);
                  }}
                  position="relative"
                  left={0}
                  top={0}
                  zIndex={12}
                />
                <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={{ base: 4, md: 40 }} alignItems="center">

                  {/* Left Column: Car Image */}
                  <Box width={{ base: "200px", md: "300px" }}
                    height={{ base: "150px", md: "200px" }}
                    ml={{ base: -2, md: 0 }}
                    overflow="hidden"
                    borderRadius="8px"
                    _hover={{
                      transform: "scale(1.01) scaleX(-1)",
                      transition: "transform 0.3s ease-in",
                    }}>
                    {image && ImageUrl && index === car._id ? (<Image
                      src={ImageUrl}
                      alt="Car Image"
                      style={{
                        width: "300px",
                        height: "200px",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                      boxSize={{ base: "unset", md: "300px" }} // Adjust size as needed
                      objectFit="contain"
                      _hover={{
                        transform: "scale(1.01) scaleX(-1)",
                        transition: "0.03s ease-in transform",
                      }}
                    />) : car.carImage ? (<CldImage
                      src={car.carImage}
                      alt="Car Image"
                      width="300"
                      height="200"
                      style={{
                        width: "300px",
                        height: "200px",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />) : (<Image
                      src="car3.png"
                      alt="Car Image"
                      style={{
                        width: "300px",
                        height: "200px",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                      boxSize={{ base: "unset", md: "300px" }} // Adjust size as needed
                      objectFit="contain"
                      _hover={{
                        transform: "scale(1.01) scaleX(-1)",
                        transition: "0.03s ease-in transform",
                      }}
                    />)}

                  </Box>

                  {/* Right Column: Car Details */}
                  <Box display={{ base: "flex", md: "unset" }} flexDirection="column">
                    <Heading as="h3" size="xl" color="#00db00" mb={2} >
                      {car.model || "Car Name"}
                    </Heading>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 3fr)" }} gap={3}>
                      <Text fontSize="sm" mb={2}>
                        <Text as="span" color="lightgreen">Registration No:</Text> {car.registrationNumber}
                        <CopyToClipboard text={car.registrationNumber}>
                          <IconButton
                            icon={<CopyIcon />}
                            size="sm"
                            aria-label="Copy registration number"
                            ml={2} // Add margin-left to space out the button from the text
                            variant="ghost" // Optional: for a subtle button style
                            colorScheme="green" // Optional: set color
                            onClick={onCopy}
                          />
                        </CopyToClipboard>
                      </Text>
                      <Text fontSize="sm" mb={2}>
                        <Text as="span" color="lightgreen">Booking Status:</Text> {car.isHanded ? "Booked" : "Not Booked"}
                      </Text>
                      <Text fontSize="sm" mb={2}>
                        <Text as="span" color="lightgreen">Car Fuel Type:</Text> {car.carType || "N/A"}
                      </Text>
                      <Text fontSize="sm" mb={2}>
                        <HStack
                          spacing={1}
                          mb={{ base: 2, md: 4 }}
                          justify={{ base: "start", md: "start" }}
                        >
                          <Text as="span" color="lightgreen">Rating:</Text> {car.rating > 0 ? calculateStars(car.rating) : <Text>No Rating Yet</Text>}
                        </HStack>
                      </Text>
                    </Grid>
                    <Box mt={{ base: 0, md: 2 }}>
                      <Text fontSize="sm" mb={1} color="lightgreen">
                        Car Pricing:
                      </Text>
                      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={1}>
                        <Text fontSize="sm">- Weekly: ₹{car.carPricing?.weekly || "N/A"}</Text>
                        <Text fontSize="sm">- Monthly: ₹{car.carPricing?.monthly || "N/A"}</Text>
                        <Text fontSize="sm">- Quarterly: ₹{car.carPricing?.quarterly || "N/A"}</Text>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </GridItem>
            )
          ))}
        </Grid>
      ) : isFiltered ? (<Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
        flexDirection="column"
      >
        <Image src="/Resources/car-rent.png" alt="" h="50px" mb={2} />
        <Text color="greenyellow" mb={2}>
          Sorry, no cars match your filters. Please try adjusting your search criteria.
        </Text>
      </Box>
      ) : (<Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="75vh"
        flexDirection="column"
      >
        <Image src="/Resources/car-rent.png" alt="" h="50px" mb={2} />
        <Text color="greenyellow" mb={2}>
          No cars found in your inventory. Add a new car from Add Car Section to get started!
        </Text>
      </Box>)}
    </Box>
  );
};

export default Cars;

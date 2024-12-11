"use client";
import React, { useState } from "react";
import { Input, Button, Box, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { CldImage } from "next-cloudinary"; // Import the Cloudinary component

const FileUploadComponent = ({ folderName }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const toast = useToast();

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
    formData.append("folder", folderName); // Use dynamic folder name
    formData.append("upload_preset", "ml_default"); // Optional: If you're using presets in Cloudinary

    setLoading(true);

    // Log the payload being sent to Cloudinary
    console.log("Sending payload to Cloudinary:", formData);

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dyrllwwde/image/upload", // Cloudinary upload URL
        formData
      );
      setLoading(false);

      // Log the Cloudinary response
      console.log("Cloudinary response:", response.data);

      // Extract the URL from the response and set it
      const uploadedUrl = response.data.secure_url;
      setUploadedImageUrl(uploadedUrl);

      toast({
        title: "Image uploaded successfully!",
        description: "The image has been uploaded to Cloudinary.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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

  return (
    <Box mb={4}>
      <Input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        bg="gray.100"
        color="black"
      />
      <Button
        isLoading={loading}
        loadingText="Uploading"
        onClick={handleImageUpload}
        mt={2}
        colorScheme="teal"
        isFullWidth
      >
        Upload Image
      </Button>

      {uploadedImageUrl && (
        <Box mt={4}>
          <Text fontSize="lg" mb={2}>
            Uploaded Image:
          </Text>
          <CldImage
            src={uploadedImageUrl} // Use the uploaded image URL
            width="500" // You can adjust width and height
            height="500"
            alt="Uploaded Image"
            crop="fill"
          />
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
    </Box>
  );
};

export default FileUploadComponent;

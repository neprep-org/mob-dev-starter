import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import useProducts from "@/hooks/useProducts";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

const AddProduct = () => {
  const toast = useToast();
  const { createProduct, creatingProduct } = useProducts();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.price) {
      return toast.show("Please fill in all fields", {
        type: "danger",
      });
    }
    if (formData.price < 1) {
      return toast.show("Price must be greater than 0", {
        type: "danger",
      });
    }
    createProduct(formData, true);
  };

  return (
    <SafeAreaView className="justify-center h-full p-3 px-5">
      <View>
        <Text className="text-xl text-gray-800 font-rubiksemibold">
          Add Product
        </Text>
        <Text className="text-base text-gray-600">
          Fill in the form below to add a new product
        </Text>
      </View>
      <View className="mt-8 mb-5">
        <CustomInput
          value={formData.name}
          label="Product Name"
          placeholder="Enter product name"
          onChangeText={(val) => setFormData({ ...formData, name: val })}
        />
        <CustomInput
          value={formData.description}
          label="Description"
          placeholder="Enter product description"
          onChangeText={(val) => setFormData({ ...formData, description: val })}
          multiline
          numberOfLines={4}
          containerStyles="mt-3"
        />
        <CustomInput
          value={
            formData.price.toString() === "NaN" ? "" : formData.price.toString()
          }
          label="Price (in USD)"
          placeholder="Enter product price"
          onChangeText={(val) =>
            setFormData({ ...formData, price: parseInt(val) })
          }
          keyboardType="numeric"
          containerStyles="mt-3"
        />
        <CustomInput
          value={
            formData.quantity.toString() === "NaN"
              ? ""
              : formData.quantity.toString()
          }
          label="Quantity"
          placeholder="Enter available quantity"
          onChangeText={(val) =>
            setFormData({ ...formData, quantity: parseInt(val) })
          }
          keyboardType="numeric"
          containerStyles="mt-3"        />
      </View>
      <CustomButton
        title="Add Product"
        handlePress={handleSubmit}
        isLoading={creatingProduct}
        containerStyles="mt-8"
      />
    </SafeAreaView>
  );
};

export default AddProduct;

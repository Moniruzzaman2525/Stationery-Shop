/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useGetMeQuery, useUpdateUserMutation } from "../../redux/feathers/auth/authApi";
import SPForm from "../../components/form/SPForm";
import SPInput from "../../components/form/SPInput";
import { FieldValues } from "react-hook-form";
import { Skeleton } from "antd";

const Address = () => {
    const { data: getMeData, isFetching, refetch } = useGetMeQuery(undefined);
    const [isEditMode, setIsEditMode] = useState(false);
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
    const [isSameAddress, setIsSameAddress] = useState(false);

    const onSubmit = async (data: FieldValues) => {
        if (isSameAddress) {
            data.permanentAddress = { ...data.currentAddress };
        }
    
        const flattenedData = {
            currentCountry: data.currentAddress?.country,
            currentCity: data.currentAddress?.city,
            currentStreet: data.currentAddress?.address,
            permanentCountry: data.permanentAddress?.country,
            permanentCity: data.permanentAddress?.city,
            permanentStreet: data.permanentAddress?.address,
        };
    
        console.log(flattenedData);
    
        try {
            const res = await updateUser({ profileData: flattenedData });
            if (res) {
                setIsEditMode(false);
                refetch();
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };
    
    
    if (isFetching) {
        return (
            <div className="flex flex-col items-center mt-10 min-h-screen bg-gray-100">
                <Skeleton.Avatar active size="large" shape="square" className="mb-2" />
                <Skeleton active paragraph={{ rows: 2 }} />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center mt-10 min-h-screen bg-gray-100">
            <h1 className="text-xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                {isEditMode ? "Edit Your Address" : "Your Address"}
            </h1>
            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
                {isEditMode ? (
                    <SPForm onSubmit={onSubmit} defaultValues={getMeData}>
                        <div className="space-y-6">
                            {/* Current Address Section */}
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 mb-2">Current Address</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <SPInput
                                        type="text"
                                        name="currentAddress.country"
                                        label="Country"
                                    />
                                    <SPInput
                                        type="text"
                                        name="currentAddress.city"
                                        label="Select District"
                                    />
                                    <div className="col-span-1 md:col-span-2">
                                        <SPInput
                                            type="text"
                                            name="currentAddress.address"
                                            label="Street Address"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Checkbox for Same Address */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="sameAddress"
                                    checked={isSameAddress}
                                    onChange={(e) => setIsSameAddress(e.target.checked)}
                                    className="mr-2"
                                />
                                <label htmlFor="sameAddress" className="text-gray-800">
                                    Permanent address is the same as current address
                                </label>
                            </div>

                            {/* Permanent Address Section */}
                            {!isSameAddress && (
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800 mb-2">Permanent Address</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <SPInput
                                            type="text"
                                            name="permanentAddress.country"
                                            label="Country"
                                        />
                                        <SPInput
                                            type="text"
                                            name="permanentAddress.city"
                                            label="Select District"
                                        />
                                        <div className="col-span-1 md:col-span-2">
                                            <SPInput
                                                type="text"
                                                name="permanentAddress.address"
                                                label="Street Address"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={isUpdating}
                                className={`w-full cursor-pointer py-3 text-white rounded-lg transition ${
                                    isUpdating ? "bg-gray-500" : "bg-[#001845] hover:bg-[#00296b]"
                                }`}
                            >
                                {isUpdating ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </SPForm>
                ) : (
                    <div>
                        <div className="space-y-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-2">Current Address</h2>
                            <p className="text-gray-700">
                                <strong>Country:</strong> {getMeData?.currentCountry || "N/A"}
                            </p>
                            <p className="text-gray-700">
                                <strong>District:</strong> {getMeData?.currentCity || "N/A"}
                            </p>
                            <p className="text-gray-700">
                                <strong>Street:</strong> {getMeData?.currentStreet || "N/A"}
                            </p>

                            <h2 className="text-lg font-bold text-gray-800 mb-2">Permanent Address</h2>
                            <p className="text-gray-700">
                                <strong>Country:</strong> {getMeData?.permanentCountry || "N/A"}
                            </p>
                            <p className="text-gray-700">
                                <strong>District:</strong> {getMeData?.permanentCity || "N/A"}
                            </p>
                            <p className="text-gray-700">
                                <strong>Street:</strong> {getMeData?.permanentStreet || "N/A"}
                            </p>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={() => setIsEditMode(true)}
                                className="w-full cursor-pointer py-3 bg-[#001845] text-white rounded-lg hover:bg-[#00296b] transition"
                            >
                                Edit Address
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Address;

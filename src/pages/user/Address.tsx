/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useGetMeQuery, useUpdateUserMutation } from "../../redux/feathers/auth/authApi";
import SPForm from "../../components/form/SPForm";
import SPInput from "../../components/form/SPInput";
import { FieldValues } from "react-hook-form";
import { Skeleton } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "../../schema/address.schema";

const Address = () => {
    const { data: getMeData, isFetching, refetch } = useGetMeQuery(undefined);
    const [isEditMode, setIsEditMode] = useState(false);
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    const onSubmit = async (data: FieldValues) => {
        try {
            const res = await updateUser({ profileData: data });
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
                    <SPForm resolver={zodResolver(addressSchema)} onSubmit={onSubmit} defaultValues={getMeData}>
                        <div className="space-y-1">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 !mb-6">Current Address</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <SPInput
                                            type="text"
                                            name="currentCountry"
                                            label="Country"
                                        />
                                    </div>
                                    <div className="mt-[-40px] md:mt-0">
                                        <SPInput
                                            type="text"
                                            name="currentCity"
                                            label="Select District"
                                        />
                                    </div>
                                    <div className="col-span-1 mt-[-40px] md:col-span-2">
                                        <SPInput
                                            type="text"
                                            name="currentStreet"
                                            label="Street Address"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[-12px]">
                                <h2 className="text-lg  font-bold text-gray-800 !mb-6">Permanent Address</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <SPInput
                                            type="text"
                                            name="permanentCountry"
                                            label="Country"
                                        />
                                    </div>
                                    <div className="mt-[-40px] md:mt-0">
                                        <SPInput
                                            type="text"
                                            name="permanentCity"
                                            label="Select District"
                                        />
                                    </div>
                                    <div className="col-span-1 mt-[-40px] md:col-span-2">
                                        <SPInput
                                            type="text"
                                            name="permanentStreet"
                                            label="Street Address"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <button
                                type="submit"
                                disabled={isUpdating}
                                className={`w-full cursor-pointer py-3 !text-white rounded-lg transition ${isUpdating ? "bg-gray-500" : "bg-[#001845] "
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
                                className="w-full cursor-pointer py-3 bg-[#001845] !text-white rounded-lg  transition"
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

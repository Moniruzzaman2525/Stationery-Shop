/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { Skeleton } from "antd";
import SPForm from "../../components/form/SPForm";
import SPInput from "../../components/form/SPInput";
import { SPSelect } from "../../components/form/SPSelect";
import { ageOption, bloodOption, genderOption } from "../../constants/userConstant";
import { useGetMeQuery, useUpdateUserMutation } from "../../redux/feathers/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../../schema/profile.schema";
import { uploadImageToImgBB } from "../../utils/uploadImageToImgBB";

const UserDashboard = () => {
    const { data: getMeData, isFetching, refetch } = useGetMeQuery(undefined);
    const [isEditMode, setIsEditMode] = useState(false);
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    const onSubmit = async (data: FieldValues) => {
        console.log(data)
        try {
            const userData = {
                profileData: Object.fromEntries(
                    Object.entries(data).filter(([_, value]) => value !== undefined)
                ),
            };

            if (data.photo) {
                const imageUrl = await uploadImageToImgBB(data.photo);
                if (imageUrl) {
                    userData.profileData.photo = imageUrl;
                } else {
                    throw new Error("Photo upload failed");
                }
            }

            const res = await updateUser(userData);
            if (res) {
                setIsEditMode(false);
                refetch(); // Refresh user data after update
            } else {
                throw new Error("User update failed");
            }
        } catch (error) {
            console.error("Error updating user data:", error);
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
        <div>
            <div className="flex flex-col items-center mt-10 min-h-screen bg-gray-100">
                <h1 className="text-xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                    {isEditMode ? "Edit Your Profile" : "Your Profile"}
                </h1>
                <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
                    {isEditMode ? (
                        <SPForm resolver={zodResolver(profileSchema)} onSubmit={onSubmit} defaultValues={getMeData}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div>
                                        <SPInput
                                            type="text"
                                            name="name"
                                            label="Name"
                                        />
                                    </div>
                                    <div className="mt-[-15px]">
                                        <SPSelect
                                            name="age"
                                            label="Age Range"
                                            options={ageOption}
                                        />
                                    </div>
                                    <div className="mt-[-15px]">
                                        <SPSelect
                                            name="blood"
                                            label="Blood Group"
                                            options={bloodOption}
                                        />
                                    </div>
                                    
                                </div>
                                <div>
                                    <div className="mt-[-3px]">
                                        <SPInput
                                            disabled={true}
                                            type="text"
                                            name="email"
                                            label="Email"
                                        />
                                    </div>
                                    <div className="mt-[-10px]">
                                        <SPSelect
                                            name="gender"
                                            label="Gender"
                                            options={genderOption}
                                        />
                                    </div>
                                    <div className="mt-[-17px]">
                                        <SPInput
                                            type="text"
                                            name="phone"
                                            label="Phone"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className={`w-full cursor-pointer py-3 !text-white rounded-lg transition ${isUpdating ? 'bg-gray-500' : 'bg-[#001845] '}`}
                                >
                                    {isUpdating ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </SPForm>
                    ) : (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-gray-700 font-medium mb-2">Name: {getMeData?.name || "N/A"}</p>
                                    <p className="text-gray-700 font-medium mb-2">Age Range: {getMeData?.age || "N/A"}</p>
                                    <p className="text-gray-700 font-medium mb-2">Blood Group: {getMeData?.blood || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-700 font-medium mb-2">Email: {getMeData?.email || "N/A"}</p>
                                    <p className="text-gray-700 font-medium mb-2">Gender: {getMeData?.gender || "N/A"}</p>
                                    <p className="text-gray-700 font-medium mb-2">Phone: {getMeData?.phone || "N/A"}</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    onClick={() => setIsEditMode(true)}
                                    className="w-full cursor-pointer py-3 bg-[#001845] !text-white rounded-lg  transition"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;

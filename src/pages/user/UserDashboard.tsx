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
import UserProfile from "../../components/ui/UserProfile";

const UserDashboard = () => {
    const { data: getMeData, isFetching, refetch } = useGetMeQuery(undefined);
    const [isEditMode, setIsEditMode] = useState(false);
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    const onSubmit = async (data: FieldValues) => {
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
                refetch(); 
            } else {
                throw new Error("User update failed");
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    if (isFetching) {
        return (
            <div className="flex flex-col items-center mt-10 min-h-screen bg-[#F9F9FB]">
                <Skeleton.Avatar active size="large" shape="square" className="mb-2" />
                <Skeleton active paragraph={{ rows: 2 }} />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col items-center mt-10 min-h-screen bg-[#F9F9FB]">
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
                           <UserProfile setIsEditMode={setIsEditMode} getMeData={getMeData ?? null} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;

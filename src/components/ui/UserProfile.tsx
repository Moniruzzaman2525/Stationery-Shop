import React from "react";
import { TUser } from "../../types";

interface UserProfileProps {
    setIsEditMode: (editMode: boolean) => void;
    getMeData: Partial<TUser> | null
}

const UserProfile: React.FC<UserProfileProps> = ({ setIsEditMode, getMeData }) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <p className="text-gray-700 font-medium mb-2">
                        Name: {getMeData?.name || "N/A"}
                    </p>
                    <p className="text-gray-700 font-medium mb-2">
                        Age Range: {getMeData?.age || "N/A"}
                    </p>
                    <div className="flex items-center mb-2">
                        <span className="text-gray-700 font-medium mr-2">Blood Group:</span>
                        {getMeData?.blood ? (
                            <span className="inline-block bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full">
                                {getMeData.blood}
                            </span>
                        ) : (
                            <span className="text-gray-500">N/A</span>
                        )}
                    </div>
                </div>
                <div>
                    <p className="text-gray-700 font-medium mb-2">
                        Email: {getMeData?.email || "N/A"}
                    </p>
                    <p className="text-gray-700 font-medium mb-2">
                        Gender: {getMeData?.gender || "N/A"}
                    </p>
                    <p className="text-gray-700 font-medium mb-2">
                        Phone: {getMeData?.phone || "N/A"}
                    </p>
                </div>
            </div>
            <div className="mt-6">
                <button
                    onClick={() => {
                        if (typeof setIsEditMode === "function") {
                            setIsEditMode(true);
                        } else {
                            console.error("setIsEditMode is not a valid function");
                        }
                    }}
                    className="w-full cursor-pointer py-3 bg-[#001845] !text-white rounded-lg transition"
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default UserProfile;

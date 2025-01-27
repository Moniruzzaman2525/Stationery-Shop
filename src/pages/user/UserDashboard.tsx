import { Controller } from "react-hook-form";
import SPForm from "../../components/form/SPForm";
import SPInput from "../../components/form/SPInput";
import { SPSelect } from "../../components/form/SPSelect";
const genderOption = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
]

const UserDashboard = () => {
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div>
            <div className="flex flex-col items-center mt-10 min-h-screen bg-gray-100">
                <h1 className="text-xl md:text-3xl font-bold mb-6 text-center text-gray-800">
                    Update Your Profile
                </h1>
                <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
                    <SPForm onSubmit={onSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <SPInput type="text" name="name" label="Name" />
                                <SPInput type="text" name="dateOfBirth" label="Date Of birth" />
                                <SPInput type="text" name="city" label="City" />
                                <SPInput type="text" name="postal" label="Postal" />
                                <div>
                                    <Controller
                                        name="photo"
                                        render={({ field: { onChange, ref } }) => (
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-medium mb-2">
                                                    Profile Photo
                                                </label>
                                                <input
                                                    type="file"
                                                    className="w-full border border-gray-300 rounded-lg p-2"
                                                    ref={ref}
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            onChange(file);
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                            <div>
                                <SPInput type="text" name="email" label="Email" />
                                <SPSelect name="gender" label="Gender" options={genderOption} />
                                 <SPInput type="text" name="address" label="Address" />
                                 <SPInput type="text" name="phone" label="Phone" />
                                 <SPInput type="text" name="country" label="Country" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full cursor-pointer py-3 bg-[#001845] text-white rounded-lg hover:bg-[#00296b] transition"

                            >
                                Submit
                            </button>
                        </div>
                    </SPForm>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
import { useState} from "react";
import SpeechField from "../type/SpeechField";
import SpeechWrapper from "../type/SpeechWapper";
import { useSpeechSynthesis } from "react-speech-kit";
import { getTextByLanguage } from "../i18n/i18n";
import { useTranslation } from "react-i18next";

function Form() {
    const {t}=useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        gender: "",
    });

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const { speak, cancel } = useSpeechSynthesis();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
    };


    return (
        <div className="max-w-2xl mx-auto p-6 font-sans">
            <SpeechWrapper>
                <h1 className="text-3xl font-bold text-gray-800">Form</h1>
            </SpeechWrapper>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <SpeechField label={t("common:forms.name")} speechText="Enter your full name">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </SpeechField>

                <SpeechField label={getTextByLanguage("Email", "पुष्टीकरण")} speechText="Enter your email address">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </SpeechField>

                <SpeechField label="Age" speechText="Enter your age">
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </SpeechField>

                <SpeechField label="Gender" speechText="Select your gender">
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select gender</option>
                        <option
                            value="male"
                            onMouseEnter={() =>
                                speak({ text: "Male option", rate: 1, pitch: 1 })
                            }
                            onMouseLeave={cancel}
                        >
                            Male
                        </option>

                        <option
                            value="female"
                            onMouseEnter={() =>
                                speak({ text: "Female option", rate: 1, pitch: 1 })
                            }
                            onMouseLeave={cancel}
                        >
                            Female
                        </option>

                        <option
                            value="other"
                            onMouseEnter={() =>
                                speak({ text: "Other option", rate: 1, pitch: 1 })
                            }
                            onMouseLeave={cancel}
                        >
                            Other
                        </option>
                    </select>
                </SpeechField>

                <button
                    type="submit"
                    onMouseEnter={() => speak({ text: "Submit Form", rate: 1, pitch: 1 })}
                    onMouseLeave={cancel}
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Form;
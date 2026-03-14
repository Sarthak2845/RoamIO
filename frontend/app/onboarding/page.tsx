"use client";

import { useState } from "react";
import axios from "axios";
import { MdFlight, MdPerson, MdCheck, MdArrowBack, MdArrowForward } from "react-icons/md";
import { GiForest, GiMountainRoad, GiPalmTree } from "react-icons/gi";
import { FaBus, FaTrain, FaPlane, FaCar, FaLeaf, FaDrumstickBite, FaSeedling } from "react-icons/fa";
import { MdMuseum, MdNightlife, MdRestaurant, MdTempleHindu, MdSportsHandball } from "react-icons/md";

const API = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000/api";

type Preferences = {
    foodPreference: string;
    placeTypes: string[];
    explorationInterests: string[];
    transportPreference: string;
};

const steps = [
    { id: 1, title: "What's on the menu?", subtitle: "We curate dining experiences based on your dietary lifestyle.", field: "foodPreference" },
    { id: 2, title: "Where do you wander?", subtitle: "Pick the landscapes that call to your soul.", field: "placeTypes" },
    { id: 3, title: "What excites you?", subtitle: "Choose the experiences that make your trips unforgettable.", field: "explorationInterests" },
    { id: 4, title: "How do you roll?", subtitle: "Your preferred way to get from A to B.", field: "transportPreference" },
];

const foodOptions = [
    { value: "veg", label: "Vegetarian", desc: "Plant-based including dairy and eggs.", Icon: FaLeaf },
    { value: "non_veg", label: "Non-Vegetarian", desc: "Includes meat, poultry, and seafood.", Icon: FaDrumstickBite },
    { value: "vegan", label: "Vegan", desc: "Strictly plant-based, cruelty-free.", Icon: FaSeedling },
];

const placeOptions = [
    { value: "beach", label: "Beach", desc: "Sun, sand, and ocean waves.", Icon: GiPalmTree },
    { value: "mountain", label: "Mountain", desc: "Peaks, trails, and fresh air.", Icon: GiMountainRoad },
    { value: "jungle", label: "Jungle", desc: "Dense forests and wildlife.", Icon: GiForest },
];

const interestOptions = [
    { value: "food", label: "Food", desc: "Local cuisines and street food.", Icon: MdRestaurant },
    { value: "heritage", label: "Heritage", desc: "Historical sites and monuments.", Icon: MdMuseum },
    { value: "culture", label: "Culture", desc: "Art, music, and local traditions.", Icon: MdMuseum },
    { value: "religious", label: "Religious", desc: "Temples, churches, and sacred sites.", Icon: MdTempleHindu },
    { value: "adventure", label: "Adventure", desc: "Thrilling outdoor activities.", Icon: MdSportsHandball },
    { value: "nightlife", label: "Nightlife", desc: "Bars, clubs, and evening entertainment.", Icon: MdNightlife },
];

const transportOptions = [
    { value: "flight", label: "Flight", desc: "Fast and comfortable air travel.", Icon: FaPlane },
    { value: "train", label: "Train", desc: "Scenic and relaxing rail journeys.", Icon: FaTrain },
    { value: "bus", label: "Bus", desc: "Budget-friendly road travel.", Icon: FaBus },
    { value: "self_drive", label: "Self Drive", desc: "Freedom to explore at your own pace.", Icon: FaCar },
];

export default function OnboardingPage() {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [preferences, setPreferences] = useState<Preferences>({
        foodPreference: "",
        placeTypes: [],
        explorationInterests: [],
        transportPreference: "",
    });

    const currentStep = steps[step];
    const progress = Math.round(((step + 1) / steps.length) * 100);

    const isMultiSelect = currentStep.field === "placeTypes" || currentStep.field === "explorationInterests";

    const handleSelect = (value: string) => {
        if (isMultiSelect) {
            const field = currentStep.field as "placeTypes" | "explorationInterests";
            const current = preferences[field];
            setPreferences({
                ...preferences,
                [field]: current.includes(value) ? current.filter(v => v !== value) : [...current, value],
            });
        } else {
            setPreferences({ ...preferences, [currentStep.field]: value });
        }
    };

    const isSelected = (value: string) => {
        const field = currentStep.field as keyof Preferences;
        const val = preferences[field];
        return Array.isArray(val) ? val.includes(value) : val === value;
    };

    const canContinue = () => {
        const field = currentStep.field as keyof Preferences;
        const val = preferences[field];
        return Array.isArray(val) ? val.length > 0 : val !== "";
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.post(`${API}/preferences`, preferences, { withCredentials: true });
            window.location.href = "/dashboard";
        } catch (err) {
            console.error("Failed to save preferences", err);
        } finally {
            setLoading(false);
        }
    };

    const getOptions = () => {
        switch (currentStep.field) {
            case "foodPreference": return foodOptions;
            case "placeTypes": return placeOptions;
            case "explorationInterests": return interestOptions;
            case "transportPreference": return transportOptions;
            default: return [];
        }
    };

    return (
        <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
            {/* Decorative blobs */}
            <div className="pointer-events-none fixed -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px]"></div>
            <div className="pointer-events-none fixed -bottom-24 -left-24 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]"></div>

            <div className="mx-auto flex w-full max-w-3xl flex-col px-4 py-8 md:px-10 min-h-screen">
                {/* Header */}
                <header className="flex items-center justify-between border-b border-blue-500/10 pb-6 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-500">
                            <MdFlight size={24} />
                        </div>
                        <h2 className="text-xl font-extrabold tracking-tight text-white">RoamIO</h2>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                        <MdPerson size={20} />
                    </div>
                </header>

                {/* Progress */}
                <div className="flex flex-col gap-3 mb-10">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">Step {step + 1} of {steps.length}</span>
                        <span className="text-sm font-medium text-slate-400">{progress}% Completed</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-blue-500/10">
                        <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                {/* Title */}
                <div className="mb-8">
                    <h1 className="text-4xl font-black tracking-tighter text-white sm:text-5xl">{currentStep.title}</h1>
                    <p className="mt-3 text-lg text-slate-400">{currentStep.subtitle}</p>
                    {isMultiSelect && <p className="mt-1 text-sm text-blue-500">Select all that apply</p>}
                </div>

                {/* Options */}
                <div className="grid gap-4">
                    {getOptions().map(({ value, label, desc, Icon }) => {
                        const selected = isSelected(value);
                        return (
                            <button
                                key={value}
                                onClick={() => handleSelect(value)}
                                className={`flex items-center gap-5 rounded-2xl p-6 text-left transition-all border ${selected
                                    ? "border-blue-500 bg-blue-500/10"
                                    : "border-white/10 bg-white/3 hover:border-blue-500/40 backdrop-blur-md"
                                    }`}
                            >
                                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors ${selected ? "bg-blue-500/20 text-blue-500" : "bg-white/5 text-slate-400"}`}>
                                    <Icon size={28} />
                                </div>
                                <div className="flex grow flex-col">
                                    <h3 className="text-lg font-bold text-white">{label}</h3>
                                    <p className="text-sm text-slate-400">{desc}</p>
                                </div>
                                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${selected ? "border-blue-500 bg-blue-500" : "border-white/20"}`}>
                                    {selected && <MdCheck size={14} className="text-black" />}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-10 flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => setStep(s => s - 1)}
                        disabled={step === 0}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/5 py-4 font-bold text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <MdArrowBack size={20} /> Back
                    </button>
                    <button
                        onClick={step === steps.length - 1 ? handleSubmit : () => setStep(s => s + 1)}
                        disabled={!canContinue() || loading}
                        className="flex-[2] flex items-center justify-center gap-2 rounded-xl bg-blue-500 py-4 font-bold text-black hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/25"
                    >
                        {loading ? "Saving..." : step === steps.length - 1 ? "Finish" : "Continue"}
                        {!loading && <MdArrowForward size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
}

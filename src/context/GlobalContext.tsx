import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import uuid from 'react-native-uuid'; // ✅ Import UUID for unique IDs

interface Job {
    id: string;
    title: string;
    description: string;
    mainCategory: string;
    applicationLink: string;
    pubDate: number;
    expiryDate: number;
    companyName: string;
    companyLogo: string;
    jobType: string;
    workModel: string;
    seniorityLevel: string;
    minSalary: number | null;
    maxSalary: number | null;
    locations: string[];
    tags: string[];
}

interface GlobalContextProps {
    jobs: Job[];
    savedJobs: Job[];
    appliedJobs: Job[];
    fetchJobs: () => void;
    loading: boolean;
    saveJob: (job: Job) => void;
    applyJob: (job: Job) => void;
    removeJob: (jobId: string) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);


export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [savedJobs, setSavedJobs] = useState<Job[]>([]);
    const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');
    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
    const fetchJobs = async () => {
        try {
            const response = await fetch('https://empllo.com/api/v1');
            const data = await response.json();
            const jobsArray = Array.isArray(data) ? data : data.jobs;
            if (!jobsArray) {
                throw new Error("No jobs array found in the response");
            }
            const jobsWithId = jobsArray.map((job: any) => ({
                id: job.id ? job.id.toString() : uuid.v4(),
                title: job.title || "",
                description: job.description || "",
                mainCategory: job.mainCategory || "",
                applicationLink: job.applicationLink || "",
                pubDate: job.pubDate || "",
                expiryDate: job.expiryDate || "",
                companyName: job.companyName || "",
                companyLogo: job.companyLogo || "",
                jobType: job.jobType || "",
                workModel: job.workModel || "",
                seniorityLevel: job.seniorityLevel || "",
                minSalary: Number(job.minSalary) || 0,
                maxSalary: Number(job.maxSalary) || 0,
                locations: Array.isArray(job.locations) ? job.locations : [],
                tags: Array.isArray(job.tags) ? job.tags : [],
            }));
            setJobs(jobsWithId);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveJob = (job: Job) => {
        setSavedJobs((prevJobs) => {
            if (prevJobs.some((savedJob) => savedJob.id === job.id)) return prevJobs;
            return [...prevJobs, job];
        });
    };

    const applyJob = (job: Job) => {
        setAppliedJobs((prevJobs) => {
            if (prevJobs.some((appliedJob) => appliedJob.id === job.id)) return prevJobs;
            return [...prevJobs, job];
        });
    };

    const removeJob = (jobId: string) => {
        setSavedJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <GlobalContext.Provider value={{ jobs, savedJobs, appliedJobs, fetchJobs, loading, applyJob, saveJob, removeJob, isDarkMode, toggleDarkMode }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};
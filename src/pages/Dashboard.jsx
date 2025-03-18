import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../sections/sidebar";

const Dashboard = () => {
    const location = useLocation();
    const { user, courses } = location.state || {};
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedSubCourse, setSelectedSubCourse] = useState(null);
    const [videoSrc, setVideoSrc] = useState("https://www.w3schools.com/html/mov_bbb.mp4"); // Static video link for now

    /*
    // Secure video fetching (Commented out for now)
    useEffect(() => {
        if (selectedSubCourse !== null) {
            // Fetch the video securely from the backend
            fetch(`https://your-backend.com/video/${selectedSubCourse}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user?.user_token}`, // Secure access
                },
            })
                .then((res) => res.blob()) // Convert response to Blob
                .then((blob) => {
                    const blobUrl = URL.createObjectURL(blob);
                    setVideoSrc(blobUrl);
                })
                .catch((err) => console.error("Error fetching video", err));
        }
    }, [selectedSubCourse]);
    */

    if (!user) {
        return <div className="text-center text-red-500 mt-10">No user data available. Please login.</div>;
    }

    return (
        <div className="flex pt-16">
            <Sidebar
                courses={courses}
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                selectedSubCourse={selectedSubCourse}
                setSelectedSubCourse={setSelectedSubCourse}
            />
            <div className="w-3/4 p-6">
                <h1 className="text-2xl font-bold">Welcome, {user.customer_name}</h1>

                {selectedCourse !== null && (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">{courses[selectedCourse].course_name}</h2>

                        {selectedSubCourse !== null && (
                            <div className="mt-6">
                                <video
                                    className="mt-2 w-full max-w-3xl rounded-lg shadow-lg"
                                    controls
                                    onContextMenu={(e) => e.preventDefault()} // Disable right-click
                                    disablePictureInPicture
                                    controlsList="nodownload"
                                >
                                    <source src={videoSrc} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

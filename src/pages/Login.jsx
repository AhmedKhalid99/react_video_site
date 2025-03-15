import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [machineIp, setMachineIp] = useState("unknown");

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        setMachineIp(data.ip);
      } catch (error) {
        console.error("Failed to fetch IP address", error);
      }
    };
    fetchIp();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Step 1: Get Admin Token
      const tokenResponse = await fetch(
        "https://magento-dev.tatayab.com/rest/V1/integration/admin/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "sadia.anwar@tatayab.com",
            password: "Ttkwsadia@2025",
          }),
        }
      );
      
      if (!tokenResponse.ok) throw new Error("Failed to get admin token");
      const bearerToken = await tokenResponse.json();
      
      // Step 2: Validate Customer Login
      const loginResponse = await fetch(
        "https://magento-dev.tatayab.com/CustomerLogin/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
          body: JSON.stringify({
            email,
            password,
            machine_ip: machineIp, // Dynamically fetched IP
          }),
        }
      );
      
      const loginData = await loginResponse.json();
      if (loginData.Status !== 200) {
        toast.error("User not found");
        throw new Error("Invalid credentials");
      }
      
      setCourses(loginData["Courses-details"]);
      toast.success("Login successful!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {courses && (
          <div className="mt-4">
            <h3 className="font-bold">Your Courses:</h3>
            <ul>
              {courses.map((course) => (
                <li key={course.Courses_id} className="border-b p-2">
                  {course.Course_Name} - Parts: {course.Course_part.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

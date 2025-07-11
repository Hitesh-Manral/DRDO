import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Complaint from "./Complaint";
import AdminComplaints from "./AdminComplaint";
import { GetAuthHeader } from "../testing/Headers";

function Dashboard() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const response = await fetch("http://localhost:3000/userType", {
          method: "GET",
          headers: GetAuthHeader(),
        });

        if (response.ok) {
          const data = await response.json();
          setUserType(data.userType);
        } else {
          console.error("Failed to fetch user type");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserType();
  }, []);

  return (
    <>
      <Navbar />
      {userType === "customer" ? <Complaint /> : null}
      {userType === "admin" ? <AdminComplaints /> : null}
    </>
  );
}

export default Dashboard;

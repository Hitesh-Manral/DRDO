import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/Auth";

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const formatTimestamp1 = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const ComplaintForm = () => {
  const { authToken, headers } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fault, setFault] = useState("");
  const [address, setAddress] = useState(null); // Updated from blockId
  const [pickupLocation, setPickupLocation] = useState(null); // Updated from customerId
  const [phoneNo, setPhoneNo] = useState(""); // New state for phone_no
  const [repairLocation, setRepairLocation] = useState(""); // New state for repair_location
  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!name || name.trim() === "") {
      alert("Please enter a valid name.");
      return;
    }
    if (!fault || fault.trim() === "") {
      alert("Please enter Room No.");
      return;
    }
    if (!description || description.trim() === "") {
      alert("Please enter a valid complaint.");
      return;
    }

    try {
      const body = {
        name,
        description,
        fault,
        address, // Updated
        pickup_location: pickupLocation, // Updated
        phone_no: phoneNo, // Include phone_no
        repair_location: repairLocation, // Include repair_location
      };
      const response = await fetch("http://localhost:3000/complaints", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <section class="bg-gray-100 py-12 text-gray-800 sm:py-24 h-full">
        <div class="bg-gray-100 mx-auto flex max-w-md flex-col rounded-lg lg:max-w-screen-xl lg:flex-row">
          <div class="max-w-2xl px-4 lg:pr-24">
            <p class="mb-2 text-blue-600">Welcome to FixIT Hub</p>
            <h3 class="mb-5 text-3xl font-semibold">Submit Your Grievance</h3>
            <p class="mb-16 text-md text-gray-600">
              At FixIT Hub, we're more than just a repair platform. With a
              passion for problem-solving and a commitment to customer
              satisfaction, we've been serving our community with top-notch
              computer and gadget repairs since 2020.
            </p>
            <div class="mb-5 flex font-medium">
              <div class="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-7 w-7 text-blue-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
                  />
                </svg>
              </div>
              <div class="">
                <p class="mb-2">Our Mission</p>
                <span class="font-normal text-gray-600">
                  Our mission is simple: to breathe new life into your devices
                  and keep you connected to what matters most. Whether it's a
                  cracked screen, a sluggish system, or a mysterious
                  malfunction, our team of experienced technicians is here to
                  diagnose, repair, and rejuvenate your technology quickly and
                  affordably.
                </span>
              </div>
            </div>
            <div class="mb-5 flex font-medium">
              <div class="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-7 w-7 text-blue-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
              <div class="">
                <p class="mb-2">Why Choose FixIT Hub?</p>
                <span class="font-normal text-gray-600">
                  <p style={{ fontWeight: "300" }}>
                    <p style={{ fontSize: "30px" }}>
                      <li>Expertise</li>
                    </p>
                    Our technicians are highly skilled and certified in a wide
                    range of repairs, ensuring your devices are in capable
                    hands.
                  </p>
                  <p style={{ fontWeight: "300" }}>
                    <p style={{ fontSize: "30px" }}>
                      <li>Quality Service</li>
                    </p>{" "}
                    We believe in doing the job right the first time. With
                    meticulous attention to detail and thorough testing, we
                    ensure that your device leaves our shop in optimal
                    condition.
                  </p>
                  <p style={{ fontWeight: "300" }}>
                    <p style={{ fontSize: "30px" }}>
                      <li>Fast Turnaround</li>
                    </p>{" "}
                    We understand the importance of your devices in your daily
                    life. That's why we strive to provide prompt service without
                    compromising on quality.
                  </p>
                  <p style={{ fontWeight: "300" }}>
                    <p style={{ fontSize: "30px" }}>
                      <li>Affordability</li>
                    </p>{" "}
                    We offer competitive pricing and transparent quotes, so you
                    know exactly what to expect without any surprises.
                  </p>
                  <p style={{ fontWeight: "300" }}>
                    <p style={{ fontSize: "30px" }}>
                      <li>Customer Satisfaction</li>
                    </p>{" "}
                    Your satisfaction is our priority. From the moment you walk
                    through our doors to the completion of your repair, we're
                    dedicated to providing friendly, professional service that
                    exceeds your expectations.
                  </p>
                </span>
              </div>
            </div>
            <div class="mb-5 flex font-medium">
              <div class="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-7 w-7 text-blue-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <div class="">
                <p class="mb-2">Our Services</p>
                <span class="font-normal text-gray-600">
                  <p>
                    At FixIT Hub, we specialize in a wide range of repair
                    services, including
                  </p>
                  <p>
                    <li>Laptop Repair</li>
                  </p>
                  <p>
                    <li>Desktop Repair</li>
                  </p>
                  <p>
                    <li>Smartphone Repair</li>
                  </p>
                  <p>
                    <li>Tablet Repair</li>
                  </p>
                  <p style={{ fontSize: "40px" }}>And much more!</p>
                </span>
              </div>
            </div>
          </div>
          <div class="border border-gray-100 shadow-gray-500/20 mt-8 mb-8 max-w-md bg-white shadow-sm sm:rounded-lg sm:shadow-lg lg:mt-0">
            <div class="relative border-b border-gray-300 p-4 py-8 sm:px-8">
              <h3 class="mb-1 inline-block text-3xl font-medium">
                <span class="mr-4">Submit Complaint</span>
                <span class="inline-block rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-700 sm:inline">
                  Quick Response
                </span>
              </h3>
              <p class="text-gray-600">Contact us for faulty items repair</p>
            </div>
            <div class="p-4 sm:p-8">
              <input
                id="name"
                type="text"
                class="mt-1 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                placeholder="Enter  name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                id="fault"
                type="text"
                class="peer mt-8 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                placeholder="Enter Faulty item name"
                onChange={(e) => setFault(e.target.value)}
              />

              <input
                id="address"
                type="text"
                class="peer mt-8 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                placeholder="User address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                id="location"
                type="text"
                class="peer mt-8 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                placeholder="Item pickup location"
                onChange={(e) => setPickupLocation(e.target.value)}
              />
              <input
                id="repairLocation"
                type="text"
                list="repair-locations"
                class="peer mt-8 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                placeholder="Enter repair location"
                onChange={(e) => setRepairLocation(e.target.value)}
              />

              <datalist id="repair-locations">
                <option value="Mumbai Repair Center" />
                <option value="Delhi Service Hub" />
                <option value="Bangalore Tech Repair" />
                <option value="Chennai Electronics Fix" />
                <option value="Hyderabad Service Zone" />
                <option value="Kolkata Repair Hub" />
                <option value="Pune Gadget Care" />
                <option value="Ahmedabad Service Center" />
                <option value="Jaipur Repair Workshop" />
                <option value="Lucknow Device Fix" />
              </datalist>

              <input
                id="phoneNo"
                type="text"
                class="peer mt-8 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                placeholder="Enter phone no"
                onChange={(e) => setPhoneNo(e.target.value)}
              />
              <label class="mt-5 mb-2 inline-block max-w-full">
                Tell us about your Faulty iteam details
              </label>
              <textarea
                id="about"
                class="mb-8 w-full resize-y overflow-auto rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none hover:border-blue-500"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <button
                class="w-full rounded-lg border border-blue-700 bg-blue-700 p-3 text-center font-medium text-white outline-none transition focus:ring hover:border-blue-700 hover:bg-blue-600 hover:text-white"
                onClick={onSubmitForm}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const Complaint = () => {
  const { headers } = useAuth();
  const [complaints, setComplaints] = useState([]);

  const getComplaints = async (e) => {
    try {
      const response = await fetch("http://localhost:3000/complaints", {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch complaints");
      }

      const jsonData = await response.json();

      // Ensure data is an array before setting state
      if (Array.isArray(jsonData)) {
        setComplaints(jsonData);
      } else {
        console.error("Received invalid complaints data:", jsonData);
        setComplaints([]);
      }
    } catch (err) {
      console.error("Error fetching complaints:", err.message);
      setComplaints([]);
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  console.log(complaints);

  return (
    <>
      <div className="bg-gray-100 p-4 sm:p-8 md:p-10 h-screen">
        <h1 className="text-2xl font-bold mt-20 mb-8">
          Faulty items Complaints
        </h1>
        {complaints.length === 0 ? (
          <p className="ml-4 mt-2 text-gray-600 text-xl">
            No complaints registered yet.
          </p>
        ) : (
          <div className="container mx-auto grid gap-8 md:grid-cols-3 sm:grid-cols-1">
            {complaints.map((complaint) => (
              <div
                key={complaint.complaint_id}
                className="relative flex h-full flex-col rounded-md border border-gray-200 bg-white p-2.5 hover:border-gray-400 sm:rounded-lg sm:p-5"
              >
                <div className="text-lg mb-2 font-semibold text-gray-900 hover:text-black sm:mb-1.5 sm:text-2xl">
                  {complaint.name}
                </div>
                <p className="text-sm">
                  Created on {formatTimestamp1(complaint.created_at)}
                </p>
                <p className="mb-4 text-sm">
                  {complaint.assigned_at
                    ? `Completed on ${formatTimestamp(complaint.assigned_at)}`
                    : null}
                </p>
                <div
                  className="text-md leading-normal text-gray-400 sm:block overflow-hidden"
                  style={{ maxHeight: "100px" }}
                >
                  {complaint.description}
                </div>
                <button
                  className={`group flex w-1/3 mt-3 cursor-pointer items-center justify-center rounded-md px-4 py-2 text-white transition text-sm ${
                    complaint.is_completed ? "bg-green-500" : "bg-red-600"
                  }`}
                >
                  <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
                    {complaint.is_completed ? "Completed" : "Not Completed"}
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}

        <ComplaintForm />
      </div>
    </>
  );
};

export default Complaint;

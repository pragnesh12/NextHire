import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const { handleSubmit, reset } = useForm();

  const [inputs, setInputs] = useState({
    jobTitle: "",
    companyName: "",
    minPrice: "",
    maxPrice: "",
    salaryType: "",
    jobLocation: "",
    postingDate: "",
    experienceLevel: "",
    companyLogo: "",
    employmentType: "",
    description: "",
    postedBy: "",
  });

  const handleOnSubmit = async () => {
    const updatedInputs = {
      ...inputs,
      skills: selectedOption.map((option) => option.value), // Extract values from selectedOption
    };

    console.log("updatesInputs  : ", updatedInputs);
    await fetch("http://localhost:3000/post-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedInputs),
    })
      .then((res) => {
        // Check if response is OK before parsing JSON
        console.log("res", res);
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        if (result.acknowledged === true) {
          alert("Job Posted Successfully");
        }
        alert("Job Posted Successfully");
        reset();
        setSelectedOption([]);
      })
      .catch((error) => {
        console.error("Error posting job:", error);
        // alert("An error occurred while posting the job.");
      });
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "DOM", label: "DOM" },
    { value: "Asynchronous Programming", label: "Asynchronous Programming" },
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "Express.js", label: "Express.js" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "SQL", label: "SQL" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
    { value: "C++", label: "C++" },
    { value: "Ruby", label: "Ruby" },
    { value: "PHP", label: "PHP" },
    { value: "Go", label: "Go" },
    { value: "Rust", label: "Rust" },
    { value: "TypeScript", label: "TypeScript" },
    { value: "Angular", label: "Angular" },
    { value: "Vue.js", label: "Vue.js" },
    { value: "Flutter", label: "Flutter" },
    { value: "React Native", label: "React Native" },
    { value: "Ionic", label: "Ionic" },
    { value: "Kotlin", label: "Kotlin" },
    { value: "Swift", label: "Swift" },
    { value: "Other", label: "Other" },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form
          onSubmit={(e) => {
            handleOnSubmit();
          }}
          className="space-y-5"
        >
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                placeholder="Enter Job Title"
                value={inputs.jobTitle}
                onChange={(e) =>
                  setInputs({ ...inputs, jobTitle: e.target.value })
                }
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                placeholder="Ex: Google"
                value={inputs.companyName}
                onChange={(e) =>
                  setInputs({ ...inputs, companyName: e.target.value })
                }
                className="create-job-input"
              />
            </div>
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="text"
                placeholder="Ex: 3LPA"
                value={inputs.minPrice}
                onChange={(e) =>
                  setInputs({ ...inputs, minPrice: e.target.value })
                }
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="text"
                placeholder="Ex: 20LPA"
                value={inputs.maxPrice}
                onChange={(e) =>
                  setInputs({ ...inputs, maxPrice: e.target.value })
                }
                className="create-job-input"
              />
            </div>
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select
                value={inputs.salaryType}
                onChange={(e) =>
                  setInputs({ ...inputs, salaryType: e.target.value })
                }
                className="create-job-input"
              >
                <option value="">Choose Salary Type</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                placeholder="Ex: Seattle"
                value={inputs.jobLocation}
                onChange={(e) =>
                  setInputs({ ...inputs, jobLocation: e.target.value })
                }
                className="create-job-input"
              />
            </div>
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                type="date"
                value={inputs.postingDate}
                onChange={(e) =>
                  setInputs({ ...inputs, postingDate: e.target.value })
                }
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                value={inputs.experienceLevel}
                onChange={(e) =>
                  setInputs({ ...inputs, experienceLevel: e.target.value })
                }
                className="create-job-input"
              >
                <option value="">Choose Experience Type</option>
                <option value="Fresher/No Experience">Fresher</option>
                <option value="Internship">Internship</option>
                <option value="Remote Work">Experienced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-lg">Required Skill Sets</label>
            <CreatableSelect
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
              className="create-job-input py-4"
            />
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                placeholder="Ex: Your Company Logo URL"
                value={inputs.companyLogo}
                onChange={(e) =>
                  setInputs({ ...inputs, companyLogo: e.target.value })
                }
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                value={inputs.employmentType}
                onChange={(e) =>
                  setInputs({ ...inputs, employmentType: e.target.value })
                }
                className="create-job-input"
              >
                <option value="">Choose Employment Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
              rows={6}
              placeholder="Enter Job Description"
              value={inputs.description}
              onChange={(e) =>
                setInputs({ ...inputs, description: e.target.value })
              }
              style={{
                border: "2px solid lightgray",
                outline: "none",
              }}
            />
          </div>

          <div className="w-full">
            <label className="block mb-2 text-lg">Employee Email</label>
            <input
              type="email"
              placeholder="Ex: employee@gmail.com"
              value={inputs.postedBy}
              onChange={(e) =>
                setInputs({ ...inputs, postedBy: e.target.value })
              }
              className="create-job-input"
            />
          </div>

          <input
            type="submit"
            className="block bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateJob;

import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AssignedProjectsBox = () => {
  let navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="py-3 px-2 ">
      <div className="myContainer">
        <div className="customHeader py-3 px-5">
          <div style={{ fontSize: "15px", fontWeight: "Bold" }}>
            Assigned Projects
          </div>
          <div>
          <div className="btn text-primary pt-0" onClick={()=>navigate('/engineerView/assignedProjects')}>View All</div>
          </div>
        </div>
        <div className="customBody">
          <div className="customItemsAssignedProj">
            <div>
              <form type="submit" onSubmit={handleSubmit(onSubmit)}>
                <div className="filterAssignedProjectsContainer pt-4">
                  <div className="mb-3 d-flex w-auto">
                    <input
                      type="text"
                      className="form-control customAssProjSearchHeight"
                      placeholder="Customer Name"
                      aria-describedby="emailHelp"
                      {...register("CustomerName")}
                    />
                    <div className="customSvg ml-1 mt-1">
                      <svg
                        width="31"
                        height="31"
                        viewBox="0 0 31 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.5 0.5H27.2062C28.6974 0.5 29.9062 1.70883 29.9062 3.2V27.3469C29.9062 28.838 28.6974 30.0469 27.2062 30.0469H0.5V0.5Z"
                          fill="white"
                          fillOpacity="0.5"
                        />
                        <path
                          d="M20.5441 17.8574L18.3176 15.6309C18.2062 15.5418 18.0727 15.475 17.9391 15.475H17.5828C18.184 14.6957 18.5625 13.716 18.5625 12.625C18.5625 10.0867 16.4695 7.99375 13.9313 7.99375C11.3707 7.99375 9.3 10.0867 9.3 12.625C9.3 15.1855 11.3707 17.2563 13.9313 17.2563C15 17.2563 15.9797 16.9 16.7812 16.2766V16.6551C16.7812 16.7887 16.8258 16.9223 16.9371 17.0336L19.1414 19.2379C19.3641 19.4605 19.698 19.4605 19.8984 19.2379L20.5219 18.6145C20.7445 18.4141 20.7445 18.0801 20.5441 17.8574ZM13.9313 15.475C12.3504 15.475 11.0813 14.2059 11.0813 12.625C11.0813 11.0664 12.3504 9.775 13.9313 9.775C15.4898 9.775 16.7812 11.0664 16.7812 12.625C16.7812 14.2059 15.4898 15.475 13.9313 15.475Z"
                          fill="#4F4F4F"
                          fillOpacity="0.5"
                        />
                        <path
                          d="M0.5 0.5H27.2062C28.6974 0.5 29.9062 1.70883 29.9062 3.2V27.3469C29.9062 28.838 28.6974 30.0469 27.2062 30.0469H0.5V0.5Z"
                          stroke="#3598AD"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

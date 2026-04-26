import React from "react";

const CheckoutPath = ({ activeStep }) => {
  const steps = [
    { label: "Shipping", icon: "fas fa-truck", step: 1 },
    { label: "Confirm Order", icon: "fas fa-clipboard-check", step: 2 },
    { label: "Payment", icon: "fas fa-credit-card", step: 3 },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto py-8 mb-8 px-2 sm:px-6">
      <div className="relative flex justify-between">
        {steps.map((item, index) => {
          const isActive = activeStep === item.step;
          const isCompleted = activeStep > item.step;

          return (
            <React.Fragment key={item.step}>
              <div className="relative flex flex-col items-center shrink-0 z-10 w-20 sm:w-28">
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-lg sm:text-2xl transition-all duration-500 ease-out border-4 outline outline-offset-2 outline-transparent ${
                    isActive
                      ? "bg-indigo-500 text-white border-white shadow-[0_0_20px_rgba(79,70,229,0.5)] scale-110 outline-blue-100"
                      : isCompleted
                      ? "bg-blue-500 text-white border-white shadow-md scale-100"
                      : "bg-white text-gray-300 border-gray-300 shadow-sm scale-95 hover:scale-100"
                  }`}
                >
                  <i className={item.icon}></i>
                </div>
                <div className="absolute top-16 sm:top-20 w-32 text-center mt-2">
                  <span
                    className={`text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 ${
                      isActive
                        ? "text-indigo-600"
                        : isCompleted
                        ? "text-gray-800"
                        : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-auto h-1.5 sm:h-2 mx-1 sm:mx-2 rounded-full bg-gray-100 relative overflow-hidden translate-y-4 sm:translate-y-5">
                  <div
                    className="absolute top-0 left-0 h-full bg-linear-to-r from-indigo-500 to-indigo-500 transition-all duration-700 ease-in-out"
                    style={{
                      width: activeStep > item.step ? "100%" : "0%",
                    }}
                  ></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutPath;
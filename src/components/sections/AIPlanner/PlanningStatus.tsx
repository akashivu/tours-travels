import { CheckCircle2, Loader2 } from "lucide-react";

const steps = [
  {
    title: "Finding the best flights",
    done: true,
  },
  {
    title: "Selecting premium hotels",
    done: true,
  },
  {
    title: "Building itinerary",
    done: true,
  },
  {
    title: "Optimizing your budget",
    done: false,
  },
];

const PlanningStatus = () => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5">

      <h4 className="mb-5 font-semibold text-gray-900">
        AI Planning Progress
      </h4>

      <div className="space-y-4">

        {steps.map((step) => (

          <div
            key={step.title}
            className="flex items-center gap-3"
          >

            {step.done ? (
              <CheckCircle2
                size={18}
                className="text-emerald-500"
              />
            ) : (
              <Loader2
                size={18}
                className="animate-spin text-blue-600"
              />
            )}

            <span className="text-sm text-gray-700">
              {step.title}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
};

export default PlanningStatus;
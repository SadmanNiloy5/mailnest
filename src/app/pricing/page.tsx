import PricingCard from "@/components/PricingCard";
import { plans } from "@/data/plans";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">

      <div className="text-center">

        <h1 className="text-5xl font-bold">
          Pricing Plans
        </h1>

        <p className="mt-4 text-gray-600">
          Choose the plan that fits your needs.
        </p>

      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">

        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
          />
        ))}

      </div>

    </div>
  );
}
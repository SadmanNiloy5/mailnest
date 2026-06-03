import { plans } from "@/data/plans";

export default function SubscriptionPage() {
  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">
        Subscription
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-xl border p-6 bg-white shadow ${
              plan.name === "Advanced"
                ? "border-blue-600"
                : ""
            }`}
          >
            <h2 className="text-2xl font-bold">
              {plan.name}
            </h2>

            <p className="mt-4 text-3xl font-bold">
              ${plan.price}
            </p>

            <ul className="mt-4 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature}>
                  ✓ {feature}
                </li>
              ))}
            </ul>

            <button
              className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-white"
            >
              Upgrade Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
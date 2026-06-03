import { Plan } from "@/types/plan";

interface PricingCardProps {
  plan: Plan;
}

export default function PricingCard({
  plan,
}: PricingCardProps) {
  return (
    <div className="rounded-xl border p-8 shadow-sm">

      <h3 className="text-2xl font-bold">
        {plan.name}
      </h3>

      <p className="mt-4 text-4xl font-bold">
        ${plan.price}
      </p>

      <ul className="mt-6 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature}>
            ✓ {feature}
          </li>
        ))}
      </ul>

      <button
        className="mt-8 w-full rounded-lg bg-blue-600 py-3 text-white"
      >
        Subscribe
      </button>

    </div>
  );
}
import { calculateDoughIngredients } from "../../utils/doughCalculator";

type ResultProps = {
  result: ReturnType<typeof calculateDoughIngredients>;
};

function gToOz(g: number) {
  return (g / 28.3495).toFixed(2) + " oz";
}

function format(result: ReturnType<typeof calculateDoughIngredients>) {
  return [
    { label: "Dough Weight", metric: `${result.doughWeight.toFixed(1)} g`, imperial: gToOz(result.doughWeight) },
    { label: "Flour",        metric: `${result.flour.toFixed(1)} g`,      imperial: gToOz(result.flour) },
    { label: "Water",        metric: `${result.water.toFixed(1)} g`,      imperial: gToOz(result.water) },
    { label: "Salt",         metric: `${result.salt.toFixed(1)} g`,       imperial: gToOz(result.salt) },
    { label: "Yeast",        metric: `${result.yeast.toFixed(1)} g`,      imperial: gToOz(result.yeast) },
    { label: "Oil",          metric: `${result.oil.toFixed(1)} g`,        imperial: gToOz(result.oil) },
  ];
}

export function Results({ result }: ResultProps) {
  const rows = format(result);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-6">Results</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Metric</h3>
          <div className="space-y-2 text-lg">
            {rows.map(r => (
              <div key={r.label} className="flex justify-between">
                <span>{r.label}</span>
                <span className="font-medium">{r.metric}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Imperial</h3>
          <div className="space-y-2 text-lg">
            {rows.map(r => (
              <div key={r.label} className="flex justify-between">
                <span>{r.label}</span>
                <span className="font-medium">{r.imperial}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

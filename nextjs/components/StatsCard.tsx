export default function StatsCard({ total }: { total: number }) {
  return (
    <div className="card bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">Total Posts</h2>
        <p className="text-3xl">{total}</p>
      </div>
    </div>
  );
}

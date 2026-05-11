export default function Loading() {
  return (
    <div className="p-6 animate-pulse">
      {/* Titre skeleton */}
      <div className="h-6 w-1/3 bg-gray-300 rounded mb-4"></div>

      {/* Carte session skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-gray-300 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
      </div>

      {/* Bloc info */}
      <div className="mt-6 h-20 w-full bg-gray-300 rounded"></div>
    </div>
  );
}
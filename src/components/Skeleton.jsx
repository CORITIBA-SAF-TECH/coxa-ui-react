/* Placeholder de carregamento (shimmer).
   <Skeleton width="60%" height={16} />
   <Skeleton circle width={40} height={40} />
   <Skeleton.Text lines={3} /> */
export function Skeleton({ width, height, circle, className = '', style, ...rest }) {
  const cls = `skeleton ${circle ? 'skeleton-circle' : ''} ${className}`.trim();
  return <span className={cls} style={{ width, height, ...style }} aria-hidden="true" {...rest} />;
}

/* Várias linhas de texto; a última sai mais curta */
Skeleton.Text = function SkeletonText({ lines = 3, className = '' }) {
  return (
    <span className={className} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <span
          key={i}
          className="skeleton skeleton-text"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </span>
  );
};

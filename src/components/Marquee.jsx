import '../styles/shared.css';

export default function Marquee({
  items,
  duration = 30,
  className = '',
  renderItem,
  ariaLabel,
}) {
  const doubled = [...items, ...items];

  return (
    <div
      className={`marquee ${className}`}
      style={{ '--marquee-duration': `${duration}s` }}
      aria-label={ariaLabel}
      role={ariaLabel ? 'region' : undefined}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => {
          const isDuplicate = i >= items.length;
          return (
            <div
              key={i}
              className="marquee-item"
              aria-hidden={isDuplicate ? 'true' : undefined}
            >
              {renderItem ? renderItem(item, i % items.length) : item}
            </div>
          );
        })}
      </div>
    </div>
  );
}

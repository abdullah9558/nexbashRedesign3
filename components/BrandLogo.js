export default function BrandLogo({ className = '', alt = 'NexBash', src = '/assets/nexbash-logo.png' }) {
  return <img src={src} alt={alt} className={className} />;
}

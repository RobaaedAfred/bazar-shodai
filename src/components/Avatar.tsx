type U = { name?: string | null; image?: string | null };

export default function Avatar({ user, className = "h-8 w-8 text-sm" }: { user: U; className?: string }) {
  const initial = (user.name ?? "?").trim().charAt(0).toUpperCase();
  if (user.image) {
    return <img src={user.image} alt={user.name ?? "প্রোফাইল"} referrerPolicy="no-referrer" className={`${className} rounded-full object-cover`} />;
  }
  return (
    <span className={`${className} grid shrink-0 place-items-center rounded-full bg-brand font-bold text-white`}>{initial}</span>
  );
}

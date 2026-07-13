export default function SectionDivider({ thick = false }: { thick?: boolean }) {
  return (
    <div className="container mx-auto lg:max-w-screen-xl px-4">
      <hr className={thick ? "section-divider-thick" : "section-divider"} />
    </div>
  );
}
